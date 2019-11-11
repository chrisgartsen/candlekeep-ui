<template>
  <q-page padding>

    <q-breadcrumbs>
      <q-breadcrumbs-el label="Home" to="/" />
      <q-breadcrumbs-el label="Books" />
    </q-breadcrumbs>
    
    <div class="q-mt-xl q-mb-xl">
      <q-table title="Books" :data="books" :columns="columns" row-key="id" />
    </div>


    <q-btn label="Add book" to="/books/add" color="primary" />

  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'books',
  data() {
    return {
      columns: [
        { name: 'isbn', label: 'ISBN', field: 'isbn', align: 'left' },
        { name: 'title', label: 'Title',  field: 'title', align: 'left' }
      ],
    }
  },
  async created() {
    const response = await this.$axios.get('/api/books')
  },
  computed: {
    ...mapGetters('books', ['books'])
  }
}
</script>