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
            @click="$emit('deleteAuthor', props.row)"
            class="q-mr-sm"
          />
        </template>
      </q-table>
</template>

<script setup>


defineProps({
  authors: Array,
  columns: Array
})

defineEmits(['edit', 'deleteAuthor'])

</script>
