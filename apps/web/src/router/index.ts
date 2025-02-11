import { createRouter, createWebHistory } from 'vue-router';
import NProgress from 'nprogress';
import i18nGuard, { getDefaultLang } from '@/router/i18nGuard';
import { RouterNameEnum } from '@/enum/router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: {
        name: RouterNameEnum.DASHBOARD_NAME,
        params: {
          lang: getDefaultLang(),
        },
      },
    },
    {
      path: '/:lang/dashboard',
      name: RouterNameEnum.DASHBOARD_NAME,
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/:lang/about',
      name: RouterNameEnum.ABOUT_NAME,
      component: () => import('@/views/AboutView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: RouterNameEnum.NOT_FOUND_NAME,
      component: () => import('@/views/NotFoundView.vue'),
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  return next();
});

router.afterEach(() => {
  NProgress.done();
});

i18nGuard(router);

export default router;
