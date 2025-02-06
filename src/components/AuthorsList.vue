<template>
  <q-card flat bordered class="q-pa-md">
    <q-card-section>
      <div class="header-table">
        <div class="text-header">
          <div class="text-h6 q-mr-md">Lista de Autores</div>
        </div>
        <div class="addAuthor">
          <q-btn
            icon="add"
            label="Adicionar Autor"
            color="positive"
            @click="openAddDialog"
            class="q-mt-md"
          />
        </div>
      </div>
      <q-separator></q-separator>
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
    <AddAuthorDialog
      :isOpen="isAddDialogOpen"
      @close="closeAddDialog"
      @save="addAuthor"
    />
  </q-card>
</template>

<script setup>
import { ref, watch } from 'vue';
import { GET_AUTHORS } from '../graphql/queries/queriesAuthors/authorsQueries';
import {
  CREATE_AUTHOR,
  DELETE_AUTHOR,
  UPDATE_AUTHOR,
} from '../graphql/mutations/mutationsAuthors/index';
import { useQuery, useMutation } from '@vue/apollo-composable';
import { useQuasar } from 'quasar';
import EditAuthorDialog from './EditDialog/EditAuthorDialog.vue';
import AuthorsTable from './tables/AuthorsTable.vue';
import ConfirmDelete from './ConfirmDelete/ConfirmDelete.vue';
import AddAuthorDialog from './AddDialog/AddAuthorDialog.vue';

const columns = [
  { name: 'id', label: 'ID', field: 'id', align: 'left' },
  { name: 'name', label: 'Nome do Autor', field: 'name', align: 'left' },
  { name: 'actions', label: 'Ações', align: 'left' },
];

const authors = ref([]);
const editAuthorData = ref({ id: '', name: '' });
const isEditDialogOpen = ref(false);
const $q = useQuasar();
const isDeleteDialogOpen = ref(false);
const isAddDialogOpen = ref(false);
const selectedItem = ref(null);
const selecteditemType = ref('');
const loading = ref(false);
const error = ref(null);

const { result: resultAuthors } = useQuery(GET_AUTHORS, null, {
  fetchPolicy: 'network-only',
  onError: (queryError) => (error.value = queryError),
  onCompleted: () => (loading.value = false),
});

const { mutate: addAuthorMutation } = useMutation(CREATE_AUTHOR, {
  onError: (mutationError) => {
    console.log('Erro ao adicionar autor:', mutationError);
    error.value = mutationError;
  },
  onCompleted: () => (loading.value = false),
});

const { mutate: deleteAuthorMutation } = useMutation(DELETE_AUTHOR, {
  onError: (mutationError) => {
    console.log('Erro ao deletar autor:', mutationError);
    error.value = mutationError;
  },
  onCompleted: () => (loading.value = false),
});

const { mutate: updateAuthorMutation } = useMutation(UPDATE_AUTHOR, {
  onError: (mutationError) => {
    console.log('Erro ao atualizar autor:', mutationError);
    error.value = mutationError;
  },
  onCompleted: () => (loading.value = false),
});

watch(
  () => resultAuthors.value,
  (newAuthors) => {
    if (newAuthors && newAuthors.authors) {
      authors.value = newAuthors.authors;
    }
  }
);

const addAuthor = (newAuthor) => {

  const authorExist = authors.value.some(
    (author) => author.name.toLowerCase().trim() === newAuthor.name.toLowerCase().trim()
  )

  if(authorExist) {
    $q.notify({
      position: 'bottom-right',
      color: 'blue',
      message:'Este autor já está cadastrado!',
      icon: 'info'
    })
    closeAddDialog();
    return
  }

  addAuthorMutation({
    name: newAuthor.name,
  })
    .then((result) => {
      if (!result?.data?.createAuthor) {
        alert('Error');
      }
      if (result?.data?.createAuthor) {
        authors.value = [...authors.value, result.data.createAuthor];
        $q.notify({
          position: 'bottom-right',
          color: 'positive',
          message: 'Autor adicionado com sucesso!',
          icon: 'done',
        });
      }
      closeAddDialog();
    })
    .catch((mutationError) => {
      $q.notify({
        position: 'bottom-right',
        color: 'negative',
        message: 'Ao adicionar autor: ' + mutationError.message,
        icon: 'error',
      });
    });
};

const deleteAuthor = (author) => {
  loading.value = true;
  error.value = null;

  deleteAuthorMutation({
    id: author.id,
  })
    .then((result) => {
      if (result && result.data) {
        authors.value = authors.value.filter((a) => a.id !== author.id);
      }
      loading.value = false;
      $q.notify({
        position: 'bottom-right',
        color: 'positive',
        message: 'Autor deletado com sucesso!',
        icon: 'done',
        classes: 'custom-notify',
        iconSize: '40px',
      });
    })
    .catch((mutationError) => {
      console.error('Erro ao deletar autor:', mutationError);
      loading.value = false;
    });
};

const updateAuthor = (author) => {
  loading.value = true;
  error.value = null;

  const originalAuthor = authors.value.find(a => a.id === author.id)

  if(originalAuthor.name.trim() === author.name.trim()) {
    $q.notify({
      position: 'bottom-right',
      color: 'warning',
      message: 'Nenhuma alteração detectada no nome do autor.',
      icon: 'warning'
    })
    loading.value = false;
    return
  }

  updateAuthorMutation({
    id: author.id,
    name: author.name,
  })
    .then((result) => {
      if (result && result.data) {
        const updatedAuthor = result.data.updateAuthor;
        authors.value = authors.value.map((a) =>
          a.id === updatedAuthor.id ? updatedAuthor : a
        );
        editAuthorData.value = { id: '', name: '' };
        isEditDialogOpen.value = false;
      }
      $q.notify({
        position: 'bottom-right',
        color: 'positive',
        message: 'Autor atualizado com sucesso!',
        icon: 'done',
        classes: 'custom-notify',
        iconSize: '25px',
      });
    })
    .catch((mutationError) => {
      $q.notify({
        position: 'bottom-right',
        color: 'negative',
        message: 'Ao adicionar autor: ' + mutationError.message,
        icon: 'error',
      });
    });
  loading.value = false;
};
//--------------------------------------------------------------------------------
// Update the author modal

const openEditDialog = (author) => {
  editAuthorData.value = { ...author };
  isEditDialogOpen.value = true;
};

const closeEditDialog = () => {
  isEditDialogOpen.value = false;
  editAuthorData.value = { id: '', name: '' };
};

const saveAuthorChanges = (updatedAuthorData) => {
  updateAuthor(updatedAuthorData);
};

//----------------------------------------------------------------
//delete author modal
const openDeleteDialog = (author) => {
  console.log('delete', author);

  selectedItem.value = author;
  selecteditemType.value = '';
  isDeleteDialogOpen.value = true;
};

const closeDeleteDialog = () => {
  isDeleteDialogOpen.value = false;
  selectedItem.value = null;
  selecteditemType.value = '';
};

const handleDelete = (author) => {
  deleteAuthor(author);
  closeDeleteDialog();
};

//--------------------------------------------------------------------------------
// close and save book dialog

const openAddDialog = () => {
  isAddDialogOpen.value = true;
};

const closeAddDialog = () => {
  isAddDialogOpen.value = false;
};
</script>

<style scoped>
.header-table {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.q-btn {
  height: 30px;
  margin: 15px;
}

</style>
