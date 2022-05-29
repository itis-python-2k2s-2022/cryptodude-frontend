<template>
  <div class="font-monospace">
    <b-alert v-model="error_occured" variant="danger" dismissible>
      {{ error_message }}
    </b-alert>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group id="input-group-1">
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          placeholder="Enter your email"
          size="lg"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3">
        <b-form-input
          id="input-3"
          v-model="form.password"
          type="password"
          placeholder="Enter your password"
          aria-describedby="input-live-feedback"
          size="lg"
          trim
          required
        ></b-form-input>
      </b-form-group>

      <b-form-checkbox-group id="checkbox-group-1">
        <b-form-checkbox
          id="checkbox-2"
          v-model="form.remember"
          name="remember_me"
          value="true"
          unchecked-value="false"
          size="lg"
        >
          remember me
        </b-form-checkbox>
      </b-form-checkbox-group>

      <b-link
        :to="{ name: 'registration' }"
        class="color-custom-yellow"
        size="lg"
        >Haven't got an account yet?..</b-link
      >
      <b-button-group size="lg" class="float-lg-end" pill>
        <b-button type="reset" variant="danger" class="btn-reset" pill
          >Reset</b-button
        >
        &nbsp;
        <b-button type="submit" variant="primary" class="btn-custom-blue" pill
          >Sign in</b-button
        >
      </b-button-group>
    </b-form>
  </div>
</template>

<script>
import request from "../services/api";
import { setToken } from "../services/auth";
export default {
  name: "AuthForm",
  components: {},
  data() {
    return {
      form: {
        email: "",
        password: "",
        remember: false,
      },
      error_occured: false,
      error_message: "",
      show: true,
    };
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault();
      let response;
      const params = new URLSearchParams();

      params.append("username", this.form.email);
      params.append("password", this.form.password);
      params.append("grant_type", "password");

      try {
        response = await request.post("/auth/token", params);
        if (response.status === 200) {
          console.log(response);
          console.log(response.data.access_token);

          let access_token = response.data.access_token || null;
          console.log(access_token);
          setToken(access_token);

          if (access_token) {
            location.reload();
            await this.$router.push({ name: "index" });
          } else {
            this.error_occured = true;
            this.error_message = "Unknown error. Try again.";
          }
        } else {
          this.error_occured = true;
          this.error_message = "Email or password or both are incorrect";
        }
      } catch (e) {
        if (e.response.status === 401) {
          this.error_occured = true;
          this.error_message = "Email or password or both are incorrect";
        } else {
          this.error_occured = true;
          this.error_message = "Unknown error. Try again.";
        }
      }
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.password = "";
      this.form.remember = false;
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>

<style scoped>
.btn-reset {
  color: #5ba37b;
  background-color: #feffa1;
  border-color: #f0f1a4;
}
</style>
