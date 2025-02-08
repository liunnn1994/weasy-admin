import { fallbackLng, preload } from '@echo-mind/locales/index';
import type { Router } from 'vue-router';

export const SUPPORT_LOCALES = preload.map((item) => item.lng);

/**
 * 获取默认语言
 * @returns 默认语言
 */
export function getDefaultLang() {
  const preferredLang = localStorage.getItem(LANG_STORAGE_KEY) ?? usePreferredLanguages().value[0];
  if (!SUPPORT_LOCALES.includes(preferredLang)) {
    return fallbackLng;
  }
  return preferredLang;
}

/**
 * 国际化路由守卫
 * @param router 路由
 */
export default function (router: Router) {
  router.beforeEach(async (to, from, next) => {
    const paramsLocale = (to.params.lang as string) ?? getDefaultLang();

    if (!SUPPORT_LOCALES.includes(paramsLocale)) {
      return next({ name: to.name, params: { lang: getDefaultLang() } });
    }

    return next();
  });
}
