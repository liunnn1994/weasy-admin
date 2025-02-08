import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import AppSuspense from '@/AppSuspense.vue';
import router from '@/router';

const app = createApp(AppSuspense);

app.use(createPinia());
app.use(router);

app.mount('#app');
