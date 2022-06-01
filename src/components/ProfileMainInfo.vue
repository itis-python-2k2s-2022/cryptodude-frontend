<template>
  <b-card
    :img-src="userImageSrc"
    img-alt="Card image"
    img-left
    img-height="280"
    img-width="280"
    class="bg-dark text-light font-monospace"
  >
    <b-card-text>
      <h3>
        Name: <b>{{ user.name }}</b>
      </h3>
    </b-card-text>
    <b-card-text>
      <h3>
        Email: <b>{{ user.email }}</b>
      </h3>
    </b-card-text>
    <b-button :to="{ name: 'profile_edit' }" variant="info">Edit</b-button>
  </b-card>
</template>

<script>
import { getURLForImage } from "../services/utils";
export default {
  name: "ProfileMainInfo",
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      userImageSrc: getURLForImage(this.user.photo),
    };
  },
};
</script>

<style scoped></style>
