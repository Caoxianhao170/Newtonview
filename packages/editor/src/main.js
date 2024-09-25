import { createApp } from 'vue';
import { createPinia } from 'pinia';
import blockSuiteSetup from '@/plugins/blockSuiteSetup.ts';
import './style.css'
import App from './App.vue'
const pinia = createPinia();
const app = createApp(App);

// 物料插件注册
blockSuiteSetup(app);
// 状态库注册
app.use(pinia)
window.$pinia = pinia;
app.mount('#app')
