<template>
  <b-card class="bg-dark text-light font-monospace">
    <b-card-header>Change Password</b-card-header>
    <b-card-body>
      <b-alert v-model="error_occured" variant="danger" dismissible>
        {{ error_message }}
      </b-alert>
      <b-form @submit="onSubmitP" @reset="onResetP" v-if="show">
        <b-form-group
          label="Old password:"
          label-size="lg"
          label-for="input-old-password"
        >
          <b-form-input
            id="input-old-password"
            type="password"
            v-model="form.old_password"
          />
          <b-form-invalid-feedback
            class="color-custom-yellow"
            id="input-live-feedback-old"
          >
            Old Password is not correct!
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group
          label="New password:"
          label-size="lg"
          label-for="input-new-password"
        >
          <b-form-input
            id="input-new-password"
            :state="newPasswordState"
            type="password"
            v-model="form.new_password"
          />
          <b-form-invalid-feedback
            class="color-custom-yellow"
            id="input-live-feedback-new"
          >
            New Password is invalid!
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group
          label="Repeat new password:"
          label-size="lg"
          label-for="repeat-new-password"
        >
          <b-form-input
            id="repeat-new-password"
            :state="passwordRepeatState"
            type="password"
            v-model="form.repeat_password"
          />
          <b-form-invalid-feedback
            class="color-custom-yellow"
            id="input-live-feedback-rep"
          >
            Passwords didn't match!
          </b-form-invalid-feedback>
        </b-form-group>

        <b-button-group size="lg" class="float-lg-end" pill>
          <b-button type="submit" variant="info">Submit</b-button>
          &nbsp;
          <b-button type="reset" variant="warning">Reset</b-button>
        </b-button-group>
      </b-form>
    </b-card-body>
  </b-card>
</template>

<script>
import { BCardHeader } from "bootstrap-vue-3";
import request from "../services/api";
export default {
  name: "ProfilePasswordEdit",
  components: { BCardHeader },
  data() {
    return {
      form: {
        old_password: "",
        new_password: "",
        repeat_password: "",
      },
      error_occured: false,
      error_message: "",
      show: true,
    };
  },
  computed: {
    newPasswordState() {
      let valid = true;
      let password = this.form.new_password;
      if (password === "") return undefined;
      if (password.length < 8) {
        valid = false;
      } else if (!/\d/.test(password)) {
        valid = false;
      } else if (!/[a-z]/.test(password)) {
        valid = false;
      } else if (!/[A-Z]/.test(password)) {
        valid = false;
      } else if (
        /[^0-9a-zA-Z~`!@#$%^&*()_\-+={\[}\]|\\:;"'<,>.?/]/.test(password)
      ) {
        valid = false;
      }

      return valid;
    },
    passwordRepeatState() {
      if (this.form.repeat_password === "") return undefined;
      return this.form.repeat_password === this.form.new_password;
    },
    formIsValid() {
      return this.newPasswordState && this.passwordRepeatState;
    },
  },
  methods: {
    async onSubmitP(event) {
      event.preventDefault();
      if (this.formIsValid) {
        try {
          const response = await request.post(
            "/users/me/change_password",
            this.form
          );
          console.log(response);
          if (response.status === 200) {
            window.alert("Password successfully changed!");
            await this.$router.push({ name: "profile" });
          }
        } catch (e) {
          console.log(e);
          this.error_occured = true;
          this.error_message = e.response.data.detail;
        }
      } else {
        this.error_occured = true;
        this.error_message = "Invalid passwords. Try again.";
      }
    },
    onResetP(event) {
      event.preventDefault();
      // Reset our form values
      this.form.old_password = "";
      this.form.new_password = "";
      this.form.repeat_password = "";
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
