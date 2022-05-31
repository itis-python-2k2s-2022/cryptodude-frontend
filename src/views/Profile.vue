<template>
  <MainNavbar/>

  <b-container>
    <p/>
    <BRow>
      <ProfileMainInfo :user="currentUser"/>
    </BRow>
    <p/>
    <div v-if="isLoading"> Loading ... </div>
    <div v-else-if="error"> {{ error.message }} <button @click="loadSubs">try again</button> </div>
    <div v-else>
      <ProfileSubscriptions
          :crypto_items="cryptoSubs"
          :exchange_items="exchangeSubs"/>
    </div>
  </b-container>
</template>

<script>
import MainNavbar from "@/components/MainNavbar.vue";
import {mapGetters} from "pinia/dist/pinia";
import {useAuthStore} from "../stores/auth";
import ProfileMainInfo from "@/components/ProfileMainInfo.vue";
import ProfileSubscriptions from "@/components/ProfileSubscriptions.vue";

import {getCryptoSubs, getExchangeSubs} from "../services/profile";
import {ref} from "vue";

export default {
  name: "Profile",
  components: {ProfileSubscriptions, ProfileMainInfo, MainNavbar },
  computed: {
    ...mapGetters(useAuthStore, ["currentUser"]),
  },
  data() {
    const isLoading = ref(true);
    const error = ref(null);
    const exchangeSubs = ref(null);
    const cryptoSubs = ref(null);
    const loadSubs = async () => {
      isLoading.value = true;
      try {
        exchangeSubs.value = await getExchangeSubs();
        cryptoSubs.value = await getCryptoSubs();
        isLoading.value = false;
      } catch (e) {
        error.value = e;
      }
    };

    return { isLoading, error, cryptoSubs, exchangeSubs, loadSubs };
  },
  async mounted() {
    await this.loadSubs();
  }

}
</script>

<style scoped>

</style>