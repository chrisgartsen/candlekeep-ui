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

            <q-input outlined label="ISBN" 
                    @blur="fetchISBN" 
                    v-model="ISBN"
                    :error="hasIsbnError"
                    :error-message="isbnError">
              <template v-slot:after>
                <q-btn round dense flat icon="refresh" @click="fetchISBN" />
              </template>
            </q-input>

            <q-input outlined label="Title" 
                     v-model="title" 
                     @blur="$v.title.$touch"
                     :error="$v.title.$error"
                     :error-message="titleError"/>
          </q-form>
        </q-card-section>
        <q-card-actions>
          <q-btn flat color="secondary" @click="resetForm">Reset</q-btn>
          <q-space></q-space>
          <q-btn flat color="primary" @click="submitForm">Submit</q-btn>
        </q-card-actions>
      </q-card>

    </div>

  </q-page>
</template>

<script>
import { mapActions } from 'vuex'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'add-book',
  data() {
    return {
      ISBN: '',
      isbnError: null,
      title: '',
      author: '',
      publisher: ''
    }
  },
  validations: {
    title: {
      required
    }
  },
  computed: {
    hasIsbnError() {
      return !!this.isbnError
    },
    titleError() {
      if(!this.$v.title.required) return "Field is required"
    }
  },
  methods: {
    ...mapActions('isbn', ['fetchBook']),
    submitForm() {
      this.$v.$touch()
      if(!this.$v.$error) {
        console.log("Submitting")
      }
    },
    async fetchISBN() {
      if(this.ISBN.length > 0) {
        try {
          this.clearForm()
          const result = await this.fetchBook(this.ISBN)
          this.title = result.title
        } catch(err) {
          if(err.status == 404 || err.status == 422) {
            this.isbnError = 'No book found for this ISBN' 
          } else {
            this.isbnError = 'An error occurred while fetching ISBN data'
          }
        }
      } else {
        this.isbnError = null
      }
    },
    resetForm() {
      this.ISBN = ''
      this.clearForm()
    },
    clearForm() {
      this.title = ''
      this.author = ''
      this.publisher = ''
      this.isbnError = null
    }
  }
}
</script>