<template>
  <header>
    <h1><slot></slot></h1>
  </header>
</template>

<script>
export default {
  name: "WelcomeHeader",
};
</script>

<style scoped>
h1 {
  font-family: monospace;
  font-style: normal;
  font-weight: 700;
  font-size: 128px;
  line-height: 190px;
  align-items: center;
  text-align: center;
}
</style>
