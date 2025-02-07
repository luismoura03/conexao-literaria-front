<template>
  <q-card flat bordered class="q-pa-md">
    <q-card-section>
      <div class="header-container">
        <div class="text-header">
          <div class="text-h6 q-mr-md">Lista de Livros</div>
        </div>
        <div class="add-book">
          <q-btn
              icon="add"
              label="Adicionar Livro"
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
        @editBook="openEditDialog"
        @deleteBook="openDeleteDialog"
      />

      <div v-if="loading">Carregando...</div>
      <div v-if="error">Erro ao buscar livros: {{ error.message }}</div>

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
import { GET_BOOKS } from '../graphql/queries/queriesBooks/bookQueries'
import { GET_AUTHORS } from '../graphql/queries/queriesAuthors/authorsQueries'
import { CREATE_BOOK } from '../graphql/mutations/mutationsBooks/createBook'
import { DELETE_BOOK } from '../graphql/mutations/mutationsBooks/deleteBook'
import { UPDATE_BOOK } from '../graphql/mutations/mutationsBooks/updateBook'
import { useQuery, useMutation } from '@vue/apollo-composable'
import useNotify from '/src/composables/notify/useNotify.js'
import BooksTable from './tables/BooksTable.vue'
import EditBookDialog from './EditDialog/EditBookDialog.vue'
import ConfirmDelete from './ConfirmDelete/ConfirmDelete.vue'
import AddBookDialog from './AddDialog/AddBookDialog.vue'

const columns = [
  {name: 'id', label: 'ID', field: 'id', align: 'left'},
  {name: 'title', label: 'Livros', field: 'title', align: 'left'},
  {name: 'author', label: 'Autores', field: row => row.author?.name ?? 'Desconhecido', align:'left'},
  {name: 'actions', label: 'Ações', align: 'left'}
]


const books = ref([])
const authors = ref([])
const authorsOptions = ref([])
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
const { notifyInfo, notifySucess } = useNotify()
const loading = ref(false)
const error = ref(null)



const { result: resultBooks } = useQuery(GET_BOOKS, null, {
  fetchPolicy: 'network-only',
  onError: (error) => {
    console.error('Erro ao buscar livros:', error)
  },
  onCompleted: () => loading.value = false
})

const {result: resultAuthors} = useQuery(GET_AUTHORS, null, {
  fetchPolicy: 'network-only',
  onError: (error) => {
    console.error('Erro ao buscar autores:', error)
  },
  onCompleted: () => {
    loading.value = false
    }
  }
)

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
  if(newBook.title.trim() === '') {
    notifyInfo({
      message: 'O nome do livro não pode ser vazio!',
    })
    return
  }

   addBookMutation({
    title: newBook.title,
    authorId: newBook.authorId
  }).then((result) => {
    if (result?.data?.createBook){
      books.value = [ ...books.value, {
        id: result.data.createBook.id,
        title: result.data.createBook.title,
        author: {
          name: result.data.createBook.author.name
        }
      }]
    }
    notifySucess({
      message: 'Livro adicionado com sucesso!',
    })
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
  }).then((result) => {
    if(result && result.data) {
    books.value = books.value.filter((b) => b.id !== book.id)
  }
  loading.value = false
  notifySucess({
      message: 'Livro deletado com sucesso!',
    })
  }).catch((mutationError) => {
    console.error('Erro ao deletar livro:', mutationError)
  })
  loading.value = false
}

const updateBook = async (book) => {

  loading.value = true
  error.value = null

  return updateBookMutation({
      id: book.id,
      title: book.title,
      authorId: book.authorId,
  }).then((result) => {
    if(result?.data) {
    books.value = books.value.map((b) => b.id === result.data.updateBook.id ? result.data.updateBook : b)
  }
  notifySucess({
      message: 'Livro atualizado com sucesso!',
    })
  return result
  }).catch((mutationError) => {
    console.error('Erro ao atualizar livro:', mutationError)
    throw error; //propaga o erro para ser captudaro em saveBookChanges
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

watch(
  () => resultBooks.value,
  (newBooks) => {
    if (newBooks && newBooks.books) {
      books.value = newBooks.books
    }
  }
)
watch(
  () => resultAuthors.value,
  (newAuthors) => {
    if(newAuthors && newAuthors.authors){
      authors.value = newAuthors.authors
      authorsOptions.value = newAuthors.authors.map(author => ({
        value: author.id,
        label: author.name

      }))
      console.log(resultAuthors.value)
    }
  },
)
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
