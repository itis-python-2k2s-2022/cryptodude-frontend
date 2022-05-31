<template>
  <div>
    <b-table striped hover borderless fixed head-variant="dark" table-variant="dark" :items="items" :fields="fields"></b-table>
  </div>
</template>

<script>
export default {
  name: "TableOfSmth",
  props: {
    items: Array,
    fields: Array,
  }
}
</script>

<style scoped>

</style>
