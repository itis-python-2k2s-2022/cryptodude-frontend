import { createRouter, createWebHistory } from "vue-router";
import WelcomeView from "../views/Welcome.vue";
import RegistrationView from "../views/Registration.vue";
import AuthView from "../views/Auth.vue";
import MainView from "../views/Main.vue";
import FAQView from "../views/FAQ.vue";
import { useAuthStore } from "../stores/auth";
import { hasAccessToRoute } from "../services/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "index",
      component: MainView,
    },
    {
      path: "/welcome",
      name: "welcome",
      component: WelcomeView,
    },
    {
      path: "/sign_up",
      name: "registration",
      component: RegistrationView,
      meta: {
        userIsAuthenticated: false,
      },
    },
    {
      path: "/sign_in",
      name: "auth",
      component: AuthView,
      meta: {
        userIsAuthenticated: false,
      },
    },
    {
      path: '/faq',
      name: 'faq',
      component: FAQView,
    },
    {
      path: '/users/me',
      name: 'profile',
      component: FAQView,
      meta: {
        userIsAuthenticated: false,
      },
    },
    {
      path: '/exchanges',
      name: 'profile',
      component: FAQView,
    },
    {
      path: '/cryptocurrencies',
      name: 'profile',
      component: FAQView,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (hasAccessToRoute(authStore.isAuthorized, to)) {
    next();
  } else {
    next({ name: "index" });
  }
});

export default router;
