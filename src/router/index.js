import { createRouter, createWebHistory } from "vue-router";
import CryptoCurrencies from "../views/CryptoCurrencies.vue";
import Exchanges from "../views/Exchanges.vue";
import Profile from "../views/Profile.vue";
import { useAuthStore } from "../stores/auth";
import { hasAccessToRoute } from "../services/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "index",
      component: () => import("../views/Main.vue"),
    },
    {
      path: "/welcome",
      name: "welcome",
      component: () => import("../views/Welcome.vue"),
    },
    {
      path: "/sign_up",
      name: "registration",
      component: () => import("../views/Registration.vue"),
      meta: {
        userIsAuthenticated: false,
      },
    },
    {
      path: "/sign_in",
      name: "auth",
      component: () => import("../views/Auth.vue"),
      meta: {
        userIsAuthenticated: false,
      },
    },
    {
      path: "/faq",
      name: "faq",
      component: () => import("../views/FAQ.vue"),
    },
    {
      path: "/users/me",
      name: "profile",
      component: () => import("../views/Profile.vue"),
      meta: {
        userIsAuthenticated: true,
      },
    },
    {
      path: "/users/me/edit",
      name: "profile_edit",
      component: () => import("../views/ProfileEdit.vue"),
      meta: {
        userIsAuthenticated: true,
      },
    },
    {
      path: "/exchanges",
      name: "exchanges",
      component: () => import("../views/Exchanges.vue"),
    },
    {
      path: "/exchanges/:id",
      name: "exchange",
      component: () => import("../views/Exchange.vue"),
    },
    {
      path: "/cryptocurrencies",
      name: "cryptocurrencies",
      component: () => import("../views/CryptoCurrencies.vue"),
    },
    {
      path: "/cryptocurrencies/hot_offers",
      name: "hot_offers",
      component: () => import("../views/HotOffers.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  console.log(`user is auth - ${authStore.isAuthorized}`);
  if (hasAccessToRoute(authStore.isAuthorized, to)) {
    next();
  } else {
    next({ name: "index" });
  }
});

export default router;
