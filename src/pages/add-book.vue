<template>
  <q-page padding>
    
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Home" to="/" />
      <q-breadcrumbs-el label="Books" to="/books" />
      <q-breadcrumbs-el label="Add book" />
    </q-breadcrumbs>

    <div class="row">
      <q-card class="col-12 col-sm-8 offset-sm-2 col-md-8 offset-md-2 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4 q-mt-xl">
        <q-card-section>
          <h2 class="text-h6 text-primary">Add Book</h2>
        </q-card-section>
        <q-card-section>
          <q-form class="q-gutter-md" @submit.prevent="submitForm" @keyup.enter="submitForm"> 

            <div class="row">
              <q-input outlined label="ISBN" 
                       @blur="fetchISBN" 
                       v-model="ISBN"
                       :error="hasIsbnError"
                       :error-message="isbnError"
                       class="col-6">
                <template v-slot:after>
                  <q-btn round dense flat icon="refresh" @click="fetchISBN" />
                </template>
              </q-input>
            </div>  

            <q-input outlined label="Title" 
                     v-model="title" 
                     @blur="$v.title.$touch"
                     :error="$v.title.$error"
                     :error-message="titleError"/>

              <div class="row">
                <div class="col-6 q-gutter-md">
                  <q-input outlined label="Author" v-model="author" />
                  <q-input outlined label="Genre" v-model="genre" />
                  <q-input outlined label="Language" v-model="language"/>
                </div>
                <div class="col-5 offset-1">
                   <q-img :src="thumbnail" style="max-height: 200px; max-width: 150px" />
                </div>
              </div>
                        
            <div class="row">
              <q-input outlined label="Publisher" v-model="publisher" class="col-6 q-gutter-md"/>
              <q-input outlined label="Published date" v-model="publishedDate" class="col-4 offset-1" />
            </div>
            <q-input outlined label="Description" v-model="description" type="textarea" />
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
      publisher: '',
      publishedDate: '',
      genre: '',
      language: '',
      thumbnail: '',
      description: ''
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
      return ''
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
          this.author = result.author.name
          this.publisher = result.publisher.name
          this.publishedDate = result.publishedDate
          this.genre = result.genre.name
          this.language = result.language
          this.description = result.description
          this.thumbnail = result.thumbnail
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
      this.publishedDate = ''
      this.genre = ''
      this.language = ''
      this.thumbnail = ''
      this.description = ''
      this.isbnError = null
    }
  }
}
</script>
