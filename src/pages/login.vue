<template>
  <q-page>

    <div class="row">
      <q-card class="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-4 offset-lg-4 q-mt-xl">
        <q-card-section>
          <h2 class="text-h6 text-primary">Login</h2>
        </q-card-section>
        <q-card-section>
          <q-form class="q-gutter-md" @submit.prevent="submitForm" > 
            <q-input outlined label="Email" v-model="email" />
            <q-input type="password" outlined label="Password" v-model="password" />
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

export default {
  name: 'layout',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions('auth', ['login']),
    submitForm() {
      this.login({ email: this.email, password: this.password })
    }
  }
}
</script>