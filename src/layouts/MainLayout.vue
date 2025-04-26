<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          {{ $t('lib') }}
        </q-toolbar-title>
        <LangSwitcher />

      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>

        </q-item-label>

        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import LangSwitcher from 'src/components/LangSwitcher.vue'

const linksList = [
  {
    title: 'Home',
    icon: 'home',
    link: '/'
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

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
