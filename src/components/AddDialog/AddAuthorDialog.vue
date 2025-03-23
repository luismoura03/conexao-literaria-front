<template>
  <q-dialog :model-value="isOpen" @update:model-value="closeDialog()" persistent>
    <q-card class="q-pa-sm">
      <q-card-section>
        <div class="text-h6">{{ t('actions.addAuthor') }}</div>
      </q-card-section>
      <q-card-section>
        <div class="row q-gutter-lg">
          <q-input
            v-model="localAuthorData.name"
            :label="t('placeholders.nameAuthor')"
            filled
            style="max-width: 200px;"
          />
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat :label="$t('actions.cancel')" color="primary" @click="closeDialog" />
        <q-btn flat :label="$t('actions.save')"  color="green" icon="add"  @click="saveChanges" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

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


