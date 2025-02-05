<template>
  <q-dialog :model-value="isOpen" @update:model-value="closeDialog()" persistent>
    <q-card class="q-pa-sm">
      <q-card-section>
        <div class="text-h6">Adicionar Autor</div>
      </q-card-section>
      <q-card-section>
        <div class="row q-gutter-lg">
          <q-input
            v-model="localAuthorData.name"
            label="Nome do Autor"
            filled
            style="max-width: 200px;"
          />
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancelar" color="primary" @click="closeDialog" />
        <q-btn flat label="Criar"  color="green" icon="add"  @click="saveChanges" :disabled="!localAuthorData.name.trim()" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  isOpen: Boolean,
})

const emit = defineEmits(['close', 'save'])

watch(() => props.isOpen, (isOpen) => {
  if(isOpen) {
    localAuthorData.value = { name: ''}
  }
})

const localAuthorData = ref({
  name: ''
})

const closeDialog = () => {
  emit('close')
}

const saveChanges = () => {
  emit('save', localAuthorData.value)
  localAuthorData.value = { name: ''}
}
</script>


