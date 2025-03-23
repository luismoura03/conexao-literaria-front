<template>
  <q-page padding>
    <q-toolbar>
      <q-toolbar-title>{{ $t('title.managmentBooks') }}</q-toolbar-title>
    </q-toolbar>
    <q-separator />
    <BooksList />
  </q-page>
</template>


<script setup>
import BooksList from '../components/BooksList.vue'

</script>

