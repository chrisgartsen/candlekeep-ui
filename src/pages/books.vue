<template>
  <q-page padding>

    <q-breadcrumbs>
      <q-breadcrumbs-el label="Home" to="/" />
      <q-breadcrumbs-el label="Books" />
    </q-breadcrumbs>
    
    <div>
      {{ this.books }}
    </div>


    <q-btn label="Add book" to="/books/add" color="primary" />

  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'books',
  async created() {
    const response = await this.$axios.get('/api/books')
    console.log("The data", response.data)
  },
  computed: {
    ...mapGetters('books', ['books'])
  }
}
</script>