<template>
  <MainNavbar />

  <b-container>
    <p />
    <div v-if="isLoading">Loading ...</div>
    <div v-else-if="error">
      {{ error.message }} <button @click="loadCurs">try again</button>
    </div>
    <div v-else>
      <CurrencyTable :currencies="currencies"/>
    </div>
  </b-container>
</template>

<script>
import MainNavbar from "@/components/MainNavbar.vue";
import CurrencyTable from "@/components/CurrencyTable.vue";

import { ref } from "vue";
import { getAllCurrencies } from "../services/crypto";
import { BAvatar } from "bootstrap-vue-3";

export default {
  name: "CryptoCurrencies",
  components: { BAvatar, MainNavbar, CurrencyTable},
  data() {
    const isLoading = ref(true);
    const error = ref(null);
    const currencies = ref(null);
    const loadCurs = async () => {
      isLoading.value = true;
      try {
        currencies.value = await getAllCurrencies();

        isLoading.value = false;
      } catch (e) {
        error.value = e;
      }
    };

    return { isLoading, error, currencies, loadCurs };
  },
  async mounted() {
    await this.loadCurs();
  },
};
</script>

<style scoped></style>
