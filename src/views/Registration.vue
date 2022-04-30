<template>
  <b-container>
    <WelcomeHeader>Registration</WelcomeHeader>
    <RegistrationForm/>
  </b-container>
</template>

<style scoped>

</style>

<script>
import WelcomeHeader from "@/components/WelcomeHeader.vue";
import RegistrationForm from "@/components/RegistrationForm.vue";

export default {
  name: "Registration",
  components: { WelcomeHeader, RegistrationForm }
}
</script>
