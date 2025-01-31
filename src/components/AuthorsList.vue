<template>
  <q-card flat bordered class="q-pa-md">
    <q-card-section>
      <div class="text-h6">Lista de Autores</div>
    </q-card-section>
    <q-card-section>
      <AuthorsTable
        :authors="authors"
        :columns="columns"
        @editAuthor="openEditDialog"
        @deleteAuthor="openDeleteDialog"
      />

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

    <EditAuthorDialog
      :isOpen="isEditDialogOpen"
      :authorData="editAuthorData"
      @close="closeEditDialog"
      @save="saveAuthorChanges"
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
import { GET_AUTHORS } from '../graphql/queries/queriesAuthors/authorsQueries'
import { CREATE_AUTHOR, DELETE_AUTHOR, UPDATE_AUTHOR } from '../graphql/mutations/mutationsAuthors/index'
import { useQuery, useMutation } from '@vue/apollo-composable'
import { useQuasar } from 'quasar'
import EditAuthorDialog from './EditDialog/EditAuthorDialog.vue'
import AuthorsTable from './tables/AuthorsTable.vue'
import ConfirmDelete from './ConfirmDelete/ConfirmDelete.vue'

const columns = [
  {name: 'id', label: 'ID', field: 'id', align: 'left'},
  {name: 'name', label: 'Nome do Autor', field: 'name', align: 'left'},
  {name: 'actions', label: 'Ações', align: 'left'}
]

const authors = ref([])
const newAuthorName = ref('')
const editAuthorData = ref({ id:'', name: '' })
const isEditDialogOpen = ref(false)
const $q = useQuasar()
const isDeleteDialogOpen = ref(false)
const selectedItem = ref(null)
const selecteditemType = ref('')
const loading = ref(false)
const error = ref(null)

const { result: resultAuthors } = useQuery(GET_AUTHORS, null, {
  fetchPolicy: 'network-only',
  onError: (queryError) => error.value = queryError,
  onCompleted: () => loading.value = false,
})

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

watch(
  () => resultAuthors.value,
  (newAuthors) => {
    if (newAuthors && newAuthors.authors) {
      authors.value = newAuthors.authors
    }
  }
)

const addAuthor = () => {
  if(!newAuthorName.value){
    $q.notify({
      position: 'bottom-right',
      color: 'negative',
      message: 'Por favor, preencha todos os campos!',
      icon: 'error',
      classes: 'custom-notify',
      iconSize: '30px'
    })
    return
  }

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
    $q.notify({
      position: 'bottom-right',
      color: 'positive',
      message: 'Autor adicionado com sucesso!',
      icon: 'done',
      classes: 'custom-notify',
      iconSize: '30px'
    })
    loading.value = false
  })

}

const deleteAuthor = (author) => {
  loading.value = true
  error.value = null

   deleteAuthorMutation({
      id: author.id
  }).then((result) => {
    if(result && result.data) {
      authors.value = authors.value.filter((a) => a.id !== author.id)
    }
    loading.value = false
    $q.notify({
      position:'bottom-right',
      color: 'positive',
      message: 'Autor deletado com sucesso!',
      icon: 'done',
      classes: 'custom-notify',
      iconSize: '30px'
    })
  }).catch((mutationError) => {
    console.error('Erro ao deletar autor:', mutationError)
    loading.value = false
  })
}

const updateAuthor = (author) => {

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
    $q.notify({
      position: 'bottom-right',
      color: 'positive',
      message: 'Autor atualizado com sucesso!',
      icon: 'done',
      classes: 'custom-notify',
      iconSize: '30px'
    })
  }).catch((mutationError) => {
    console.error('Erro ao atualizar autor:', mutationError)
  })
    loading.value = false
}
//--------------------------------------------------------------------------------
// Update the author modal

const openEditDialog = (author) => {
  editAuthorData.value = { ...author }
  isEditDialogOpen.value = true
}

const closeEditDialog = () => {
  isEditDialogOpen.value = false
  editAuthorData.value = { id: '', name: '' }
}

const saveAuthorChanges = (updatedAuthorData) => {
  updateAuthor(updatedAuthorData)
}

//----------------------------------------------------------------
//delete author modal
const openDeleteDialog = (author) => {
  console.log('delete', author)

  selectedItem.value = author
  selecteditemType.value = ''
  isDeleteDialogOpen.value = true
}

const closeDeleteDialog = () => {
  isDeleteDialogOpen.value = false
  selectedItem.value = null
  selecteditemType.value = ''
}

const handleDelete = (author) => {
  deleteAuthor(author)
  closeDeleteDialog()
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
