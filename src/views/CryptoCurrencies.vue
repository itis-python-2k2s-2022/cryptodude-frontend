<template>
  <MainNavbar />

  <b-container>
    <p />
    <div v-if="isLoading">Loading ...</div>
    <div v-else-if="error">
      {{ error.message }} <button @click="loadCurs">try again</button>
    </div>
    <div v-else>
      <div class="bg-warning">
        <b-table
            hover
            borderless
            fixed
            variant="dark"
            head-variant="dark"
            table-variant="success"
            :items="exchanges"
            :fields="fields"
        >
          <template #cell(logo)="data">
            <b-avatar :src="data.value" size="1.5rem"/>&nbsp;
            <router-link :to="{ name: 'currency', params: { id: data.item.id } }">
              {{ data.item.name }}
            </router-link>
          </template>
        </b-table>
      </div>
    </div>
  </b-container>
</template>

<script>
import MainNavbar from "@/components/MainNavbar.vue";

import { ref } from "vue";
import {getAllCurrencies} from "../services/crypto";
import {getURLForImage} from "../services/utils";
import {BAvatar} from "bootstrap-vue-3";

export default {
  name: "CryptoCurrencies",
  components: {BAvatar, MainNavbar },
  data() {
    const fields = [
      {
        key: 'logo',
        label: 'name',
        formatter: (value, key, item) => {
          return getURLForImage(value)
        },
      },
      "code_name",
    ];
    const isLoading = ref(true);
    const error = ref(null);
    const exchanges = ref(null);
    const loadCurs = async () => {
      isLoading.value = true;
      try {
        exchanges.value = await getAllCurrencies();

        isLoading.value = false;
      } catch (e) {
        error.value = e;
      }
    };

    return { isLoading, error, exchanges, loadCurs, fields };
  },
  async mounted() {
    await this.loadCurs();
  },
};
</script>

<style scoped></style>
