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
        <q-btn flat dense icon="person" to="/login" />
      </q-toolbar>
    </q-header>

</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'page-header',
  methods: {
    ...mapActions('layout', ['toggleDrawer'])
  }
}
</script>