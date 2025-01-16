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
      <div>

      <q-input
      v-model.number="model"
      type="number"
      filled
      style="max-width: 200px; margin-top: 10px; "
      />
      </div>
      <q-btn
        icon="add"
        label="Adicionar Livro"
        color="positive"
        @click="addBook"
        class="q-mt-md"
      />

    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref } from 'vue'

const books = ref([
  { id: 1, title: "Livro A", author: "Autor 1" },
  { id: 2, title: "Livro B", author: "Autor 2" },
  { id: 3, title: "Livro C", author: "Autor 3" },
])


const columns = [
  {name: 'title', label: 'Livros', field: 'title', align: 'left'},
  {name: 'author', label: 'Autores', field: 'author', align:'left'},
  {name: 'actions', label: 'Ações', align: 'center'}
]

function addBook(){
  const newId = books.value.length + 1;
  books.value.push({id: newId, title: `Livro ${newId}`, author: `Autor ${newId}`})
}

function deleteBook(book) {
 alert(`deleting ${book.id}`)
}

function editBook(book) {
  alert(`Editar Livro ${book.title}`)
}

</script>
<style scoped>
.q-table {
  font-size: 1rem;
}
</style>
