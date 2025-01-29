<template>
  <q-dialog :model-value="isOpen" @update:model-value="closeDialog" persistent>
    <q-card>
      <q-card-section>
        <div class="text-h6">Editar Livro</div>
      </q-card-section>
    <div class="modalEdit">
      <q-card-section class="row q-gutter-lg">
        <q-input
        v-model="localBookData.title"
        label="Nome do Livro"
        filled
        style="max-width: 300px;"
        />
        <q-select
        v-model="localBookData.author"
        :options="authorsOptions"
        label="Autor do Livro"
        options-value="value"
        options-label="label"
        filled
        style="max-width: 300px;"
        />
      </q-card-section>
    </div>
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

const localBookData = ref({
  id: props.bookData.id,
  title: props.bookData.title,
  author: {
    value: props.bookData.authorId,
    label: props.bookData.authorName
  }
})

watch(() => props.bookData, (newVal) => {
  localBookData.value = {
    id: newVal.id,
    title: newVal.title,
    author: {
      value: newVal.authorId,
      label: newVal.authorName
    }
   }
}, {immediate: true})

const closeDialog = () => {
  emit('close')
}

const saveChanges = () => {
  emit('save', {
    id: localBookData.value.id,
    title: localBookData.value.title,
    author: {
      value: localBookData.value.author.value,
      label: localBookData.value.author.label
    }
  })
}
</script>

<style scoped>
.q-select {
  width: 215px;
}
</style>
