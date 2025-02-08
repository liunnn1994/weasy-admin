import './assets/main.css';
import { createPinia } from 'pinia';
import i18n from '@/plugins/i18n';

import AppSuspense from '@/AppSuspense.vue';
import router from '@/router';

const app = createApp(AppSuspense);

app.use(createPinia());
app.use(i18n);
app.use(router);

app.mount('#app');
