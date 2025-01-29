<template>
  <q-dialog :model-value="isOpen" @update:model-value="closeDialog()" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">Editar Autor</div>
        </q-card-section>
          <q-card-section>
            <div class="row q-gutter-lg">
            <q-input
            v-model="localAuthorData.id"
            label="ID do Autor"
            filled
            disable
            style="max-width: 300px;"
            />

            <q-input
            v-model="localAuthorData.name"
            label="Nome do Autor"
            filled
            style="max-width: 300px;"
            />
            </div>
          </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" @click="closeDialog" />
          <q-btn flat label="Salvar" color="primary" @click="saveChanges" />
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  authorData: Object,
  isOpen: Boolean,
})

const emit = defineEmits(['close', 'save'])

const localAuthorData = ref({...props.authorData})

watch(() => props.authorData, (newVal) => {
  localAuthorData.value = { ...newVal }
}, { immediate: true })

const closeDialog = () => {
  emit('close')
}

const saveChanges = () => {
  emit('save', localAuthorData.value)
}
</script>

<style scoped>

</style>
