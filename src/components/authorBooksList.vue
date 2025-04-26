<template>
  <q-card class="q-mt-md">
    <q-card-section>
      <q-input filled v-model="authorInput" label="ID ou Nome do Autor" lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório']" @keyup.enter="searchBooks" />
    </q-card-section>
    <q-card-actions align="right">
      <q-btn color="primary" label="Buscar" @click="searchBooks" :loading="loading" />
    </q-card-actions>
  </q-card>

  <div class="q-mt-lg">
    <div v-if="loading" class="text-center q-pa-md">
      <q-spinner-dots color="primary" size="40px" />
      <p>Buscando livros...</p>
    </div>

    <q-banner v-else-if="error" inline-actions class="text-white bg-red q-mb-md">
      <template v-slot:avatar>
        <q-icon name="error" color="white" />
      </template>
      Ocorreu um erro ao buscar os livros: {{ error.message }}
    </q-banner>

    <q-card v-else-if="books.length > 0" flat bordered>
      <q-card-section>
        <div class="text-h6">Livros Encontrados</div>
      </q-card-section>
      <q-separator />
      <q-list separator>
        <q-item v-for="book in books" :key="book.id">
          <q-item-section>
            <q-item-label>{{ book.title }}</q-item-label>
            <q-item-label caption>ID: {{ book.id }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>

    <div v-else-if="authorIdToQuery && !loading && !error" class="text-center text-grey q-pa-md">
      Nenhum livro encontrado para este autor.
    </div>

    <div v-else-if="!authorIdToQuery && !loading && !error" class="text-center text-grey q-pa-md">
      Digite o ID ou nome de um autor e clique em "Buscar".
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthorsBooks } from '../composables/useQueries/useQueriesAuthorBooks';

const authorInput = ref('');

const authorIdToQuery = ref(null);

const { books, loading, error } = useAuthorsBooks(authorIdToQuery);

const searchBooks = () => {
  if (authorInput.value && authorInput.value.trim().length < 0) {
    authorIdToQuery.value = null;
    return;
  }
  if (authorInput.value && authorInput.value.trim().length > 0) {
    authorIdToQuery.value = authorInput.value.trim();
  }
};

</script>

<style scoped>
.q-banner {
  border-radius: 4px;
}
</style>
