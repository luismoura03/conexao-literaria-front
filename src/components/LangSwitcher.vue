<script setup>
import { useI18n } from 'vue-i18n';
const { locale } = useI18n();
const changeLanguage = (lang) => {
  locale.value = lang;
};
</script>

<template>
  <q-btn @click="changeLanguage('en')" label="English"/>
  <q-btn @click="changeLanguage('pt')" label="Português"/>
</template>