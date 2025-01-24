<template>
  <q-dialog :model-value:="isOpen" @update:model-value="closeDialog()" persistent>
    <q-card>
      <q-card-section>
        <div class="text-h6">Editar Livro</div>
      </q-card-section>

      <q-card-section>
        <q-input
        v-model="localBookData.id"
        label="ID do Livro"
        filled
        disable
        style="max-width: 300px;"
        />
        <q-input
        v-model="localBookData.title"
        label="ID do Livro"
        filled
        disable
        style="max-width: 300px;"
        />
        <q-select
        v-model="localBookData.authorId"
        options="authorsOptions"
        label="Autor do Livro"
        filled
        disable
        style="max-width: 300px;"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancelar" color="primary" @click="closeDialog" />
        <q-btn flat label="Salvar" color="primary" @click="saveChanges" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import {ref, watch} from 'vue'

const props = defineProps({
  bookData: Object,
  authorsOptions: Array,
  isOpen: Boolean
})

const emit = defineEmits(['close', 'save'])

const localBookData = ref({...props.bookData})

watch(() => props.bookData, (newVal) => {
  localBookData.value = { ...newVal }
}, {immediate: true})

const closeDialog = () => {
  emit('close')
}

const saveChanges = () => {
  emit('save', localBookData.value)
}
</script>
