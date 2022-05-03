<template>
  <b-container>
    <WelcomeHeader>Authentication</WelcomeHeader>
    <AuthForm/>
  </b-container>
</template>

<script>
import WelcomeHeader from "../components/WelcomeHeader.vue";
import AuthForm from "../components/AuthForm.vue";
export default {
  name: "Auth",
  components: {WelcomeHeader, AuthForm}
}
</script>

<style scoped>

</style>
