<template>
  <q-page class="register-page">
    <div class="row full-height flex flex-center">
      <div class="col-12 col-md-6 flex flex-center">
        <div class="login-form q-pa-md">
          <div class="text-center q-mb-lg">
            <q-icon name="auto_stories" size="48px" color="primary" />
            <h4 class="q-mb-lg q-mt-sm">Crie sua conta</h4>
            <p class="q-pb-sm text-grey-7">Registre-se para começar sua jornada literária</p>
          </div>
          
          <q-form @submit="handleRegister" class="q-gutter-xs">
            <div class="row q-col-gutter-xs q-my-sm">
              <div class="col-12">
                <q-input 
                  v-model="user" 
                  label="Usuário" 
                  filled
                  rounded
                  class="input-style"
                  bottom-slots
                  lazy-rules
                  :rules="[
                    val => !!val || 'Usuário é obrigatório',
                    val => val.length >= 3 || 'Usuário deve ter pelo menos 3 caracteres',
                    val => /^[a-zA-Z0-9_]+$/.test(val) || 'Usuário deve conter apenas letras, números e underlines'
                  ]"
                >
                  <template v-slot:prepend>
                    <q-icon name="person" color="primary" />
                  </template>
                </q-input>
              </div>

              <div class="col-12">
                <q-input 
                  v-model="email" 
                  label="Email" 
                  filled
                  rounded
                  type="email"
                  class="input-style"
                  bottom-slots
                  lazy-rules
                  :rules="[
                    val => !!val || 'Email é obrigatório',
                    val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'Email inválido'
                  ]"
                >
                  <template v-slot:prepend>
                    <q-icon name="email" color="primary" />
                  </template>
                </q-input>
              </div>
              
              <div class="col-12">
                <q-input 
                  v-model="password" 
                  label="Senha" 
                  filled
                  rounded
                  :type="isPwdVisible ? 'text' : 'password'"
                  class="input-style-password"
                  bottom-slots
                  lazy-rules
                  :rules="[
                    val => !!val || '',
                    val => val.length >= 8 || 'A senha deve ter pelo menos 8 caracteres',
                    val => /[a-z]/.test(val) || 'A senha deve conter pelo menos uma letra minúscula',
                    val => /[0-9]/.test(val) || 'A senha deve conter pelo menos um número',
                  ]"
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
                <div class="password-feedback-container">
                      <div class="password-strength q-mt-sm">
                        <div class="strength-meter">
                          <div 
                            class="strength-meter-fill" 
                            :style="{ width: (passwordStrength * 25) + '%', backgroundColor: passwordStrengthColor }"
                          ></div>
                        </div>
                        <div class="strength-text q-mt-xs" :style="{ color: passwordStrengthColor }">
                          {{ passwordStrengthText }}
                        </div>
                      </div>

                      <div class="password-requirements q-mt-sm">
                        <div class="requirement" :class="{ met: password && password.length >= 8 }">
                          <q-icon :name="password && password.length >= 8 ? 'check_circle' : 'radio_button_unchecked'" size="xs" />
                          <span>Pelo menos 8 caracteres</span>
                        </div>
                        <div class="requirement" :class="{ met: /[A-Z]/.test(password) }">
                          <q-icon :name="/[A-Z]/.test(password) ? 'check_circle' : 'radio_button_unchecked'" size="xs" />
                          <span>Uma letra maiúscula</span>
                        </div>
                        <div class="requirement" :class="{ met: /[a-z]/.test(password) }">
                          <q-icon :name="/[a-z]/.test(password) ? 'check_circle' : 'radio_button_unchecked'" size="xs" />
                          <span>Uma letra minúscula</span>
                        </div>
                        <div class="requirement" :class="{ met: /[0-9]/.test(password) }">
                          <q-icon :name="/[0-9]/.test(password) ? 'check_circle' : 'radio_button_unchecked'" size="xs" />
                          <span>Um número</span>
                        </div>
                        <div class="requirement" :class="{ met: /[^A-Za-z0-9]/.test(password) }">
                          <q-icon :name="/[^A-Za-z0-9]/.test(password) ? 'check_circle' : 'radio_button_unchecked'" size="xs" />
                          <span>Um caractere especial</span>
                        </div>
                      </div>
                    </div>
                
                <q-input
                  v-model="passwordConfirmation"
                  label="Confirme sua senha"
                  filled
                  rounded
                  :type="isConfirmPwdVisible ? 'text' : 'password'"
                  class="q-pt-md input-style"
                  bottom-slots
                  lazy-rules
                  :rules="[
                    val => !!val || 'Confirmação de senha é obrigatória',
                    val => val === password || 'As senhas não coincidem'
                  ]"
                >
                  <template v-slot:prepend>
                    <q-icon name="lock" color="primary" />
                  </template>
                  <template v-slot:append>
                    <q-icon
                      :name="isConfirmPwdVisible ? 'visibility' : 'visibility_off'"
                      @click="isConfirmPwdVisible = !isConfirmPwdVisible"
                      class="cursor-pointer"
                    />
                  </template>
                </q-input>
              </div>
                <div class="col-12 col-sm-6">
                  <q-input 
                    v-model="firstName" 
                    label="Nome" 
                    filled
                    type="text"
                    class="input-style"
                    rounded
                    lazy-rules
                    :rules="[val => !!val || 'Nome é obrigatório']"
                    bottom-slots
                  >
                    <template v-slot:prepend>
                      <q-icon name="badge" color="primary" />
                    </template>
                  </q-input>
                </div>
                <div class="col-12 col-sm-6">
                  <q-input 
                    v-model="lastName" 
                    label="Sobrenome" 
                    filled
                    type="text"
                    rounded
                    class="input-style"
                    lazy-rules
                    :rules="[val => !!val || 'Sobrenome é obrigatório']"
                    bottom-slots
                  >
                    <template v-slot:prepend>
                      <q-icon name="badge" color="primary" />
                    </template>
                  </q-input>
                </div>      
            </div>
            
            <q-btn 
              type="submit"
              label="Registrar" 
              color="primary" 
              class="full-width login-btn q-mt-md"
              :loading="loading"
              rounded
              unelevated
            />
            <q-btn
            type="submit"
            label="testar confete"
            @click="confettiShower"
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
import { ref, computed } from 'vue';
import { useRegisterUser } from '../composables/useMutations/auth/registerUser';
import useNotify from '../composables/notify/useNotify';
import useConfetti from '../composables/confetti/confettiConfig'

