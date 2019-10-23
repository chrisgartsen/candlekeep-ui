<template>
<q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="toggleDrawer"
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title to="/" clickable>
          Quasar App
        </q-toolbar-title>

        <q-space />
        <q-btn v-if="!isLoggedIn" flat icon="person" to="/login" label="Login" />
        <q-btn v-if="isLoggedIn" flat icon="exit_to_app" label="Logout" @click="logout"/>
      </q-toolbar>
    </q-header>

</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'page-header',
  methods: {
    ...mapActions('layout', ['toggleDrawer']),
    ...mapActions('auth', [ 'logout'])
  },
  computed: {
    ...mapGetters('auth', ['isLoggedIn'])
  }
}
</script>