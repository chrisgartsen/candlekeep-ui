<template>
  <q-page padding>
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Home" to="/" />
      <q-breadcrumbs-el label="Authors" />
    </q-breadcrumbs>
    
    <br/><br/><br/><br/>
    Authors: {{ authors }}

    <br/><br/><br/><br/><br/><br/>
    
    <q-btn label="Add author" color="primary" />


  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'authors',
  computed: {
    ...mapGetters('authors', ['authors'])
  }
}
</script>