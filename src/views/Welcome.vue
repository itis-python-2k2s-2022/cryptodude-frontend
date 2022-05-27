<template>
  <b-container>
    <WelcomeHeader>Crypto Dude</WelcomeHeader>
    <WelcomeBody />
  </b-container>
</template>

<style scoped></style>

<script>
import WelcomeHeader from "@/components/WelcomeHeader.vue";
import WelcomeBody from "@/components/WelcomeBody.vue";
import { BContainer } from "bootstrap-vue-3";
export default {
  name: "Welcome",
  components: { WelcomeHeader, WelcomeBody },
};
</script>
