import './assets/main.css'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VFileUpload } from 'vuetify/labs/VFileUpload'

// Icons
//
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'


import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const vuetify = createVuetify({
  components: {
    ...components,
    VFileUpload
  },
  directives, 
  theme: {
    defaultTheme: 'light',//'system',
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})

const app = createApp(App)
app.use(router).use(vuetify).mount('#app')
