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
        <q-card-section>
          <q-form class="q-gutter-md" @submit.prevent="submitForm" @keyup.enter="submitForm"> 

            <q-input outlined label="ISBN" @blur="fetchISBN" v-model="ISBN">
              <template v-slot:after>
                <q-btn round dense flat icon="refresh" @click="fetchISBN" />
              </template>
            </q-input>

            <q-input outlined label="Title" v-model="title" />

          </q-form>
        </q-card-section>
        <q-card-actions>
          <q-btn flat color="secondary">Reset</q-btn>
          <q-space></q-space>
          <q-btn flat color="primary" @click="submitForm">Submit</q-btn>
        </q-card-actions>
      </q-card>

    </div>

  </q-page>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'add-book',
  data() {
    return {
      ISBN: '',
      title: ''
    }
  },
  methods: {
    ...mapActions('isbn', ['fetchBook']),
    submitForm() {
      console.log("Submitting")
    },
    async fetchISBN() {
      try {
        this.clearForm()
        const result = await this.fetchBook(this.ISBN)
        console.log(result)
        this.title = result.title
      } catch(err) {
        console.log(err)
      }
    },
    clearForm() {
      this.title = ''
    }
  }
}
</script>