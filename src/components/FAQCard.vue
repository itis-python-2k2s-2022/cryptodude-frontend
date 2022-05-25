<template>
  <div class="font-monospace">
    <b-card bg-variant="warning" text-variant="black">
      <blockquote class="card-blockquote">
        <p>{{ ptext }}</p>
      </blockquote>
      <b-button @click="onClick" variant="dark" pill>{{ btext }}</b-button>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "FAQCard",
  components: {},
  props: {
    question: {
      type: String,
      required: true
    },
    answer: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      ptexts: [this.question, this.answer],
      btexts: ["Show answer", "Show question"],
      idx: 0
    }
  },
  computed: {
    ptext() {
      return this.ptexts[this.idx]
    },
    btext() {
      return this.btexts[this.idx]
    }
  },
  methods: {
    onClick(event) {
      this.idx = (this.idx + 1) % 2
    }
  }
}
</script>

<style scoped>

</style>