<template>
  <MainNavbar/>

  <b-container>
    <p/>
    <BRow>
      <ProfileMainInfoEdit :user="currentUser"/>
    </BRow>
    <p/>
    <ProfilePasswordEdit/>
  </b-container>
</template>

<script>
import ProfileMainInfoEdit from "@/components/ProfileMainInfoEdit.vue";
import ProfilePasswordEdit from "@/components/ProfilePasswordEdit.vue";
import MainNavbar from "@/components/MainNavbar.vue";
import {mapGetters, mapState} from "pinia/dist/pinia";
import {useAuthStore} from "../stores/auth";

export default {
  name: "ProfileEdit",
  components: {ProfilePasswordEdit, ProfileMainInfoEdit, MainNavbar },
  computed: {
    ...mapGetters(useAuthStore, ["currentUser"]),
  },

}
</script>

<style scoped>

</style>