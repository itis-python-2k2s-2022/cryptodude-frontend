<template>
  <b-card no-body variant="dark" class="bg-warning">
    <b-table
        striped
        hover
        borderless
        fixed
        head-variant="dark"
        table-variant="success"
        :items="exchanges"
        :fields="fields">
      <template #cell(logo)="data">
        <b-avatar :src="data.value" size="1.5rem" />&nbsp;
        <router-link :to="{ name: 'exchange', params: { id: data.item.id } }">{{
          data.item.name
        }}</router-link>
      </template>
      <template #cell(fee_url)="data">
        <b-link :href="data.value" target="_blank">Details</b-link>
      </template>
    </b-table>
  </b-card>
</template>

<script>
import { getURLForImage } from "../services/utils";
import TableOfSmth from "./TableOfSmth.vue";

export default {
  name: "ExchangesTable",
  components: { TableOfSmth },
  props: {
    exchanges: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      fields: [
        {
          key: "logo",
          label: "Name",
          formatter: (value, key, item) => {
            return getURLForImage(value);
          },
        },
        "url",
        "maker_fee",
        "taker_fee",
        "fee_url",
      ],
    };
  },
};
</script>

<style scoped></style>
