<template>
  <q-card flat bordered class="q-pa-md">
    <q-card-section>
      <div class="header-container">
        <div class="text-header">
          <div class="text-h6 q-mr-md">{{ t('title.listBooks') }}</div>
        </div>
        <div class="add-book">
          <q-btn
              icon="add"
              :label="$q.screen.gt.xs ? t('actions.addBook') : ''"
              color="positive"
              @click="openAddDialog()"
              class="q-mt-md"
          />
        </div>
      </div>
      <q-separator />
    </q-card-section>
    <q-card-section>
      <BooksTable
        :books
        :columns
        :authors
        :loading="loading"
        @editBook="openEditDialog"
        @deleteBook="openDeleteDialog"
      />

      <div v-if="error" class="flex flex-center q-my-lg column items-center">
        <q-icon name="error" color="negative" size="40px" />
        <div class="q-mt-sm text-negative text-weight-medium">
          {{ 'Erro ao carregar Livros' }}
        </div>
        <div class="text-caption text-grey-7 q-mt-xs">
          {{ error.message }}
        </div>
      </div>

    </q-card-section>
    <EditBookDialog
      :isOpen="isEditDialogOpen"
      :bookData="editBookData"
      :authorsOptions="authorsOptions"
      @close="closeEditDialog"
      @save="saveBookChanges"
    />
    <ConfirmDelete
      :isOpen="isDeleteDialogOpen"
      :item="selectedItem"
      :itemType="selecteditemType"
      @closeDialog="closeDeleteDialog"
      @confirmDelete="handleDelete"
    />
    <AddBookDialog
    :isOpen="isAddDialogOpen"
    :authorsOptions="authorsOptions"
    @close="closeAddDialog"
    @save="addBook"
    />
  </q-card>
</template>

<script setup>
import { ref, watch } from 'vue'
import { CREATE_BOOK } from '../graphql/mutations/mutationsBooks/createBook'
import { DELETE_BOOK } from '../graphql/mutations/mutationsBooks/deleteBook'
import { UPDATE_BOOK } from '../graphql/mutations/mutationsBooks/updateBook'
import { useMutation } from '@vue/apollo-composable'
import { useBooks } from '../composables/useQueries/useQueriesBooks'
import { useAuthors } from '../composables/useQueries/useQueriesAuthors'
import useNotify from '/src/composables/notify/useNotify.js'
import BooksTable from './tables/BooksTable.vue'
import EditBookDialog from './EditDialog/EditBookDialog.vue'
import ConfirmDelete from './ConfirmDelete/ConfirmDelete.vue'
import AddBookDialog from './AddDialog/AddBookDialog.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const columns = [
  {name: 'id', label: 'ID', field: 'id', align: 'left'},
  {name: 'title', label: t('title.listBooks2'), field: 'title', align: 'left'},
  {name: 'author', label: t('title.listAuthors2'), field: row => row.author?.name ?? 'Desconhecido', align:'left'},
  {name: 'actions', label: t('actions.actions'), align: 'left'}
]
const { authorsOptions } = useAuthors()
const { notifyInfo, notifySucess } = useNotify()
const { books, loading, error, refetch } = useBooks()
const authors = ref([])
const editBookData = ref({
  id: '',
  title: '',
  author: {
    value: '',
    label: ''
  }
 })
const isEditDialogOpen = ref(false)
const isDeleteDialogOpen = ref(false)
const isAddDialogOpen = ref(false)
const selectedItem = ref(null)
const selecteditemType = ref('')


const { mutate: addBookMutation } = useMutation(CREATE_BOOK, {
  onError: (mutationError) => {
    console.error('Erro ao adicionar livro: linha 1', mutationError)
    error.value = mutationError
  },
  onCompleted: () => loading.value = false
})

const { mutate: deleteBookMutation } = useMutation(DELETE_BOOK, {
  onError: (mutationError) => {
    console.error('Erro ao deletar livro:', mutationError)
    error.value = mutationError
  },
  onCompleted: () => loading.value = false
})

const { mutate: updateBookMutation } = useMutation(UPDATE_BOOK, {
  onError: (mutationError) => {
    console.log('Erro ao atualizar livro:', mutationError)
    error.value = mutationError
  },
  onCompleted: () => loading.value = false,
})

