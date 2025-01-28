<!-- <template>
  <q-dialog :model-value="isOpen" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">Tem certeza que deseja deletar o livro "{{ book.title}}" ?</div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" @click="closeDialog" />
          <q-btn flat label="Deletar" color="red" @click="confirmDelete" />
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  isOpen: Boolean,
  book: Object
})

const emit = defineEmit(['close', 'confirmDelete'])

const closeDialog = () => {
  emit('confirmDelete', book)
}
</script> -->
