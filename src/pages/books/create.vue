<template>
  <q-page padding>
    
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Home" to="/" />
      <q-breadcrumbs-el label="Books" to="/books" />
      <q-breadcrumbs-el label="Add book" />
    </q-breadcrumbs>

    <div class="row">
      <q-card class="col-12 col-sm-8 offset-sm-2 col-md-8 offset-md-2 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4 q-mt-md">
        <q-card-section>
          <h2 class="text-h6 text-primary">Add Book</h2>
        </q-card-section>
        <q-card-section>

          <q-inner-loading :showing="loadingForm">
            <q-spinner-gears size="50px" color="primary" />
          </q-inner-loading>
          <q-form class="q-gutter-md" @submit.prevent="submitForm" @keyup.enter="submitForm"> 

            <div class="row">
              <q-input outlined label="ISBN" 
                       @blur="fetchISBN" 
                       v-model="bookData.isbn"
                       :error="hasIsbnError"
                       :error-message="isbnError"
                       class="col-6">
                <template v-slot:after>
                  <q-btn round dense flat icon="refresh" @click="fetchISBN" />
                </template>
              </q-input>
            </div>  

            <q-input outlined label="Title" 
                     v-model="bookData.title" 
                     @blur="$v.bookData.title.$touch"
                     :error="$v.bookData.title.$error"
                     :error-message="titleError"/>

              <div class="row">
                <div class="col-6 q-gutter-md">
                  <q-input outlined label="Author" v-model="bookData.author" />
                  <q-input outlined label="Genre" v-model="bookData.genre" />
                  <q-input outlined label="Language" v-model="bookData.language"/>
                </div>
                <div class="col-5 offset-1">
                   <q-img :src="bookData.thumbnail" style="max-height: 200px; max-width: 150px" />
                </div>
              </div>
                        
            <div class="row">
              <q-input outlined label="Publisher" v-model="bookData.publisher" class="col-6 q-gutter-md"/>
              <q-input outlined label="Published date" v-model="bookData.publishedDate" class="col-4 offset-1" />
            </div>
            <q-input outlined label="Description" v-model="bookData.description" type="textarea" rows="4" />
          </q-form>
        </q-card-section>

        <q-card-actions>
          <q-btn flat color="secondary" to="/books">Back</q-btn>
          <q-space></q-space>
          <q-btn flat color="secondary" @click="resetForm">Reset</q-btn>
          <q-btn flat color="primary" @click="submitForm">Add</q-btn>
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
      bookData: {
        isbn: '',
        title: '',
        author: '',
        publisher: '',
        publishedDate: '',
        genre: '',
        language: '',
        thumbnail: '',
        description: ''
      },
      isbnError: null,
      loadingForm: false
    }
  },
  validations: {
    bookData: {
      title: {
        required
      }
    }
  },
  computed: {
    hasIsbnError() {
      return !!this.isbnError
    },
    titleError() {
      if(!this.$v.bookData.title.required) return "Field is required"
      return ''
    }
  },
  methods: {
    ...mapActions('isbn', ['fetchBook']),
    ...mapActions('books', ['createBook']),
    async submitForm() {
      this.$v.$touch()
      if(!this.$v.$error) {
        try {
          await this.createBook(this.bookData)
          this.$router.push('/books')
        } catch(err) {
          console.log(err)
        }
      }
    },
    async fetchISBN() {
      if(this.bookData.isbn.length > 0) {
        try {
          this.loadingForm = true
          this.clearForm()
          const result = await this.fetchBook(this.bookData.isbn)
          this.setBookData(result)
          this.loadingForm = false
        } catch(err) {
          this.loadingForm = false
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
      this.bookData.isbn = ''
      this.clearForm()
    },
    clearForm() {
      this.$v.$reset()
      this.bookData.title = ''
      this.bookData.author = ''
      this.bookData.publisher = ''
      this.bookData.publishedDate = ''
      this.bookData.genre = ''
      this.bookData.language = ''
      this.bookData.thumbnail = ''
      this.bookData.description = ''
      this.isbnError = null
    },
    setBookData(bookData) {
      this.bookData.title = bookData.title
      this.bookData.author = bookData.author.name
      this.bookData.publisher = bookData.publisher.name
      this.bookData.publishedDate = bookData.publishedDate
      this.bookData.genre = bookData.genre.name
      this.bookData.language = bookData.language
      this.bookData.description = bookData.description
      this.bookData.thumbnail = bookData.thumbnail
    }
  }
}
</script>
