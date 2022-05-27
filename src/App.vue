<script>
import { mapActions, mapState } from "pinia/dist/pinia";
import { useAuthStore } from "./stores/auth";
import { hasAccessToRoute } from "./services/auth";
import { getQueryParam } from "./services/utils";

export default {
  name: "App",
  computed: {
    ...mapState(useAuthStore, ["isLoading"]),
  },
  methods: {
    ...mapActions(useAuthStore, ["loadProfile", "displayErrors", "finishAuth"]),
    checkAuth() {
      if (!hasAccessToRoute(this.isAuthorized, this.$route)) {
        if (this.$route.meta.userIsAuthenticated) {
          this.$router.push({ name: "welcome" });
        } else {
          this.$router.push({ name: "index" });
        }
      }
    },
  },
  async mounted() {
    const token = getQueryParam("token");
    const error = getQueryParam("error");

    this.displayErrors(error);
    await this.finishAuth(token);
    await this.loadProfile();
    this.checkAuth();
  },
};
</script>

<template>
  <b-spinner v-if="isLoading" />
  <b-container v-else>
    <router-view />
  </b-container>
</template>

<style>
.color-custom-blue {
  background-color: #285ab8;
}
.color-custom-yellow {
  color: #feffa1;
}
.color-custom-green {
  color: #5ba37b;
}
.btn-custom-blue {
  background-color: #285ab8;
  border-color: #4f74b4;
}
</style>
