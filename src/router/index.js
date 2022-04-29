import { createRouter, createWebHistory } from 'vue-router'
import WelcomeView from "../views/Welcome.vue"
import RegistrationView from "../views/Registration.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: WelcomeView
    },
    {
      path: '/sign_up',
      name: 'registration',
      component: RegistrationView
    },
  ]
})

export default router
