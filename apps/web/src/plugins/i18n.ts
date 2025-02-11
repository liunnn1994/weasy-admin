import i18next from 'i18next';
import I18NextVue from 'i18next-vue';
import LanguageDetector from 'i18next-browser-languagedetector';
import { fallbackLng, preload } from '@echo-mind/locales/index';
import Backend from 'i18next-http-backend';
import type { App } from 'vue';
import { getDefaultLang } from '@/router/i18nGuard';

export const i18nextPromise = i18next
  // i18next-http-backend
  // loads translations from your server
  // https://github.com/i18next/i18next-http-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    supportedLngs: preload.map((item) => item.lng),
    backend: {
      loadPath: '/api/locale/{{lng}}',
    },
    fallbackLng,
    load: 'currentOnly',
    lng: getDefaultLang(),
  });

/**
 * i18n plugin
 * @param app App
 * @returns App
 */
export default function (app: App) {
  app.use(I18NextVue, { i18next });
  return app;
}
