<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          {{ $t('lib') }}
        </q-toolbar-title>
        
        <!-- Language switcher estilizado -->
        <q-btn-dropdown flat color="white" icon="language" class="q-mr-md">
          <q-list>
            <q-item clickable @click="changeLanguage('pt')" v-close-popup>
              <q-item-section avatar>
                <img src="https://flagcdn.com/32x24/br.png" width="24" height="18">
              </q-item-section>
              <q-item-section>Português</q-item-section>
            </q-item>
            <q-item clickable @click="changeLanguage('en')" v-close-popup>
              <q-item-section avatar>
                <img src="https://flagcdn.com/32x24/us.png" width="24" height="18">
              </q-item-section>
              <q-item-section>English</q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer 
      v-model="leftDrawerOpen" 
      show-if-above 
      :width="280"
      :breakpoint="500"
      bordered
      class="bg-grey-1"
    >
  <q-scroll-area class="fit">
    <div class="q-pa-sm">
      <div class="row items-center q-py-md q-px-sm text-black rounded-borders">
        <q-avatar size="48px" class="q-mr-sm">
          <q-icon name="menu_book" size="32px" />
        </q-avatar>
        <div class="text-h6">Menu de acessos</div>
      </div>

      <q-list padding separator>
        
        <EssentialLink 
          v-for="link in linksList" 
          :key="link.title" 
          v-bind="link"
        />
        
        <q-separator class="q-my-md" />
        
        <q-item-label header class="text-grey-8 q-pb-xs">
          {{ $t('account') || 'Conta' }}
        </q-item-label>
        
        <q-item clickable @click="logout" v-ripple>
          <q-item-section avatar>
            <q-icon name="logout" color="negative" />
          </q-item-section>
          <q-item-section>{{ $t('actions.logout') || 'Sair' }}</q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-scroll-area>
</q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from 'src/stores/authStore';
import EssentialLink from 'components/EssentialLink.vue';

const { locale } = useI18n();
const router = useRouter();
const authStore = useAuthStore();

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

function changeLanguage(lang) {
  locale.value = lang;
}

function logout() {
  authStore.logout();
  router.push('/');
}

const linksList = [
  {
    title: 'Home',
    icon: 'home',
    link: '/home'
  },
  {
    title: 'Autores',
    icon: 'person',
    link: '/authors'
  },
  {
    title: 'Livros',
    icon: 'book',
    link: '/books'
  },
  {
    title: 'Busca livros de autores',
    icon: 'search',
    link: '/get-authors'
  },
  {
    title: 'Sobre',
    icon: 'info',
    link: '/about'
  },
  {
    title: 'Configurações',
    icon: 'settings',
    link: '/settings'
  }
]
</script>