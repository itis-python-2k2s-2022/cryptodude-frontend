<template>
  <b-card no-body class="bg-warning">
    <b-table
        striped
        hover
        borderless
        fixed
        head-variant="dark"
        table-variant="success"
        :items="items"
        :fields="fields">
    </b-table>
  </b-card>
</template>

<script>
export default {
  name: "MainPricesTable",
  components: {},
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      fields: [
        "currency",
        "exchange",
        {
          key: "price_history",
          label: "Price",
          formatter: (value, key, item) => {
            return value[0].price;
          },
        },
      ],
    };
  },

}
</script>

<style scoped>

</style>