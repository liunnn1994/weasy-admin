<script setup lang="ts">
  import { preload } from '@echo-mind/locales/index';
  import languageIcon from '~icons/flowbite/language-outline';

  const route = useRoute();
  const router = useRouter();

  const currentLng = computed(() => route.params.lang);

  /**
   * 切换语言
   * @param {string} lng 语言
   */
  function handleSwitchLanguage(lng: string) {
    router.push({
      name: route.name,
      params: {
        lang: lng,
      },
    });
  }
</script>

<template>
  <VMenu>
    <template #activator="{ props }">
      <VBtn color="primary" v-bind="props" :icon="languageIcon" />
    </template>
    <VList>
      <VListItem
        v-for="item in preload"
        :key="item.lng"
        :value="item.lng"
        :active="item.lng === currentLng"
        @click="handleSwitchLanguage(item.lng)"
      >
        <VListItemTitle>
          {{ item.label }}
        </VListItemTitle>
      </VListItem>
    </VList>
  </VMenu>
</template>
