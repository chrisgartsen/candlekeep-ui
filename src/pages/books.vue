<template>
  <q-page padding>Books</q-page>
</template>

<script>
export default {
  name: 'books',
  async created() {
    const response = await this.$axios.get('http://localhost:3000/api/books')
    console.log("The data", response.data)
  }
}
</script>