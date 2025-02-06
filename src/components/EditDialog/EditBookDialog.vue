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
          />
          <q-select
            v-model="localBookData.author"
            :options="authorsOptions"
            label="Autor do Livro"
            option-value="value"
            option-label="label"
            filled
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
  author: props.bookData.author || {value: '', label: '',}
})

watch(() => props.bookData, (newVal) => {
  localBookData.value = {
    id: newVal.id,
    title: newVal.title,
    author: {
      value: newVal.author.value,
      label: newVal.author.label
    }
   }
   console.log('updated book data', localBookData.value.author.value)
})

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
  console.log('Local: ', localBookData.value)
}
</script>

<style scoped>
.q-select {
  max-width: 215px;
  width: 215px;
}
</style>
