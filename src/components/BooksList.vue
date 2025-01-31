<template>
  <q-card flat bordered class="q-pa-md">
    <q-card-section>
        <div class="text-h6">Lista de Livros</div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <BooksTable
      :books="books"
      :columns="columns"
      :authors="authors"
      @editBook="openEditDialog"
      @deleteBook="openDeleteDialog"
      />

      <div v-if="loading">Carregando...</div>
      <div v-if="error">Erro ao buscar livros: {{ error.message }}</div>

      <div class="input-container">
      <q-input
      v-model="newBookTitle"
      label="Novo Livro"
      filled
      style="max-width: 300px;"
      />
      <div class="custom-select">
      <q-select
      v-model="newBookAuthorId"
      :options="authorsOptions"
      label="Selecione o Autor"
      filled
      style="height: 42px;"
      />
      </div>
      <q-btn
        icon="add"
        label="Adicionar Livro"
        color="positive"
        @click="addBook()"
        class="q-mt-md"
      />
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
import BooksTable from './tables/BooksTable.vue'
import EditBookDialog from './EditDialog/EditBookDialog.vue'
import ConfirmDelete from './ConfirmDelete/ConfirmDelete.vue'

const columns = [
  {name: 'id', label: 'ID', field: 'id', align: 'left'},
  {name: 'title', label: 'Livros', field: 'title', align: 'left'},
  {name: 'author', label: 'Autores', field: row => row.author?.name ?? 'Desconhecido', align:'left'},
  {name: 'actions', label: 'Ações', align: 'left'}
]


const books = ref([])
const authors = ref([])
const authorsOptions = ref([])
const newBookTitle = ref('')
const newBookAuthorId = ref(null)
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
const selectedItem = ref(null)
const selecteditemType = ref('')
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
    console.error('Erro ao adicionar livro:', mutationError)
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

const addBook = () => {
  if(!newBookTitle.value|| !newBookAuthorId.value){
    alert('Preencha o titulo e o autor do livro')
    return
  }

  loading.value = true
  error.value = null

   addBookMutation({
    title: newBookTitle.value,
    authorId: newBookAuthorId.value.value //extrair apenas o ID do autor
  }).then((result) => {
    if (result && result.data){
      books.value = [ ...books.value, {
        id: result.data.createBook.id,
        title: result.data.createBook.title,
        author: {
          name: result.data.createBook.author.name
        }
      }]
    }
    loading.value = false
  })

  newBookTitle.value = ''
  newBookAuthorId.value = null
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
  return result //permite encadear then posteriormente
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


</script>
<style scoped>
.input-container{
  display: flex;
  align-items: center;
  margin-top: 15px ;
}
.input-container > *{
  margin-right: 10px;
}

.q-input, .q-btn, .q-select{
  height: 42px;
}

.custom-select {
  width: 15%;
  max-width: 300px;
}
</style>
