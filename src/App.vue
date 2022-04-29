<script setup>
// import { RouterLink, RouterView } from 'vue-router'
import MainHeader from "./components/MainHeader.vue";
import {BContainer} from "bootstrap-vue-3";
</script>

<template>
  <b-container>
    <MainHeader/>
  </b-container>
  <RouterView />
</template>

<style>

</style>
