<template>
    <q-drawer v-model="show" bordered content-class="bg-grey-2">
      <q-list>
        <q-item-label header>Actions</q-item-label>
        <q-item v-for="item in menuItems" :key="item.label" clickable :to="item.to"> 
          <q-item-section avatar><q-icon :name="item.icon" /></q-item-section>
          <q-item-section><q-item-label>{{ item.label }}</q-item-label></q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'page-drawer',
  data() {
    return {
      menuItems: [
        { label: 'Books', icon: "menu_book", to: '/books' },
        { label: 'Authors', icon: "people", to: '/authors' },
        { label: 'Publishers', icon: "account_balance", to: '/publishers' },
        { label: 'Genres', icon: "landscape", to: '/genres' }        
      ]
    }
  },
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