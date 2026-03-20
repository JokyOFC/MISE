import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { initThemeFromStorage, watchThemeStorageSync } from './composables/useTheme'
import { i18n, initLocalePersistence } from './i18n'

initThemeFromStorage()
watchThemeStorageSync()
initLocalePersistence()

createApp(App).use(router).use(i18n).mount('#app')
