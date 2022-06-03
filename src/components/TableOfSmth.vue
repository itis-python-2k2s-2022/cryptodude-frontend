<template>
  <div>
    <b-table
      striped
      hover
      borderless
      fixed
      head-variant="dark"
      table-variant="success"
      :items="items"
      :fields="fields"
    >
      <slot> </slot>
    </b-table>
  </div>
</template>

<script>
export default {
  name: "TableOfSmth",
  props: {
    items: Array,
    fields: Array,
  },
};
</script>

<style scoped></style>
