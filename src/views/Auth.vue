<template>
  <b-container>
    <WelcomeHeader>Authentication</WelcomeHeader>
    <OAuth v-if="!isAuthorized" :o-auth-url="authUrl" />
    <AuthForm />
  </b-container>
</template>

<script>
import WelcomeHeader from "../components/WelcomeHeader.vue";
import AuthForm from "../components/AuthForm.vue";
import { getOAuthUrl } from "../services/auth";
import { mapGetters } from "pinia/dist/pinia";
import { useAuthStore } from "../stores/auth";
import OAuth from "@/components/OAuth.vue";
export default {
  name: "Auth",
  components: { OAuth, WelcomeHeader, AuthForm },
  data() {
    return {
      profile: null,
      authUrl: getOAuthUrl(),
    };
  },
  computed: {
    ...mapGetters(useAuthStore, ["isAuthorized"]),
  },
};
</script>

<style scoped></style>
