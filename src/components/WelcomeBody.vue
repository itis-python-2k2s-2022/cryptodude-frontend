<template>
  <div>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
      ut aliquip ex ea commodo consequat.
    </p>
    <div class="centered">
      <b-button pill variant="primary" size="lg" class="btn-custom-blue font-monospace" :to="{ name: 'registration' }"><span>Join now</span></b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "WelcomeBody",
  components: {}

}
</script>

<style scoped>
p {
  margin-top: 1.5em;
  font-family: monospace;
  font-style: normal;
  font-weight: 400;
  font-size: 3em;
  line-height: 1.6em;
  align-items: center;
  text-align: center;
}

span {
  margin: 0.5em;
  font-size: 2.3em;
  font-family: monospace;

}

.centered {
  margin: 4em;
  align-items: center;
  text-align: center;
}
</style>