const { notifyError } = useNotify();
const { register, loading } = useRegisterUser();
const user = ref('');
const email = ref('');
const password = ref('');
const passwordConfirmation = ref('');
const firstName = ref('');
const lastName = ref('');
const isPwdVisible = ref(false);
const isConfirmPwdVisible = ref(false);
const { confettiShower } = useConfetti();

const passwordStrength = computed(() => {
  let score = 0;
  if (!password.value || password.value.length === 0) return 0;
  
  if (password.value.length >= 8) score++;
  
  if (/[A-Z]/.test(password.value)) score++;
  if (/[a-z]/.test(password.value)) score++;
  
  if (/[0-9]/.test(password.value)) score++;
  
  if (/[^A-Za-z0-9]/.test(password.value)) score++;
  
  return Math.min(4, score);
});

const passwordStrengthText = computed(() => {
  switch(passwordStrength.value) {
    case 0: return 'Muito fraca';
    case 1: return 'Fraca';
    case 2: return 'Razoável';
    case 3: return 'Boa';
    case 4: return 'Forte';
    default: return '';
  }
});

const passwordStrengthColor = computed(() => {
  switch(passwordStrength.value) {
    case 0: return '#e53935'; 
    case 1: return '#ff9800';
    case 2: return '#fdd835';
    case 3: return '#7cb342';
    case 4: return '#43a047';
    default: return '#e0e0e0';
  }
});

const handleRegister = async () => {
  if (!user.value || !password.value || !email.value || !firstName.value || !lastName.value) {
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

  if (password.value !== passwordConfirmation.value) {
    notifyError({ 
      message: 'As senhas não coincidem' 
    });
    return;
  }
  
  try {
    await register(user.value, password.value, email.value, firstName.value, lastName.value);
    confettiShower();
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
    .password-strength {
  .strength-meter {
    height: 4px;
    background-color: rgba(0, 0, 0, 0.08);
    border-radius: 2px;
    overflow: hidden;
  }
  
  .strength-meter-fill {
    height: 100%;
    border-radius: 2px;
    transition: width 0.5s ease-in-out, background-color 0.5s ease-in-out;
  }
  
  .strength-text {
    font-size: 12px;
    font-weight: 500;
    text-align: right;
  }
}

.password-requirements {
  display: grid;
  flex-direction: row;;
  gap: 6px;
  font-size: 12px;
  
  @media (max-width: 599px) {
    grid-template-columns: 1fr;
  }
  
  .requirement {
    display: flex;
    align-items: center;
    color: #667;
    
    .q-icon {
      font-size: 14px;
      color: #bdbdbd;
    }
    
    &.met {
      color: #1976d2;
      
      .q-icon {
        color: #1976d2;
      }
    }
  }
}

.password-feedback-container {
  min-height: 160px;
  display: block;
  width: 100%;
}
    </style>