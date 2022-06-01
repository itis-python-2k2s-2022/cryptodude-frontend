<template>
  <b-card
    :img-src="userImageSrc"
    img-alt="Card image"
    img-left
    img-height="300"
    img-width="300"
    class="bg-dark text-light font-monospace"
  >
    <b-alert v-model="error_occured" variant="danger" dismissible>
      {{ error_message }}
    </b-alert>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        label="New nickname:"
        label-size="lg"
        label-for="input-name"
      >
        <b-form-input
          id="input-name"
          :state="nicknameState"
          type="text"
          v-model="form.name"
        />
        <b-form-invalid-feedback
          class="color-custom-yellow"
          id="input-live-feedback"
        >
          Nickname is invalid!
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group
        label-for="input-avatar"
        label="New avatar:"
        label-size="lg"
      >
        <input
          type="file"
          class="form-control"
          accept="image/*"
          id="input-avatar"
          @change="onFileSelected"
        />
      </b-form-group>
      <b-button-group size="lg" class="float-lg-end" pill>
        <b-button type="submit" variant="info">Submit</b-button>
        &nbsp;
        <b-button type="reset" variant="warning">Reset</b-button>
      </b-button-group>
    </b-form>
  </b-card>
</template>

<script>
import { getURLForImage } from "../services/utils";
import { BFormInput } from "bootstrap-vue-3";
import request from "../services/api";
export default {
  name: "ProfileMainInfoEdit",
  components: { BFormInput },

  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      userImageSrc: getURLForImage(this.user.photo),
      form: {
        name: "",
        photo: null,
      },
      error_occured: false,
      error_message: "",
      show: true,
    };
  },
  computed: {
    nicknameState() {
      let nickname = this.form.name;
      if (nickname === "") return undefined;
      let valid = true;
      if (nickname.length < 1 || nickname.length > 30) {
        valid = false;
      } else if (/[^a-zA-Z0-9_]/.test(nickname)) {
        valid = false;
      }
      return valid;
    },
  },
  methods: {
    onFileSelected(event) {
      this.form.photo = event.target.files[0];
    },
    async onSubmit(event) {
      event.preventDefault();
      if (this.nicknameState) {
        console.log(this.form.photo);
        const formData = new FormData();
        formData.append("photo", this.form.photo, this.form.photo.name);
        try {
          const response = await request.post(
            `/users/me/edit?name=${this.form.name}`,
            formData
          );
          console.log(response);
          if (response.status === 200) {
            window.alert("Profile successfully changed!");
            await this.$router.push({ name: "profile" });
          }
        } catch (e) {
          console.log(e);
          this.error_occured = true;
          this.error_message =
            "Something went wrong. Refresh page and try again.";
        }
      } else {
        this.error_occured = true;
        this.error_message =
          "Invalid nickname. No spaces, only letters and digits.";
      }
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.name = "";
      this.form.photo = null;
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>

<style scoped></style>
