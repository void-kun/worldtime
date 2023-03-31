import { createApp } from 'vue';
import { OhVueIcon } from 'oh-vue-icons';
import { createPinia } from 'pinia';

import App from '@/App.vue';
import router from '@/router';
import ClickOutside from '@/config/clickOutside';

const app = createApp(App);

app.directive('click-outside', ClickOutside);
app.component('v-icon', OhVueIcon);

app.use(createPinia());
app.use(router);
app.mount('#app');
