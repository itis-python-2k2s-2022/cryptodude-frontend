<script>
import {mapActions, mapGetters, mapState} from "pinia/dist/pinia";
import { useAuthStore } from "./stores/auth";
import { hasAccessToRoute } from "./services/auth";
import { getQueryParam } from "./services/utils";

export default {
  name: "App",
  computed: {
    ...mapState(useAuthStore, ["isLoading", "profile"]),
    ...mapGetters(useAuthStore, ["isAuthorized"])
  },
  methods: {
    ...mapActions(useAuthStore, ["loadProfile", "displayErrors", "finishAuth"]),
    checkAuth() {
      if (!hasAccessToRoute(this.isAuthorized, this.$route)) {
        console.log(this.isAuthorized, this.$route, "AUF")
        this.$router.push({ name: "index" });
      }
    },
  },
  async mounted() {
    const token = getQueryParam("access_token");
    const error = getQueryParam("error");
    this.displayErrors(error);
    await this.finishAuth(token);
    try {
      await this.loadProfile();
    } catch (e) {
      console.log(e);
    }
    this.checkAuth();
    console.log(this.profile);
    console.log("MOUNTED");
  },
};
</script>

<template>
  <b-spinner v-if="isLoading" />
  <div v-else>
    <router-view />
  </div>
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
