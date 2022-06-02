<template>
  <MainNavbar />

  <b-container>
    <p />
    <div v-if="isLoading">Loading ...</div>
    <div v-else-if="error">
      {{ error.message }} <button @click="loadExs">try again</button>
    </div>
    <div v-else>
      <div class="bg-warning">
        <b-table
          hover
          borderless
          variant="dark"
          head-variant="dark"
          table-variant="success"
          :items="exchanges"
          :fields="fields"
        >
          <template #cell(name)="data">
            <router-link :to="{ name: 'exchange', params: { id: data.item.id } }">{{
              data.value
            }}</router-link>
          </template>
          <template #cell(fee_url)="data">
            <b-link :href="data.value" target="_blank">Подробнее</b-link>
          </template>
        </b-table>
      </div>
    </div>
  </b-container>
</template>

<script>
import MainNavbar from "@/components/MainNavbar.vue";
import TableOfSmth from "@/components/TableOfSmth.vue";

import { ref } from "vue";
import { getAllExchanges } from "../services/crypto";
import {getURLForImage} from "../services/utils";

export default {
  name: "Exchanges",
  components: { MainNavbar },
  data() {
    const fields = [
      {
        key: 'logo',
        label: '',
        formatter: (value, key, item) => {
          return getURLForImage(value)
        },
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
