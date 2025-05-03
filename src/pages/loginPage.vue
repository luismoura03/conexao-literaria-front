<template>
  <q-page class="login-page">
    <div class="row full-height flex flex-center">
      <div class="col-12 col-md-6 flex flex-center">
        <div class="login-form q-pa-md">
          <div class="text-center q-mb-lg">
            <q-icon name="auto_stories" size="48px" color="primary" />
            <h4 class="q-mb-lg q-mt-sm">Bem-vindo de volta</h4>
            <p class="q-pb-md text-grey-7">Entre com suas credenciais para continuar</p>
          </div>
          
          <q-form @submit="handleLogin" class="q-gutter-md">
            <q-input 
              v-model="user" 
              label="Usuário" 
              filled
              rounded
              class="input-style"
              bottom-slots
              :rules="[val => !!val || 'Usuário é obrigatório']"
            >
              <template v-slot:prepend>
                <q-icon name="person" color="primary" />
              </template>
            </q-input>
            
            <q-input 
              v-model="password" 
              label="Senha" 
              filled
              rounded
              :type="isPwdVisible ? 'text' : 'password'"
              class="input-style"
              bottom-slots
              :rules="[val => !!val || 'Senha é obrigatória']"
            >
              <template v-slot:prepend>
                <q-icon name="lock" color="primary" />
              </template>
              <template v-slot:append>
                <q-icon
                  :name="isPwdVisible ? 'visibility' : 'visibility_off'"
                  @click="isPwdVisible = !isPwdVisible"
                  class="cursor-pointer"
                />
              </template>
            </q-input>
            
            <div class="row justify-between q-my-md">
              <q-checkbox v-model="rememberMe" label="Lembrar-me" color="primary" dense />
              <q-btn flat dense color="primary" label="Esqueceu a senha?" />
            </div>
            
            <q-btn 
              type="submit"
              label="Entrar" 
              color="primary" 
              class="full-width login-btn"
              :loading="loading"
              rounded
              unelevated
            />
            
            <div class="text-center q-mt-sm">
              <p>Ainda não tem uma conta? 
                <q-btn flat color="primary" label="Registre-se" to="/register" />
              </p>
            </div>
          </q-form>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import { useLoginUser } from '../composables/useMutations/auth/loginUser';
import useNotify from '../composables/notify/useNotify';

const { notifyError } = useNotify();
const { login, loading } = useLoginUser();
const user = ref('');
const password = ref('');
const rememberMe = ref(false);
const isPwdVisible = ref(false);

const handleLogin = async () => {
  if (!user.value || !password.value) return;
  
  try {
    await login(user.value, password.value);
  } catch (error) {
    notifyError({ 
      message: 'Falha no login: ' + (error.message || 'Credenciais inválidas')
    });
  }
};
</script>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  width: 100%;
  overflow: hidden;
}

.illustration-col {
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  
  .illustration-content {
    height: 100%;
    padding: 2rem;
  }
  
  .illustration {
    max-width: 80%;
    max-height: 300px;
  }
}

.login-form {
  max-width: 450px;
  width: 100%;
  padding: 2rem;
}

.input-style {
  border-radius: 12px;
}

.login-btn {
  height: 52px;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.5px;
}

@media (max-width: 768px) {
  .login-page {
    overflow-y: auto;
  }
  
  .row.full-height {
    flex-direction: column;
    height: auto;
  }
  
  .illustration-col {
    max-height: 200px;
    padding: 1rem 0;
    
    .illustration-content {
      padding: 1rem;
    }
    
    .illustration {
      max-height: 120px;
    }
    
    h4 {
      font-size: 1.2rem;
      margin-bottom: 0.25rem !important;
    }
    
    p {
      font-size: 0.9rem;
    }
  }
  
  .login-form {
    padding: 1.5rem 1rem;
    
    h4 {
      font-size: 1.2rem;
    }
    
    p.text-grey-7 {
      font-size: 0.9rem;
    }
  }
  
  .q-checkbox {
    font-size: 0.9rem;
  }
  
  .q-icon[name="auto_stories"] {
    font-size: 36px !important;
  }
  
  .q-btn {
    min-height: 42px;
  }
}

@media (max-width: 380px) {
  .illustration-col {
    max-height: 170px;
    
    .illustration {
      max-height: 90px;
    }
  }
  
  .login-form {
    padding: 1rem;
  }
  
  .row.justify-between {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>