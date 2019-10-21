<template>
  <q-layout view="hHh lpR fFf">
    <page-header />
    <page-drawer />
    <q-page-container>
      <router-view />
    </q-page-container>
    <page-footer />
  </q-layout>
</template>

<script>
import pageHeader from './page-header'
import pageDrawer from './page-drawer.vue'
import pageFooter from './page-footer'

export default {
  name: 'layout',
  components: {
    pageHeader,
    pageDrawer,
    pageFooter
  }
}
</script>
