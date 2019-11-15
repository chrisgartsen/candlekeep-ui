<template>
  <q-page padding>
    
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Home" to="/" />
      <q-breadcrumbs-el label="Books" to="/books" />
      <q-breadcrumbs-el label="Edit book" />
    </q-breadcrumbs>

    <div class="row">
      <book-form :id="id"/>
    </div>
  </q-page>
</template>

<script>
import bookForm from 'components/books/book-form'

export default {
  name: 'edit-book',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  components: {
    bookForm
  }
}
</script>