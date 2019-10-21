<template>
    <q-drawer v-model="showDrawer" bordered content-class="bg-grey-2">
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
import { mapGetters } from 'vuex'

export default {
  name: 'page-drawer',

  computed: {
    ...mapGetters('layout',['showDrawer']),
  }

}
</script>