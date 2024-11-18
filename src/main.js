import { createApp } from 'vue'
import './style.css'
import { Tooltip } from 'ant-design-vue';
import App from './App.vue'
// pinia
import { createPinia } from 'pinia'


const app = createApp(App)
app.use(Tooltip)
app.use(createPinia())
app.mount('#app')
