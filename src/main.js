import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap' // added boostrap via npm 
import 'bootstrap/dist/css/bootstrap.min.css'
import router from './router'


createApp(App).use(router).mount('#app')
