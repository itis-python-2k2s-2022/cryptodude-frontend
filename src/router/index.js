import { createRouter, createWebHistory } from 'vue-router'
import WelcomeView from "../views/Welcome.vue"
import RegistrationView from "../views/Registration.vue"
import AuthView from "../views/Auth.vue";
import MainView from "../views/Main.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: MainView,
      meta: {
        userIsAuthenticated: true
      }
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: WelcomeView
    },
    {
      path: '/sign_up',
      name: 'registration',
      component: RegistrationView,
      meta: {
        userIsAuthenticated: false
      }
    },
    {
      path: '/sign_in',
      name: 'auth',
      component: AuthView,
      meta: {
        userIsAuthenticated: false
      }
    },
  ]
})

// TODO настроить стор чтобы этот код работал
// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.userIsAuthenticated)) {
//     // this route requires auth, check if logged in
//     // if not, redirect to login page.
//     if (!store.getters.isLoggedIn) {
//       next({ name: 'welcome' })
//     } else {
//       next() // go to wherever I'm going
//     }
//   } else if (to.matched.some(record => record.meta.userIsAuthenticated === false)) {
//     // this route requires auth, check if logged in
//     // if not, redirect to login page.
//     if (store.getters.isLoggedIn) {
//       next({ name: 'index' })
//     } else {
//       next() // go to wherever I'm going
//     }
//   } else {
//     next() // does not require auth and visible for authenticated users
//   }
// })

export default router
