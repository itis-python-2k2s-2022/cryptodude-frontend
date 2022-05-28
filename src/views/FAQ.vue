<template>
  <b-container>
    <WelcomeHeader>FAQ</WelcomeHeader>
    <b-card-group>
      <ul id="faq-list">
        <li v-repeat="items">
<!--          TODO-->
          <FAQCard :question=""  :answer="{{ answer }}"/>
        </li>
      </ul>
    </b-card-group>
    <FAQCard question="Question?" answer="Answer!"/>
  </b-container>
</template>

<script>
import WelcomeHeader from "@/components/WelcomeHeader.vue";
import FAQCard from "@/components/FAQCard.vue";
export default {
  name: "FAQ",
  components: { WelcomeHeader, FAQCard }
}
</script>

<style scoped>

</style>