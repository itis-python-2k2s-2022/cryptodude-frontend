<template>
  <b-nav class="navbar navbar-expand-lg bg-dark navbar-dark text-lg-center font-monospace">
    <div class="container-fluid">
      <router-link class="navbar-brand" :to="{ name: 'index' }">CryptoDude</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <b-collapse class="navbar-collapse" id="navbarScroll">
        <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 100px;">
          <li class="nav-item" v-if="$route.name !== 'hot_offers'">
            <router-link id="nav_hot_offers" class="nav-link active" aria-current="page" :to="{ name: 'hot_offers' }">Hot offers</router-link>
          </li>
          <li class="nav-item" v-if="$route.name !== 'cryptocurrencies'">
            <router-link id="nav_cryptocurrencies" class="nav-link active" aria-current="page" :to="{ name: 'cryptocurrencies' }">Cryptocurrencies</router-link>
          </li>
          <li class="nav-item" v-if="$route.name !== 'exchanges'">
            <router-link id="nav_exchanges" class="nav-link active" aria-current="page" :to="{ name: 'exchanges' }">Exchanges</router-link>
          </li>
        </ul>
        <ul class="navbar-nav dropdown-menu-end my-5 my-lg-2 navbar-nav-scroll">
          <li class="nav-item" v-if="$route.name !== 'faq'">
            <router-link id="nav_faq" class="nav-link active" aria-current="page" :to="{ name: 'faq' }">FAQ</router-link>
          </li>
          <li class="nav-item" v-if="$route.name !== 'welcome'">
            <router-link id="nav_welcome" class="nav-link active" aria-current="page" :to="{ name: 'welcome' }">Welcome</router-link>
          </li>

          <li class="nav-item dropdown-menu-end" aria-expanded="false">
            <a class="nav-link dropdown-toggle" href="#" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <span v-if="isAuthorized"><b-avatar :src="usrImgSrc" size="1.5rem"></b-avatar>&nbsp;{{ profile.name }}</span>
              <span v-else>Me</span>
            </a>
            <ul class="dropdown-menu dropdown-menu-lg-end" aria-labelledby="navbarScrollingDropdown">
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
                <router-link :to="{ name: 'profile_edit' }" class="dropdown-item">Edit profile</router-link>
              </li>
              <li v-if="isAuthorized">
                <b-link href="#" class="dropdown-item" @click="onLogOutClick">Log out</b-link>
              </li>

            </ul>
          </li>
        </ul>
      </b-collapse>
    </div>
  </b-nav>
</template>

<script>
import {BButton, BCollapse, BContainer, BDropdown, BLink, BNav} from "bootstrap-vue-3";
import {mapGetters, mapState} from "pinia/dist/pinia";
import {useAuthStore} from "../stores/auth";
import {removeToken} from "../services/auth";
import {getURLForImage} from "../services/utils";
export default {
  name: "MainNavbar",
  components: {BLink, BButton, BDropdown, BCollapse, BContainer, BNav},
  computed: {
    ...mapState(useAuthStore, ["profile"]),
    ...mapGetters(useAuthStore, ["isAuthorized", "currentUser"]),
    usrImgSrc() {
      return getURLForImage(this.currentUser.photo)
    }
  },
  methods: {
    onLogOutClick(event) {
      removeToken();
      location.reload();
      this.$router.push({ name: 'index' });
    },
  },
}
</script>

<style scoped>

</style>