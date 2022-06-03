<template>
  <MainNavbar />
  <div v-if="isLoading">Loading ...</div>
  <div v-else-if="error">
    {{ error.message }} <button @click="loadExs">try again</button>
  </div>
  <div v-else>
    <MainPricesTable :items="prices"/>
  </div>
</template>

<script>
import MainNavbar from "@/components/MainNavbar.vue";
import {ref} from "vue/dist/vue";
import { getPrices } from "../services/crypto";
export default {
  name: "Main",
  components: { MainNavbar },
  data() {
    const isLoading = ref(true);
    const error = ref(null);
    const prices = ref(null);
    const loadPrices = async () => {
      isLoading.value = true;
      try {
        prices.value = await getPrices();
        isLoading.value = false;
      } catch (e) {
        error.value = e;
      }
    };

    return { isLoading, error, prices, loadPrices };
  },
  async mounted() {
    await this.loadPrices();
  },
};
</script>

<style scoped></style>
