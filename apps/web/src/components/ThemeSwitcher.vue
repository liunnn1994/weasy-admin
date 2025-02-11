<script setup lang="ts">
  import { useTheme } from 'vuetify';
  import themeIcon from '~icons/icon-park-outline/theme';
  import { useThemes } from '@/plugins/vuetify';

  const { themes } = useThemes();

  const isDark = useDark();
  const theme = useTheme();

  const currentTheme = computed(() => (isDark.value ? 'dark' : 'light'));

  watchImmediate(isDark, (value) => {
    theme.global.name.value = value ? 'dark' : 'light';
  });

  /**
   * 切换主题
   * @param {string} theme 主题
   */
  function handleSwitchTheme(theme: string) {
    if (theme === currentTheme.value) return;
    isDark.value = theme === 'dark';
  }
</script>

<template>
  <VMenu>
    <template #activator="{ props }">
      <VBtn color="primary" v-bind="props" :icon="themeIcon" />
    </template>
    <VList>
      <VListItem
        v-for="item in themes"
        :key="item.value"
        :value="item.value"
        :active="item.value === currentTheme"
        @click="handleSwitchTheme(item.value)"
      >
        <VListItemTitle>
          {{ item.label }}
        </VListItemTitle>
      </VListItem>
    </VList>
  </VMenu>
</template>
