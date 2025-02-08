<script setup lang="ts">
  import { i18nextPromise } from '@/plugins/i18n';

  await i18nextPromise;
</script>

<template>
  <RouterView />
</template>
