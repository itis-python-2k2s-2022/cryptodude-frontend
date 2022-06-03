<template>
  <b-card no-body class="bg-warning">
    <b-table
      stripped
      hover
      borderless
      fixed
      head-variant="dark"
      table-variant="success"
      :items="currencies"
      :fields="fields"
    >
      <template #cell(logo)="data">
        <b-avatar :src="data.value" size="1.5rem" />&nbsp;
        <router-link :to="{ name: 'currency', params: { id: data.item.id } }">
          {{ data.item.name }}
        </router-link>
      </template>
    </b-table>
  </b-card>
</template>

<script>
import {getURLForImage} from "../services/utils";

export default {
  name: "CurrencyTable",
  components: {},
  props: {
    currencies: {
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
        "code_name",
      ]
    }
  },

};
</script>

<style scoped></style>
