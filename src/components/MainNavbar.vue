<template>
  <b-nav class="navbar navbar-expand-lg bg-dark navbar-dark text-lg-center font-monospace">
    <div class="container-fluid">
      <router-link class="navbar-brand" :to="{ name: 'index' }">CryptoDude</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <b-collapse class="navbar-collapse" id="navbarScroll">
        <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 100px;">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Link
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
              <li v-if="!isAuthorized">
                <router-link :to="{ name: 'registration' }" class="dropdown-item">Sign up</router-link>
              </li>
              <li v-if="!isAuthorized">
                <router-link :to="{ name: 'auth' }" class="dropdown-item">Sign in</router-link>
              </li>
              <li v-if="isAuthorized">
                <router-link :to="{ name: 'profile' }" class="dropdown-item">My profile</router-link>
              </li>
              <li v-if="isAuthorized">
                <b-link href="#" class="dropdown-item" @click="onLogOutClick">Log out</b-link>
              </li>

            </ul>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Link</a>
          </li>
        </ul>
        <form class="d-flex">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </b-collapse>
    </div>
  </b-nav>
</template>

<script>
import {BButton, BCollapse, BContainer, BDropdown, BLink, BNav} from "bootstrap-vue-3";
import {mapGetters} from "pinia/dist/pinia";
import {useAuthStore} from "../stores/auth";
import {removeToken} from "../services/auth";
export default {
  name: "MainNavbar",
  components: {BLink, BButton, BDropdown, BCollapse, BContainer, BNav},
  computed: {
    ...mapGetters(useAuthStore, ["isAuthorized"]),
  },
  methods: {
    onLogOutClick(event) {
      removeToken();
      location.reload();
      this.$router.push({ name: 'index' });
    }
  }
}
</script>

<style scoped>

</style>