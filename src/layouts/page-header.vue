<template>
<q-header elevated>
      <q-toolbar>
        <q-btn flat dense round @click="toggleDrawer" icon="menu" aria-label="Menu" v-if="isLoggedIn" />
        <q-toolbar-title>Candlekeep</q-toolbar-title>
        <q-space />
        <q-btn v-if="!isLoggedIn" flat icon="person" to="/login" label="Login" />
        <q-btn v-if="isLoggedIn" flat icon="exit_to_app" label="Logout" @click="submitLogout"/>
      </q-toolbar>
    </q-header>

</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'page-header',
  methods: {
    ...mapActions('layout', ['toggleDrawer']),
    ...mapActions('auth', [ 'logout',]),
    submitLogout() {
      this.logout()
      this.$router.push('/login')
    }
  },
  computed: {
    ...mapGetters('auth', ['isLoggedIn'])
  }
}
</script>