<template>
  <q-page padding>

    <q-breadcrumbs>
      <q-breadcrumbs-el label="Home" to="/" />
      <q-breadcrumbs-el label="Books" />
    </q-breadcrumbs>
    
    <q-btn label="Add book" to="/books/add" color="primary" />

  </q-page>
</template>

<script>
export default {
  name: 'books',
  async created() {
    const response = await this.$axios.get('/api/books')
    console.log("The data", response.data)
  }
}
</script>