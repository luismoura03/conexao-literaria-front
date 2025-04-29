<template>
  <q-page class="flex flex-center bg-grey-1">
    <q-card class="q-pa-lg shadow-2" style="max-width: 400px; width: 100%;">
      <q-card-section class="text-center">
        <q-avatar size="80px" class="q-mb-md" color="primary" text-color="white" icon="menu_book" />
        <div class="text-h5 text-primary q-mb-xs">Conexão Literária</div>
        <div class="text-subtitle2 text-grey-7 q-mb-md">
          Sistema desenvolvido por <b>Luis Moura</b>
        </div>
        <q-separator />
        <div class="q-mt-md">
          <q-btn
            color="primary"
            icon="books"
            label="Ver Livros"
            to="/books"
            class="full-width"
            unelevated
          />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
//
</script>