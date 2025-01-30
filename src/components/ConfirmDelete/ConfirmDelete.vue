<template>
  <q-dialog :model-value="isOpen" @update:model-value="closeDialog" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">Tem certeza que deseja deletar o item "{{ item?.name || item?.title}}" ?</div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" @click="closeDialog" />
          <q-btn flat label="Deletar" color="red" @click="confirmDelete" />
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  item: Object,
  isOpen: Boolean,
  itemType: String,
})

const emit = defineEmits(['closeDialog', 'confirmDelete'])

const localItemData = ref({ ...props.item})

watch(() => props.item, (newVal) =>  {
  localItemData.value = {...newVal}
}, {immediate: true})

const closeDialog = () => {
  emit('closeDialog')
}

const confirmDelete = () => {
  emit('confirmDelete', localItemData.value)
}

</script>
