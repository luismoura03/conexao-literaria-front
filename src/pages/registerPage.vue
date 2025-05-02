<template>
<q-page class="register-page">
  <div class="row full-height flex flex-center">
    
    <div class="col-12 col-md-6 flex flex-center">
      <div class="login-form q-pa-md">
        <div class="text-center q-mb-lg">
          <q-icon name="auto_stories" size="48px" color="primary" />
          <h4 class="q-mb-xs q-mt-sm">Crie sua conta</h4>
          <p class="text-grey-7">Registre-se para começar sua jornada literária</p>
        </div>
        
        <q-form @submit="handleRegister" class="q-gutter-md">
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
            v-model="email" 
            label="Email" 
            filled
            rounded
            type="email"
            class="input-style"
            bottom-slots
            :rules="[
              val => !!val || 'Email é obrigatório',
              val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'Email inválido'
            ]"
          >
            <template v-slot:prepend>
              <q-icon name="email" color="primary" />
            </template>
          </q-input>
          
          <q-input 
            v-model="password" 
            label="Senha" 
            filled
            rounded
            type="password"
            class="input-style"
            bottom-slots
            :rules="[val => !!val || 'Senha é obrigatória']"
          >
            <template v-slot:prepend>
              <q-icon name="lock" color="primary" />
            </template>
          </q-input>

          <q-input 
            v-model="firstName" 
            label="Nome" 
            filled
            rounded
            type="text"
            class="input-style"
            bottom-slots
            :rules="[val => !!val || 'Nome é obrigatório']"
          >
            <template v-slot:prepend>
              <q-icon name="person" color="primary" />
            </template>
          </q-input>

          <q-input 
            v-model="lastName" 
            label="Sobrenome" 
            filled
            rounded
            type="text"
            class="input-style"
            bottom-slots
            :rules="[val => !!val || 'Sobrenome é obrigatório']"
          >
            <template v-slot:prepend>
              <q-icon name="person" color="primary" />
            </template>
          </q-input>
          
          <q-btn 
            type="submit"
            label="Registrar" 
            color="primary" 
            class="full-width login-btn"
            :loading="loading"
            rounded
            unelevated
          />
          
          <div class="text-center q-mt-sm">
            <p>Já tem uma conta? 
              <q-btn flat color="primary" label="Entre aqui" to="/" />
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
import { useRegisterUser } from '../composables/useMutations/auth/registerUser';
import useNotify from '../composables/notify/useNotify';

const { notifyError } = useNotify();
const { register, loading } = useRegisterUser();
const user = ref('');
const email = ref('');
const password = ref('');
const firstName = ref('');
const lastName = ref('');

const handleRegister = async () => {
  if (!user.value || !password.value || !email.value) {
    notifyError({ 
      message: 'Preencha todos os campos' 
    });
    return;
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    notifyError({ 
      message: 'Por favor, informe um email válido'
    });
    return;
  }
  
  try {
    await register(user.value, password.value, email.value, firstName.value, lastName.value);
  } catch (error) {
    notifyError({ 
      message: 'Falha no registro: ' + (error.message || 'Usuário já existe ou dados inválidos')
    });
  }
};
</script>

<style lang="scss" scoped>
.register-page {
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
}
</style>