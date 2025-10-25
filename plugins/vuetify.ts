import { createVuetify } from 'vuetify'
import {
  VApp,
  VMain,
  VContainer,
  VRow,
  VCol,
  VCard,
  VBtn,
  VTextField,
  VSwitch,
  VDialog,
  VSnackbar,
  VAlert,
  VPagination,
  VNavigationDrawer,
  VIcon,
  VDivider,
  VList,
  VListItem,
  VCardTitle,
  VCardText,
  VCardActions
} from 'vuetify/components'
import { Ripple, Scroll, Intersect, Touch } from 'vuetify/directives'

export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    ssr: true,
    components: {
      VApp,
      VMain,
      VContainer,
      VRow,
      VCol,
      VCard,
      VBtn,
      VTextField,
      VSwitch,
      VDialog,
      VSnackbar,
      VAlert,
      VPagination,
      VNavigationDrawer,
      VIcon,
      VDivider,
      VList,
      VListItem,
      VCardTitle,
      VCardText,
      VCardActions
    },
    directives: {
      Ripple,
      Scroll,
      Intersect,
      Touch
    }
  })
  nuxtApp.vueApp.use(vuetify)
})
