<template>
  <q-table
        :rows="books"
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
import {defineProps, defineEmits, computed} from 'vue'

/* eslint-disable no-unused-vars */
const props = defineProps({
    books: Array,
    columns: Array,
    authors: Array
})

const emit = defineEmits(['edit', 'delete'])

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
