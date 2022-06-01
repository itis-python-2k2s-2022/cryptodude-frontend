<template>
  <div>
    <b-card no-body>
      <b-tabs v-model="tabIndex" card class="font-monospace">
        <b-tab title="Cryptocurrencies subs" :title-link-class="linkClass(0)">
          <TableOfSmth :items="crypto_items" :fields="crypto_fields" />
        </b-tab>
        <b-tab title="Exchanges subs" :title-link-class="linkClass(1)">
          <TableOfSmth :items="exchange_items" :fields="exchange_fields" />
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import TableOfSmth from "@/components/TableOfSmth.vue";
export default {
  name: "ProfileSubscriptions",
  components: { TableOfSmth },
  props: {
    crypto_items: Array,
    exchange_items: Array,
  },
  data() {
    return {
      tabIndex: 0,
      crypto_fields: ["name"],
      exchange_fields: ["name", "url"],
    };
  },
  methods: {
    linkClass(idx) {
      if (this.tabIndex === idx) {
        return ["bg-dark", "text-light"];
      } else {
        return ["bg-secondary", "text-info"];
      }
    },
  },
};
</script>

<style scoped></style>
