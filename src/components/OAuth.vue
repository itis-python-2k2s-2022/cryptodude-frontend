<template>
  <b-container>
    <b-button :href="oAuthUrl" size="lg" variant="dark" pill
      >Log in via google</b-button
    >
    <p></p>
  </b-container>
</template>

<script>
export default {
  name: "OAuth",
  components: {},
  props: {
    oAuthUrl: String,
  },
};
</script>

<style scoped></style>
