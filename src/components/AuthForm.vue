<template>
  <div class="font-monospace">
    <b-alert v-model="error_occured" variant="danger" dismissible>
      {{ error_message }}
    </b-alert>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
          id="input-group-1"
      >
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
            value=true
            unchecked-value=false
            size="lg"
        >
          remember me
        </b-form-checkbox>
      </b-form-checkbox-group>

      <b-link :to="{ name: 'registration' }" class="color-custom-yellow" size="lg">Haven't got an account yet?..</b-link>
      <b-button-group size="lg" class="float-lg-end" pill>
        <b-button type="reset" variant="danger" class="btn-reset" pill>Reset</b-button>
        &nbsp;
        <b-button type="submit" variant="primary" class="btn-custom-blue" pill>Sign in</b-button>
      </b-button-group>
    </b-form>
  </div>
</template>

<script>
import request from "../services/api";
import {setToken} from "../services/auth";
export default {
  name: "AuthForm",
  components: {},
  data() {
    return {
      form: {
        email: '',
        password: '',
        remember: false
      },
      error_occured: false,
      error_message: '',
      show: true
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      // TODO doesnt work because of CORS
      let response = request.post("/auth/token",
          {payload: [this.form.email, this.form.password]});
      let token = response.data.json.get("access_token")
      setToken(token)
      if (token) {
        this.$router.push({ name: "index" })
      } else {
        this.error_occured = true;
        this.error_message = "Email or password or both are incorrect";
      }
    },
    onReset(event) {
      event.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.password = ''
      this.form.remember = false
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}


</script>

<style scoped>
.btn-reset {
  color: #5BA37B;
  background-color: #FEFFA1;
  border-color: #f0f1a4;
}
</style>