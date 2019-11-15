<template>
  <q-page padding>
    
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Home" to="/" />
      <q-breadcrumbs-el label="Books" to="/books" />
      <q-breadcrumbs-el label="Add book" />
    </q-breadcrumbs>

    <div class="row">
      <book-form />
    </div>
  </q-page>
</template>

<script>
import bookForm from 'components/books/book-form'

export default {
  name: 'create-book',
  components: {
    bookForm
  }
}
</script>
