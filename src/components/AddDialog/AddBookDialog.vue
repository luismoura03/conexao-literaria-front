<template>
  <q-dialog :model-value="isOpen" @update:model-value="closeDialog" persistent>
    <q-card>
      <q-card-section>
        <div class="text-h6">Adicionar Livro</div>
      </q-card-section>
      <div class="modalEdit">
        <q-card-section class="row q-gutter-lg">
          <q-input
            v-model="localBookData.title"
            label="Nome do Livro"
            filled
            style="max-width: 300px;"
          />
          <q-select
            v-model="localBookData.author"
            :options="authorsOptions"
            label="Autor do Livro"
            option-value="value"
            option-label="label"
            filled
            style="max-width: 300px;"
          />
        </q-card-section>
      </div>
      <q-card-actions align="right">
        <q-btn flat label="Cancelar" color="primary" @click="closeDialog" />
        <q-btn flat label="Salvar" color="primary" @click="saveChanges" :disabled="localBookData.name.trim()" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>



</script>
