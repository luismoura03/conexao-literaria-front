<template>
  <q-dialog :model-value="isOpen" @update:model-value="closeDialog()" persistent>
    <q-card class="q-pa-sm">
      <q-card-section>
        <div class="text-h6">{{$t('actions.addBook')}}</div>
      </q-card-section>
      <div class="modalEdit">
        <q-card-section class="row q-gutter-lg">
          <q-input
            v-model="localBookData.title"
            :label="$t('placeholders.nameBook')"
            filled
          />
          <q-select
            v-model="localBookData.authorId"
            :options="authorsOptions"
            :label="$t('placeholders.nameAuthor')"
            option-value="value"
            option-label="label"
            emit-value
            map-options
            filled
          />
        </q-card-section>
      </div>
      <q-card-actions align="right">
        <q-btn flat :label="$t('actions.cancel')" color="primary" @click="closeDialog" />
        <q-btn flat :label="$t('actions.create')" icon="add" color="green" @click="saveChanges" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  isOpen: Boolean,
  authorsOptions: Array
})

const emit = defineEmits(['close', 'save'])


watch(() => props.isOpen, (isOpen) => {
  if(isOpen) {
    localBookData.value = {title: '', authorId: ''}
    console.log(localBookData.value)
  }
})

const localBookData = ref({
  title: '',
  authorId: '',
})

const saveChanges = () => {
  emit('save', localBookData.value)
  closeDialog()
}

const closeDialog = () => {
  emit('close')
}
</script>

<style scoped>
.q-select {
  width: 215px;
  max-width: 300px;
}
</style>
