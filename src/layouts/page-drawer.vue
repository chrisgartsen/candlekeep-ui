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
      </q-list>
    </q-drawer>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'page-drawer',

  computed: {
    ...mapGetters('layout',['showDrawer']),
    show: {
      get() {
        return this.showDrawer
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