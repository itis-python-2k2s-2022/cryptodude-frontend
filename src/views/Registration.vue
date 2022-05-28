<template>
  <b-container>
    <WelcomeHeader>Registration</WelcomeHeader>
    <OAuth v-if="!isAuthorized" :o-auth-url="authUrl" />
    <RegistrationForm />
  </b-container>
</template>

<style scoped></style>

<script>
import WelcomeHeader from "@/components/WelcomeHeader.vue";
import RegistrationForm from "@/components/RegistrationForm.vue";
import OAuth from "@/components/OAuth.vue";
import { mapGetters } from "pinia/dist/pinia";
import { useAuthStore } from "../stores/auth";
import { getOAuthUrl } from "../services/auth";

export default {
  name: "Registration",
  components: { OAuth, WelcomeHeader, RegistrationForm },
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
