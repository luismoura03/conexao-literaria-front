<template>
  <q-card flat bordered class="q-pa-md">
    <q-card-section>
      <div class="text-h6">Lista de Autores</div>
    </q-card-section>
    <q-card-section>
      <q-table
        :rows="authors"
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
            @click="openEditDialog(props.row)"
            class="q-mr-sm"
          />

          <q-btn
            size="sm"
            flat
            icon="delete"
            color="negative"
            @click="deleteAuthor(props.row)"
            class="q-mr-sm"
          />
        </template>
      </q-table>

      <div v-if="loading">Carregando...</div>
      <div v-if="error">Erro ao buscar autores {{ error.message }}</div>

      <div class="input-container">
        <q-input
          v-model="newAuthorName"
          label="Novo Autor"
          filled
          style="max-width: 300px;"
        />
        <q-btn
          icon="add"
          label="Adicionar Autor"
          color="positive"
          @click="addAuthor()"
          class="q-mt-md"
        />
      </div>
    </q-card-section>

    <q-dialog v-model="isEditDialogOpen" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">Editar Autor</div>
        </q-card-section>

        <q-card-section>
          <q-input
          v-model="editAuthorData.id"
          label="ID do Autor"
          filled
          disable
          style="max-width: 300px;"
          />
        </q-card-section>
        <q-card-section>
          <q-input
          v-model="editAuthorData.name"
          label="Nome do Autor"
          filled
          style="max-width: 300px;"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" @click="closeEditDialog()" />
          <q-btn flat label="Salvar" color="primary" @click="saveAuthorChanges()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-card>
</template>

<script setup>
import { ref, watch } from 'vue'
import { GET_AUTHORS } from '../apollo/authors/query/authorsQueries'
import { CREATE_AUTHOR, DELETE_AUTHOR, UPDATE_AUTHOR } from '../apollo/authors/mutations/index'
import { useQuery, useMutation } from '@vue/apollo-composable'

const columns = [
  {name: 'id', label: 'ID', field: 'id', align: 'left'},
  {name: 'name', label: 'Nome do Autor', field: 'name', align: 'left'},
  {name: 'actions', label: 'Ações', align: 'left'}
]

const authors = ref([])
const newAuthorName = ref('')
const editAuthorData = ref({ id:'', name: '' })
const isEditDialogOpen = ref(false)

const loading = ref(false)
const error = ref(null)

const { result: resultAuthors } = useQuery(GET_AUTHORS, null, {
  fetchPolicy: 'network-only',
  onError: (queryError) => error.value = queryError,
  onCompleted: () => loading.value = false,
})

watch(
  () => resultAuthors.value,
  (newAuthors) => {
    if (newAuthors && newAuthors.authors) {
      authors.value = newAuthors.authors
    }
  }
)

const { mutate: addAuthorMutation }  = useMutation(CREATE_AUTHOR, {
  onError: (mutationError) => {
    console.log('Erro ao adicionar autor:', mutationError)
    error.value = mutationError
  },
  onCompleted: () => loading.value = false,
})

const { mutate: deleteAuthorMutation } = useMutation(DELETE_AUTHOR, {
  onError: (mutationError) => {
    console.log('Erro ao deletar autor:', mutationError)
    error.value = mutationError
  },
  onCompleted: () => loading.value = false,
})

const { mutate: updateAuthorMutation } = useMutation(UPDATE_AUTHOR, {
  onError: (mutationError) => {
    console.log('Erro ao atualizar autor:', mutationError)
    error.value = mutationError
  },
  onCompleted: () => loading.value = false,
})

const addAuthor = () => {
  if(!newAuthorName.value){
    alert('Preencha todos os campos')
    return
  }

  console.log("adicionado autor com o nome:", newAuthorName.value)

  loading.value = true
  error.value = null

  addAuthorMutation({
      name: newAuthorName.value,
  }).then((result) => {
    if(result && result.data) {
    authors.value = [...authors.value, {
      id: result.data.createAuthor.id,
      name: result.data.createAuthor.name,
    }]
      newAuthorName.value = ''
    }
    loading.value = false
  })

}

const deleteAuthor = (author) => {
  console.log('deletando author com o ID:', author.id)

  loading.value = true
  error.value = null

   deleteAuthorMutation({
      id: author.id
  }).then((result) => {
    if(result && result.data) {
    console.log(result.data)
      authors.value = authors.value.filter((a) => a.id !== author.id)
    alert(`Autor ${author.name} removido`)
    }
    loading.value = false
  }).catch((mutationError) => {
    console.error('Erro ao deletar autor:', mutationError)
    alert('Erro ao deletar autor')
    loading.value = false
  })
}

const updateAuthor = (author) => {
  console.log('Att autor com ID:', author.id)

  loading.value = true
  error.value = null

  updateAuthorMutation({
    id: author.id,
    name: author.name
  }).then((result) => {
    if(result && result.data){
      const updatedAuthor = result.data.updateAuthor;
      authors.value = authors.value.map(a => a.id === updatedAuthor.id ? updatedAuthor : a)
      editAuthorData.value = { id: '', name: ''}
      isEditDialogOpen.value = false
    }
  }).catch((mutationError) => {
    console.error('Erro ao atualizar autor:', mutationError)
  })
    loading.value = false
}

const openEditDialog = (author) => {
  editAuthorData.value = { ...author }
  isEditDialogOpen.value = true
}

const closeEditDialog = () => {
  isEditDialogOpen.value = false
  editAuthorData.value = { id: '', name: '' }
}

const saveAuthorChanges = () => {
  updateAuthor(editAuthorData.value)
}
</script>

<style scoped>
.input-container {
  display: flex;
  align-items: center;
  margin-top: 15px
}

.input-container > * {
  margin-right: 10px
}

.q-input, .q-btn {
  height: 42px;
}

</style>
