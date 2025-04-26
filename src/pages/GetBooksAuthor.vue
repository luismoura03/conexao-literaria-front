<template>
  <q-page padding>
    <q-toolbar>
      <q-toolbar-title>Busque os livros de autores</q-toolbar-title>
    </q-toolbar>
    <q-separator />

    <authorBooksList />

  </q-page>
</template>

<script setup>
import authorBooksList from '../components/authorBooksList.vue'
</script>
