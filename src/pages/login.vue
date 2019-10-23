<template>
  <q-page>

    <div class="row">
      <q-card class="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-4 offset-lg-4 q-mt-xl">
        <q-card-section>
          <h2 v-if="!error" class="text-h6 text-primary">Login</h2>
          <h2 v-if="error" class="text-h6 text-negative">Login Failed</h2>
        </q-card-section>
        <q-card-section>
          <q-banner v-if="error" rounded class="text-white bg-negative">{{ error }}</q-banner>
        </q-card-section>
        <q-card-section>
          <q-form class="q-gutter-md" @submit.prevent="submitForm" > 
            <q-input outlined label="Email" 
                     v-model="email" 
                     @blur="$v.email.$touch" 
                     :error="$v.email.$error" 
                     :error-message="emailError" />
            <q-input outlined label="Password" 
                     type="password"
                     v-model="password" 
                     @blur="$v.password.$touch"
                     :error="$v.password.$error"
                     :error-message="passwordError" />
          </q-form>
        </q-card-section> 
        <q-card-actions align="right">
          <q-btn flat color="secondary">Forgot password?</q-btn>
          <q-btn flat color="primary" @click="submitForm">Submit</q-btn>
        </q-card-actions>
      </q-card>
    </div>

  </q-page>
</template>

<script>
import { mapActions } from 'vuex'
import { required, minLength, email } from 'vuelidate/lib/validators'

export default {
  name: 'layout',
  data() {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    }
  },
  computed: {
    emailError() {
      if(!this.$v.email.required) return "Field is required"
      if(!this.$v.email.email) return "Must be a valid email"
      return ''
    },
    passwordError() {
      if(!this.$v.password.required) return "Field is required"
      if(!this.$v.password.minLength) return "Minimum length is 6 characters"
      return ''
    }
  },
  methods: {
    ...mapActions('auth', ['login']),
    async submitForm() {
      this.$v.$touch()
      if(!this.$v.$error) {
        try {
          await this.login({ email: this.email, password: this.password })
          this.$router.push('/')
        } catch(err) {
          this.$v.$reset()
          this.error = err.message
          this.password = ''
        }
      }
    }
  }
}
</script>