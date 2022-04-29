<script setup>
// import { RouterLink, RouterView } from 'vue-router'
import WelcomeHeader from "./components/WelcomeHeader.vue";
import {BContainer} from "bootstrap-vue-3";
</script>

<template>
  <b-container>
    <WelcomeHeader/>
  </b-container>
  <RouterView />
</template>

<style>
.color-custom-blue {
  color: #285AB8;
}
.color-custom-yellow {
  color: #FEFFA1;
}
</style>
