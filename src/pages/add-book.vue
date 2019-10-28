<template>
  <q-page padding>
    
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Home" to="/" />
      <q-breadcrumbs-el label="Books" to="/books" />
      <q-breadcrumbs-el label="Add book" />
    </q-breadcrumbs>

    <div class="row">
      <q-card class="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-4 offset-lg-4 q-mt-xl">
        <q-card-section>
          <h2 class="text-h6 text-primary">Add Book</h2>
        </q-card-section>
        <q-card-actions>
          <q-btn flat color="secondary">Reset</q-btn>
        </q-card-actions>
      </q-card>

    </div>

  </q-page>
</template>

<script>
export default {
  name: 'add-book',
}
</script>