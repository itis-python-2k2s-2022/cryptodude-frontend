<script setup>
// import { RouterLink, RouterView } from 'vue-router'
import WelcomeHeader from "./components/WelcomeHeader.vue";
import WelcomeBody from "./components/WelcomeBody.vue";
import {BContainer} from "bootstrap-vue-3";
</script>

<template>
  <b-container>
    <WelcomeHeader/>
    <WelcomeBody/>
  </b-container>
  <RouterView />
</template>

<style>
.color-custom-blue {
  background-color: #285AB8;
}
.color-custom-yellow {
  color: #FEFFA1;
}
.btn-custom-blue {
  background-color: #285AB8;
  border-color: #326cd2;
}
</style>
