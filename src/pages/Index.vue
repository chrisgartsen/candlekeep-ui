<template>
  <q-page class="flex flex-center">

  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PageIndex',
  computed: {
    ...mapGetters('auth', ['token'])
  }
}
</script>
