<template>
  <q-card flat bordered class="q-pa-md">
    <q-card-section>
        <div class="text-h6">Lista de Livros</div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <q-table
        :rows="books"
        :columns="columns"
        row-key="id"
        flat
        bordered
      >

        <template v-slot:body-cell-actions="props">
          <q-btn
            size="sm"
            flat
            icon="edit"
            color="primary"
            @click="editBook(props.row)"
            class="q-mr-sm"
          />
          <q-btn
            size="sm"
            flat
            icon="delete"
            color="negative"
            @click="deleteBook(props.row)"
            class="q-mr-sm"
          />
        </template>
      </q-table>

      <div v-if="loading">Carregando...</div>
      <div v-if="error">Erro ao buscar livros: {{ error.message }}</div>

      <div class="input-container">
      <q-input
      v-model="newBookTitle"
      label="Novo Livro"
      filled
      style="max-width: 300px;"
      />

      <q-input
      v-model="newAuthorId"
      type="number"
      label="ID do Autor"
      filled
      style="max-width: 300px;"
      />
      <q-btn
        icon="add"
        label="Adicionar Livro"
        color="positive"
        @click="addBook()"
        class="q-mt-md"
      />
      </div>

    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, watch } from 'vue'
import { GET_BOOKS } from '../apollo/books/query/bookQueries'
import { useQuery } from '@vue/apollo-composable'

//array que armazena a lista de livros
const books = ref([])

//define as colunas da tabela
const columns = [
  {name: 'id', label: 'ID', field: 'id', align: 'left'},
  {name: 'title', label: 'Livros', field: 'title', align: 'left'},
  {name: 'author', label: 'Autores', field: row => row.author?.name, align:'left'},
  {name: 'actions', label: 'Ações', align: 'left'}
]

//inputs para a criação de livros

const newBookTitle = ref('')
const newAuthorId = ref(null)

//usa apollo composable(useQuery) para consultar livros do backend com a query GET_BOOKS
const { loading, error, result } = useQuery(GET_BOOKS)

//tenta carregar os livros retornados pela query para a variavel books
watch(
  () => result.value,
  (newBooks) => {
    if (newBooks && newBooks.books) {
      books.value = newBooks.books
    }
  }
)

function addBook(){
  if(!newBookTitle.value || !newAuthorId.value){
    alert('Preencha todos os campos')
    return;
  }
  const newId = books.value.length + 1
  books.value.push({
    id: newId,
    title: newBookTitle.value,
    author: `${newAuthorId.value}`
  })

  newBookTitle.value = ''
  newAuthorId.value = null
}

function deleteBook(book) {
 books.value = books.value.filter((b) => b.id !== book.id)
 alert(`Livro ${book.title} deletado`)
}

function editBook(book) {
  alert(`Editar Livro ${book.title}`)
}

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

.q-input, .q-btn{
  height: 42px;
}
</style>
