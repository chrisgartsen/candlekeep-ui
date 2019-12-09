<template>
    <q-drawer v-model="show" bordered content-class="bg-grey-2">
      <q-list>
        <q-item-label header>Actions</q-item-label>
        <q-item clickable to="/books">
          <q-item-section avatar>
            <q-icon name="menu_book" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Books</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/authors">
          <q-item-section avatar>
            <q-icon name="people" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Authors</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/publishers">
          <q-item-section avatar>
            <q-icon name="account_balance" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Publishers</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'page-drawer',

  computed: {
    ...mapGetters('layout',['showDrawer']),
    ...mapGetters('auth', ['isLoggedIn']),
    show: {
      get() {
        return this.showDrawer && this.isLoggedIn
      },
      set(newVal) {
        this.toggleDrawer()
      }
    }
  },
  methods: {
    ...mapActions('layout', ['toggleDrawer'])
  }

}
</script>