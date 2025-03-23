<template>
  <q-page padding>
    <q-toolbar>
      <q-toolbar-title>{{ $t('title.managmentAuthors')}}</q-toolbar-title>
    </q-toolbar>
    <q-separator />
    <AuthorsList />
  </q-page>
</template>


<script setup>
import AuthorsList from '../components/AuthorsList.vue'

</script>
