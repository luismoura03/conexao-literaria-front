<template>
  <q-card flat bordered class="q-pa-md">
    <q-card-section>
      <div class="header-table">
        <div class="text-header">
          <div class="text-h6 q-mr-md">{{ t('title.listAuthors') }}</div>
        </div>
        <div class="addAuthor">
          <q-btn
            icon="add"
            :label="$q.screen.gt.xs ? t('actions.addAuthor') : ''"
            color="positive"
            @click="openAddDialog"
            class="q-mt-md"
          />
        </div>
      </div>
      <q-separator />
    </q-card-section>
    <q-card-section>
      <AuthorsTable
        :authors="authors"
        :columns="columns"
        @editAuthor="openEditDialog"
        @deleteAuthor="openDeleteDialog"
      />
      <div v-if="loading">{{ t('loading') }}</div>
      <div v-if="error">{{ t('noData') }} {{ error.message }}</div>
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
import { ref } from 'vue';
import {
  CREATE_AUTHOR,
  DELETE_AUTHOR,
  UPDATE_AUTHOR,
} from '../graphql/mutations/mutationsAuthors/index';
import { useMutation } from '@vue/apollo-composable';
import { useAuthors } from '../composables/useQueries/useQueriesAuthors';
import useNotify from '../composables/notify/useNotify.js'
import EditAuthorDialog from './EditDialog/EditAuthorDialog.vue';
import AuthorsTable from './tables/AuthorsTable.vue';
import ConfirmDelete from './ConfirmDelete/ConfirmDelete.vue';
import AddAuthorDialog from './AddDialog/AddAuthorDialog.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const columns = [
  { name: 'id', label: 'ID', field: 'id', align: 'left' },
  { name: 'name', label: t('title.nameAuthor'), field: 'name', align: 'left' },
  { name: 'actions', label: t('actions.actions'), align: 'left' },
];

const editAuthorData = ref({ id: '', name: '' });
const isEditDialogOpen = ref(false);
const { notifyError, notifyInfo, notifySucess } = useNotify();
const isDeleteDialogOpen = ref(false);
const isAddDialogOpen = ref(false);
const selectedItem = ref(null);
const selecteditemType = ref('');
const { authors, error, loading, refetch} = useAuthors();

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

const addAuthor = (newAuthor) => {

  const authorExist = authors.value.some(
    (author) => author.name.toLowerCase().trim() === newAuthor.name.toLowerCase().trim()
  )

  if(authorExist) {
    notifyInfo({
      message:'Este autor já está cadastrado!',
    })
    closeAddDialog();
    return
  }
  if(newAuthor.name.trim() === '') {
    notifyInfo({
      message: 'O nome do autor não pode ser vazio!',
    })
    closeAddDialog()
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
        // authors.value = [...authors.value, result.data.createAuthor];
        notifySucess({
          message: 'Autor adicionado com sucesso!',
        })
        refetch()
      }
      closeAddDialog();
    })
    .catch((mutationError) => {
      notifyError({
        message: 'Ao adicionar autor: ' + mutationError.message,
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
        // authors.value = authors.value.filter((a) => a.id !== author.id);
      }
      loading.value = false;
      notifySucess({
        message: 'Autor deletado com sucesso!',
      })
      refetch()
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
    notifyInfo({
      message: 'Nenhuma alteração detectada no nome do autor.',
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
        // const updatedAuthor = result.data.updateAuthor;
        // authors.value = authors.value.map((a) =>
        //   a.id === updatedAuthor.id ? updatedAuthor : a
        // );
        editAuthorData.value = { id: '', name: '' };
        isEditDialogOpen.value = false;
      }
      notifySucess({
        message: 'Autor atualizado com sucesso!',
      })
      refetch()
    })
    .catch((mutationError) => {
      notifyError({
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
  isAddDialogOpen.value = !isAddDialogOpen.value;
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
