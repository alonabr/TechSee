import { createApp, reactive } from 'vue'
import App from './App.vue'
import router from './router'
import  { key, store } from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(store, key)
app.use(router)
app.use(ElementPlus)
app.mount('#app')