watch(
  () => useAuthors.value,
  (newAuthors) => {
    if(newAuthors && newAuthors.authors){
      authors.value = newAuthors.authors
      authorsOptions.value = newAuthors.authors.map(author => ({
        value: author.id,
        label: author.name

      }))
      console.log(useAuthors.value)
    }
  },
)

const addBook = (newBook) => {

  const bookExist = books.value.some(
    (book) => book.title.toLowerCase().trim() === newBook.title.toLowerCase().trim()
  )

  if(bookExist) {
    notifyInfo({
      message: 'Esse livro já está cadastrado!',
    })
    return
  }
  if(newBook.title.trim() === '' || newBook.authorId.trim() === '') {
    notifyInfo({
      message: 'O nome do livro e autor não pode ser vazio!',
    })
    return
  }

   addBookMutation({
    title: newBook.title,
    authorId: newBook.authorId
  }).then(() => {
    notifySucess({
      message: 'Livro adicionado com sucesso!',
    })
    refetch()
    loading.value = false
  }).catch((mutationError) => {
    console.error('Erro ao adicionar livro:', mutationError)
  })
}

const deleteBooks = (book) => {
  loading.value = true
  error.value = null

  deleteBookMutation({
    id: book.id
  }).then(() => {
    loading.value = false
    notifySucess({
      message: 'Livro deletado com sucesso!',
    })
    refetch()
  }).catch((mutationError) => {
    console.error('Erro ao deletar livro:', mutationError)
  })
  loading.value = false
}

const updateBook = async (book) => {

  loading.value = true
  error.value = null

  const originalBook = books.value.find((b) => b.id === book.id)

  if(originalBook.title.trim() === book.title.trim() || originalBook.authorId === book.authorId) {
    notifyInfo({
      message: 'Nenhuma alteração detectada no nome do livro e autor.',
    })
    loading.value = false
    return
  }

  return updateBookMutation({
      id: book.id,
      title: book.title,
      authorId: book.authorId,
  }).then((result) => {
    notifySucess({
      message: 'Livro atualizado com sucesso!',
    })
    refetch()
  return result
  }).catch((mutationError) => {
    console.error('Erro ao atualizar livro:', mutationError)
    throw error;
  }).finally(() => {
    loading.value = false
  })
}

//--------------------------------------------------------------------------------
// Update the modal book

const openEditDialog = (book) => {
  console.log('Open edit dialog', book)
  console.log('Authors Options before opning Dialogs',authorsOptions.value)
  if(book && book.author){
    editBookData.value = {
      id: book.id,
      title: book.title,
      author: {
        value: book.author.id,
        label: book.author.name
      }
   }
   isEditDialogOpen.value = true
  }
}

const closeEditDialog = () => {
  isEditDialogOpen.value = false
  editBookData.value = ({ id: '', title: '', author: { value: '', label: '', } })
}

const saveBookChanges = async (updatedBookData) => {
  try {
    if (!updatedBookData.author?.value) {
      throw new Error('Selecione um autor')
  }

  const variables = {
    id: updatedBookData.id,
    title: updatedBookData.title,
    authorId: updatedBookData.author.value
  }

  await updateBook(variables)
  closeEditDialog()
  } catch (error) {
    console.error('Erro ao atualizar:', error)
  }
}
//----------------------------------------------------------------
//delete book modal

const openDeleteDialog = (book) => {
  selectedItem.value = book
  selecteditemType.value = ''
  isDeleteDialogOpen.value = true
}

const closeDeleteDialog = () => {
  isDeleteDialogOpen.value = false
  editBookData.value = {
    id: '',
    title: '',
    author: {
      value: '',
      label: ''
    }
  }
}

const handleDelete = (book) => {
  deleteBooks(book)
  closeDeleteDialog()
}

//--------------------------------------------------------------------------------
// close and save book dialog

const openAddDialog = () => {
  isAddDialogOpen.value = true
}

const closeAddDialog = () => {
  isAddDialogOpen.value = false
}

</script>
<style scoped>
.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.add-book{
  display: inline-block;
}

.text-header {
  display: inline-block;
}

.q-btn {
  height: 30px;
  margin: 15px;
}
</style>
