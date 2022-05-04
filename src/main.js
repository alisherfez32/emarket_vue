import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

// axios.defaults.baseURL = "http://127.0.0.1:80"
axios.defaults.baseURL = "http://35.158.203.11"
createApp(App).use(store).use(router, axios).mount('#app')
