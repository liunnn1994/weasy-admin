import '@/assets/vuetify.scss';
import { createVuetify } from 'vuetify';
import { useTranslation } from 'i18next-vue';

/**
 * 处理主题
 * @returns 主题相关数据
 */
export function useThemes() {
  const { t } = useTranslation();
  const themes = [
    {
      label: t('theme.light'),
      value: 'light',
    },
    {
      label: t('theme.dark'),
      value: 'dark',
    },
  ];

  return { themes };
}

export default createVuetify({
  theme: {
    defaultTheme: 'light',
  },
});
