<template>
  <q-table
    :rows="books"
    :columns="columns"
    row-key="id"
    :loading="loading"
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
            @click="$emit('editBook', props.row)"
            class="q-mr-sm"
          />
          <q-btn
            size="sm"
            flat
            icon="delete"
            color="negative"
            @click="$emit('deleteBook', props.row)"
            class="q-mr-sm"
          />
        </div>
      </q-td>
    </template>
  </q-table>
</template>

<script setup>
import {defineProps, defineEmits, computed} from 'vue'

/* eslint-disable no-unused-vars */
const props = defineProps({
    books: Array,
    columns: Array,
    authors: Array,
    loading: Boolean
})

const emit = defineEmits(['editBook', 'deleteBook'])

const booksWithAuthors = computed(() => {
  return props.books.map(book => {
    const author = props.authors.find(author => author.id === book.authorId)
    return {
      ...book,
      authorName: author ? author.name : 'Desconhecido'
    }
  })
})
</script>

<style scoped>
.actions-cell {
  width: 10px
}

.actions-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  height: 100%;
}

.q-btn {
  min-width: 36px;
  height: 36px;
}
</style>
