<template>
<b-card bg-variant="dark" text-variant="white" text-size="lg" size="lg">
  <b-card-header>
    <b-card-text>
      <h3>
        Exchange - {{ offer.exchange }}
      </h3>
    </b-card-text>
  </b-card-header>
  <b-card-body>
  <b-card-text>
    <h3>
      Currency&nbsp;-&nbsp;{{ offer.name_tag }}&nbsp;-&nbsp;{{ offer.price }}&nbsp;
      <b-badge v-if="changeIsPos(offer.change)" variant="success">{{ absChange(offer.change) }}%</b-badge>
      <b-badge v-if="changeIsNeg(offer.change)" variant="danger">{{ absChange(offer.change) }}%</b-badge>
      <b-badge v-if="changeIsNeu(offer.change)" variant="secondary">{{ absChange(offer.change) }}%</b-badge>
    </h3>
  </b-card-text>
  </b-card-body>
</b-card>
</template>

<script>
import {BBadge, BCardHeader} from "bootstrap-vue-3";
export default {
  name: "OfferCard",
  components: {BBadge, BCardHeader},
  props: {
    offer: {
      type: Object,
      required: true,
    },
  },
  methods: {
    change(x) {
      return parseFloat(x);
    },
    changeIsPos(x) {
      return this.change(x) > 0
    },
    changeIsNeg(x) {
      return this.change(x) < 0
    },
    changeIsNeu(x) {
      return this.change(x) === 0
    },
    absChange(x) {
      return Math.abs(this.change(x))
    },
  }

}
</script>

<style scoped>

</style>