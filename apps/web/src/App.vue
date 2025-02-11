<script setup lang="ts">
  import { useTranslation } from 'i18next-vue';
  import { i18nextPromise } from '@/plugins/i18n';

  const { i18next } = useTranslation();
  const route = useRoute();

  watchImmediate(
    () => route.params.lang,
    async (lang) => {
      if (lang) {
        await i18next.changeLanguage(lang as string);
      }
      localStorage.setItem(LANG_STORAGE_KEY, i18next.language);
    },
  );

  await i18nextPromise;
</script>

<template>
  <RouterView />
</template>
