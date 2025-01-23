<template>
  <q-table
        :rows="authors"
        :columns="columns"
        row-key="id"
        flat
        bordered
      >
        <template v-slot:body-cell-actions="props">
          <q-btn
            size="sm"
            flat
            icon="edit"
            color="primary"
            @click="$emit('edit', props.row)"
            class="q-mr-sm"
          />

          <q-btn
            size="sm"
            flat
            icon="delete"
            color="negative"
            @click="$emit('delete', props.row)"
            class="q-mr-sm"
          />
        </template>
      </q-table>
</template>

<script setup>

/* eslint-disable no-unused-vars */
const props = defineProps({
  authors: Array,
  columns: Array
})

const emit = defineEmits(['edit', 'delete'])
/* eslint-enable no-unused-vars */
</script>
