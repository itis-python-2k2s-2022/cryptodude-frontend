import { createRouter, createWebHistory } from "vue-router";
import WelcomeView from "../views/Welcome.vue";
import RegistrationView from "../views/Registration.vue";
import AuthView from "../views/Auth.vue";
import MainView from "../views/Main.vue";
import { useAuthStore } from "../stores/auth";
import { hasAccessToRoute } from "../services/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "index",
      component: MainView,
      meta: {
        userIsAuthenticated: true,
      },
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
  ],
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (hasAccessToRoute(authStore.isAuthorized, to)) {
    next();
  } else if (to.matched.some((record) => record.meta.userIsAuthenticated)) {
    next({ name: "welcome" });
  } else {
    next({ name: "index" });
  }
});

export default router;
