<template>
  <MainNavbar />
  <p/>
  <b-container>
    <div v-for="offer in listOfHotPrices">
      <OfferCard :offer="offer">
        {{ offer.exchange }} - {{ offer.name_tag }} - {{ offer.price }} - {{ offer.change }}
      </OfferCard>
      <p/>
    </div>
  </b-container>
</template>

<script>
import MainNavbar from "@/components/MainNavbar.vue";
import {BACKEND_DOMAIN} from "../constants";
import {ref} from "vue";
import OfferCard from "@/components/OfferCard.vue";

export default {
  name: "HotOffers",
  components: {OfferCard, MainNavbar },
  data() {
    const webSocket = new WebSocket(`ws://${BACKEND_DOMAIN}/crypto_api/hot_prices`, );
    const listOfHotPrices = ref([]);
    webSocket.onmessage = function (event) {
      listOfHotPrices.value = JSON.parse(event.data);
      console.log(listOfHotPrices);
    }
    return { webSocket, listOfHotPrices }
  }
};
</script>

<style scoped></style>
