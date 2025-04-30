<template>
  <q-card class="search-card q-mb-md" bordered>
    <q-card-section>
      <div class="text-h6 q-mb-sm">Buscar livros por autor</div>
      <q-input 
        filled 
        v-model="authorInput" 
        label="Nome do autor" 
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório']"
        @keyup.enter="searchBooks"
        bottom-slots
      >
        <template v-slot:append>
          <q-btn 
            round 
            dense 
            flat 
            icon="search" 
            color="primary"
            @click="searchBooks" 
            :loading="loading"
          />
        </template>
      </q-input>
    </q-card-section>
  </q-card>

  <div class="results-container">
    <div v-if="loading" class="text-center q-pa-lg">
      <q-spinner-dots color="primary" size="40px" />
      <div class="q-mt-sm text-body1">Buscando livros...</div>
    </div>

    <q-banner v-else-if="error" rounded class="bg-negative text-white q-mb-md">
      <template v-slot:avatar>
        <q-icon name="error_outline" />
      </template>
      Ocorreu um erro ao buscar os livros: {{ error.message }}
    </q-banner>

    <q-card v-else-if="books.length > 0" flat bordered class="results-card">
      <q-card-section class="bg-primary text-white">
        <div class="text-h6">Livros de {{ author?.name }}</div>
        <div class="text-subtitle2">{{ books.length }} livro(s) encontrado(s)</div>
      </q-card-section>
      
      <q-list separator>
        <q-item v-for="book in books" :key="book.id" clickable v-ripple>
          <q-item-section>
            <q-item-label class="text-weight-medium">{{ book.title }}</q-item-label>
            <q-item-label caption>ID: {{ book.id }}</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-icon name="menu_book" color="primary" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthorsBooks } from '../composables/useQueries/useQueriesAuthorBooks';

const authorInput = ref('');
const authorIdToQuery = ref(null);
const { author, books, loading, error } = useAuthorsBooks(authorIdToQuery);

const searchBooks = () => {
  if (!authorInput.value || authorInput.value.trim().length === 0) {
    authorIdToQuery.value = null;
    return;
  }
  
  authorIdToQuery.value = authorInput.value.trim();
};
</script>

<style scoped>
.search-card {
  border-radius: 8px;
}

.results-container {
  margin-top: 1rem;
}

.results-card {
  border-radius: 8px;
  overflow: hidden;
}

.empty-results {
  padding: 2rem 0;
  border-radius: 8px;
}

.q-banner {
  border-radius: 8px;
}
</style>