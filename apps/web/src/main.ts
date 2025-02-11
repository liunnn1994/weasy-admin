import './assets/main.css';
import { createPinia } from 'pinia';
import i18n from '@/plugins/i18n';
import vuetify from '@/plugins/vuetify';
import AppSuspense from '@/AppSuspense.vue';
import router from '@/router';

const app = createApp(AppSuspense);

i18n(app);
app.use(vuetify);
app.use(createPinia());
app.use(router);

app.mount('#app');
