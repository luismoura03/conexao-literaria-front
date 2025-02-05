<template>
  <div class="table-authors">
    <q-table
      :rows="authors"
      :columns="columns"
      flat
      bordered
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="actions-cell">
          <div class="actions-container">
            <q-btn
              size="sm"
              flat
              icon="edit"
              color="primary"
              @click="$emit('editAuthor', props.row)"
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
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>


<script setup>


defineProps({
  authors: Array,
  columns: Array
})

defineEmits(['editAuthor', 'deleteAuthor'])

</script>

<style scoped>
.actions-cell{
  text-align: right;
  width: 120px;
}

.actions-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  height: 100%;
}

.q-tbn {
  min-width: 36px;
  height: 36px
}

</style>
