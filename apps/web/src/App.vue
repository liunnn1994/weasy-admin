<script setup lang="ts">
  import { useTranslation } from 'i18next-vue';
  import { i18nextPromise } from '@/plugins/i18n';

  const { i18next } = useTranslation();

  const route = useRoute();

  watchImmediate(
    () => route.params.lang,
    (lang) => {
      console.log('-------------------App.vue watch', lang);
      if (lang) {
        i18next.changeLanguage(lang as string);
      }
    },
  );

  await i18nextPromise;
</script>

<template>
  <RouterView />
</template>
