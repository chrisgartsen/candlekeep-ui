<template>
  <q-page padding>
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Home" to="/" />
      <q-breadcrumbs-el label="Genres" />
    </q-breadcrumbs>

    <div class="q-mt-xl q-mb-xl row">
      <genres-list
        class="col-4 offset-4"
        :items="genres"
        title="Genres"
        @deleteItems="deleteMultiple"
        @showDialogForEdit="showDialogForEdit"
      />
    </div>

    <div class="row">
      <div class="col offset-4">
        <q-btn label="Add genre" color="primary" @click="showDialogForCreate" />
      </div>
    </div>

    <q-dialog v-model="dialog">
      <simple-form
        :formTitle="formTitle"
        :buttonCaption="submitButton"
        :fieldValue="name"
        @submitForm="submitForm"   
      />
    </q-dialog>

  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import simpleForm from 'components/shared/simple-form'
import genresList from 'components/shared/simple-list'

export default {
  name: 'genres',

  components: {
    simpleForm,
    genresList
  },

  data() {
    return {
      dialog: false,
      name: '',
      id: null
    }
  },

  methods: {
    ...mapActions('genres', ['fetchAll', 'fetchGenre', 'deleteGenres', 'submit']),
    showDialogForCreate() {
      this.dialog = true
    },
    async showDialogForEdit(id) {
      const genre = await this.fetchGenre(id)
      if(genre) {
        this.id = genre._id
        this.name = genre.name
        this.dialog = true
      }
    },
    submitForm(fieldValue) {
      this.submit({ id: this.id, name: fieldValue })
      this.dialog = false
    },
    async deleteMultiple(ids) {
      try {
        await this.deleteGenres(ids)
      } catch(err) {
        console.log(err)
      }
    },
    resetForm() {
      this.id = null
      this.name = ''
    }
  },
  computed: {
    ...mapGetters('genres', ['genres']),
    formTitle() {
      return this.id ? 'Edit genre' : 'Add genre'
    },
    submitButton() {
      return this.id ? 'Update' : 'Create'
    }
  },
  watch: {
    dialog(newVal) {
      if (!newVal) {
        this.resetForm()
      }
    }
  },
  created(){
    this.fetchAll()
  }
}
</script>