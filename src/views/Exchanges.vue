<template>
  <MainNavbar />

  <b-container>
    <p />
    <div v-if="isLoading">Loading ...</div>
    <div v-else-if="error">
      {{ error.message }} <button @click="loadExs">try again</button>
    </div>
    <div v-else>
      <TableOfSmth
        striped
        hover
        borderless
        fixed
        head-variant="dark"
        table-variant="dark"
        :items="exchanges"
        :fields="fields"
      >
        <template #cell(id)="data">
          <router-link :to="{ name: 'exchange', params: { id: data } }">{{
            data
          }}</router-link>
        </template>
      </TableOfSmth>
    </div>
  </b-container>
</template>

<script>
import MainNavbar from "@/components/MainNavbar.vue";
import TableOfSmth from "@/components/TableOfSmth.vue";

import { ref } from "vue";
import { getAllExchanges } from "../services/crypto";

export default {
  name: "Exchanges",
  components: { TableOfSmth, MainNavbar },
  data() {
    const fields = [
      {
        key: "id",
        label: "Page",
      },
      "name",
      "url",
      "maker_fee",
      "taker_fee",
      "fee_url",
    ];
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

    return { isLoading, error, exchanges, loadExs, fields };
  },
  async mounted() {
    await this.loadExs();
  },
};
</script>

<style scoped></style>
