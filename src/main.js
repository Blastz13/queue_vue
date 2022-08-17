import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueClipboard from 'vue-clipboard2'
import Vuelidate from 'vuelidate'

createApp(App).use(store).use(VueClipboard).use(Vuelidate).use(router).mount('#app')
