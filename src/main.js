import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import 'primeicons/primeicons.css'

import App from './App.vue'

import {
  DataTable,
  Column,
  Button,
  MultiSelect,
  Dialog,
  InputText,
  ProgressSpinner, ToastService, Toast, ConfirmationService
} from 'primevue'
import TableArea from '@/components/TableArea.vue'

const app = createApp(App)

app.use(createPinia())
  .use(PrimeVue, {
    theme: {
      preset: Aura
    }
  }).use(ToastService).use(ConfirmationService);

app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('Button', Button);
app.component('MultiSelect', MultiSelect);
app.component('Dialog', Dialog);
app.component('InputText', InputText);
app.component('TableArea', TableArea)
app.component('Loading', ProgressSpinner);
app.component('Alert', Toast)

app.mount('#app');
