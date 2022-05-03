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

      <b-form-group id="input-group-2">
        <b-form-input
            id="input-2"
            v-model="form.nickname"
            placeholder="Enter your nickname"
            :state="nicknameState"
            aria-describedby="input-live-feedback"
            size="lg"
            trim
            required
        ></b-form-input>

        <b-form-invalid-feedback class="color-custom-yellow" id="input-live-feedback">
          Nickname is too short(or long) or contains unacceptable characters!
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="input-group-3">
        <b-form-input
            id="input-3"
            v-model="form.password"
            type="password"
            placeholdder="Enter your password"
            :state="passwordState"
            aria-describedby="input-live-feedback"
            size="lg"
            trim
            required
        ></b-form-input>

        <!-- This will only be shown if the preceding input has an invalid state -->
        <b-form-invalid-feedback class="color-custom-yellow" id="input-live-feedback">
          Invalid password. Password should contain only latin letters, digits or special symbols.<br>
          Password must contain at least one uppercase, one lowercase and one digit and be at least 8 characters long
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="input-group-4">
        <b-form-input
            v-model="form.password_repeat"
            id="input-4"
            type="password"
            placeholdder="Repeat your password"
            :state="passwordRepeatState"
            aria-describedby="input-live-feedback"
            size="lg"
            trim
            required
        >
        </b-form-input>
        <b-form-invalid-feedback class="color-custom-yellow" id="input-live-feedback">
          Passwords didn't match!
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-checkbox-group id="checkbox-group-1">
        <b-form-checkbox
            id="checkbox-1"
            v-model="form.accept_terms"
            name="accept_terms"
            value=true
            unchecked-value=false
            size="lg"
            required
        >
          I accept the terms and use
        </b-form-checkbox>
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

      <b-link :to="{ name: 'auth' }" class="color-custom-yellow" size="lg">Already 've got an account?..</b-link>
      <b-button-group size="lg" class="float-lg-end" pill>
        <b-button type="reset" variant="danger" class="btn-reset" pill>Reset</b-button>
        &nbsp;
        <b-button type="submit" variant="primary" class="btn-custom-blue" pill>Sign up</b-button>
      </b-button-group>
    </b-form>
  </div>
</template>

<script>
export default {
  name: "RegistrationForm",
  components: {},
  data() {
    return {
      form: {
        email: '',
        nickname: '',
        password: '',
        password_repeat: '',
        remember: false,
        accept_terms: false
      },
      error_occured: false,
      error_message: '',
      show: true
    }
  },
  computed: {
    passwordState() {
      let valid = true;
      let password = this.form.password;
      if (password === '') return undefined;
      if (password.length < 8) {
        valid = false;
      } else if (!/\d/.test(password)) {
        valid = false;
      } else if (!/[a-z]/.test(password)) {
        valid = false;
      } else if (!/[A-Z]/.test(password)) {
        valid = false;
      } else if (/[^0-9a-zA-Z~`!@#$%^&*()_\-+={\[}\]|\\:;"'<,>.?/]/.test(password)) {
        valid = false;
      }

      return valid
    },
    passwordRepeatState() {
      if (this.form.password_repeat === '') return undefined;
      return this.form.password_repeat === this.form.password
    },
    nicknameState() {
      let nickname = this.form.nickname;
      if (nickname === '') return undefined;
      let valid = true;
      if (nickname.length < 1 || nickname.length > 30) {
        valid = false;
      } else if (/[^a-zA-Z0-9_]/.test(nickname)) {
        valid = false;
      }
      return valid
    },
    formIsValid() {
      return this.passwordState && this.passwordRepeatState && this.nicknameState;
    }
  },
  methods: {
    // TODO change to queries to backend
    onSubmit(event) {
      event.preventDefault()
      if (this.formIsValid) {
        this.$router.push({ name: "auth" }) // TODO поменять путь редиректа на главную страницу сайта
      } else {
        this.error_occured = true;
        this.error_message = "Invalid data inside the form. Please correct your form and try again.";
      }
    },
    onReset(event) {
      event.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.nickname = ''
      this.form.password = ''
      this.form.password_repeat = ''
      this.form.remember = false
      this.form.accept_terms = false
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