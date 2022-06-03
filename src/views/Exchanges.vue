<template>
  <MainNavbar />

  <b-container>
    <p />
    <div v-if="isLoading">Loading ...</div>
    <div v-else-if="error">
      {{ error.message }} <button @click="loadExs">try again</button>
    </div>
    <div v-else>
      <ExchangesTable :exchanges="exchanges" />
    </div>
  </b-container>
</template>

<script>
import MainNavbar from "@/components/MainNavbar.vue";
import ExchangesTable from "@/components/ExchangesTable.vue";

import { ref } from "vue";
import { getAllExchanges } from "../services/crypto";

export default {
  name: "Exchanges",
  components: { MainNavbar, ExchangesTable },
  data() {
    const isLoading = ref(true);
    const error = ref(null);
    const exchanges = ref(null);
    const loadExs = async () => {
      isLoading.value = true;
      try {
        exchanges.value = await getAllExchanges();
        isLoading.value = false;
      } catch (e) {
        error.value = e;
      }
    };

    return { isLoading, error, exchanges, loadExs };
  },
  async mounted() {
    await this.loadExs();
  },
};
</script>

<style scoped></style>
