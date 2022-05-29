<template>
  <MainNavbar/>
  <b-container>
    <WelcomeHeader>FAQ</WelcomeHeader>
    <p/>
      <div v-if="isLoading"> Loading ... </div>
      <div v-else-if="error"> {{ error.message }} <button @click="loadFAQ">try again</button> </div>
      <div v-else>
        <FAQCard
          v-for="faquestion in fAQuestions"
          :question="faquestion.question"
          :answer="faquestion.answer"/>
      </div>
  </b-container>
</template>

<script>
import {ref} from "vue";
import WelcomeHeader from "@/components/WelcomeHeader.vue";
import FAQCard from "@/components/FAQCard.vue";
import MainNavbar from "@/components/MainNavbar.vue";
import {getFAQuestions} from "../services/faq";

export default {
  name: "FAQ",
  components: { WelcomeHeader, FAQCard, MainNavbar },

  data() {
    const isLoading = ref(true);
    const error = ref(null);
    const fAQuestions = ref(null);
    const loadFAQ = async () => {
      isLoading.value = true;
      try {
        fAQuestions.value = await getFAQuestions();
        isLoading.value = false;
      } catch (e) {
        error.value = e;
      }
    };

    return { isLoading, error, fAQuestions, loadFAQ };
  },
  async mounted() {
    await this.loadFAQ();
  }

}
</script>

<style scoped>

</style>