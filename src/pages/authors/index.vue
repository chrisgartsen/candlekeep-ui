<template>
  <q-page padding>
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Home" to="/" />
      <q-breadcrumbs-el label="Authors" />
    </q-breadcrumbs>

    <div class="q-mt-xl q-mb-xl row">
      <authors-list 
        :authors="authors" 
        @requestDeleteOne="requestDeleteOne"
        @requestDeleteMultiple="requestDeleteMultiple" 
        @showDialogForEdit="showDialogForEdit" />
    </div>
    <div class="row">
      <div class="col offset-4">
        <q-btn label="Add author" color="primary" @click="showDialogForCreate" />
      </div>
    </div>

    <q-dialog v-model="dialog">
      <q-card style="width:400px; max-width: 60vw;">
        <q-card-section class="row items-center">
          <div class="text-h6 text-primary">Add author</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <q-form class="q-gutter-md" @submit.prevent="submitForm" @keyup.enter="submitForm">
            <div class="row">
              <q-input
                class="col"
                outlined
                label="Name"
                v-model="name"
                @blur="$v.name.$touch"
                :error="$v.name.$error"
                :error-message="nameError"
              />
            </div>
          </q-form>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat color="primary" @click="submitForm">Submit</q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { required } from "vuelidate/lib/validators";

import authorsList from 'components/authors/authors-list'

export default {
  name: "authors",
  components: {
    authorsList
  },
  data() {
    return {
      dialog: false,
      selected: [],
      id: null,
      name: ""
    }
  },
  validations: {
    name: {
      required
    }
  },
  computed: {
    ...mapGetters("authors", ["authors"]),
    nameError() {
      if(!this.$v.name.required) return "Field is required"
    }
  },
  methods: {
    ...mapActions('authors', ['submit', 'fetchAll', 'fetchAuthor', 'deleteMultiple']),
    showDialogForCreate() {
      this.dialog = true;
    },
    async showDialogForEdit(id) {
      const author = await this.fetchAuthor(id)
      if(author) {
        this.id = author._id
        this.name = author.name
        this.dialog = true
      }
    },
    submitForm() {
      this.$v.$touch()
      if(!this.$v.$error) {
        this.submit({ id: this.id, name: this.name })
        this.dialog = false;
      }
    },
    resetForm() {
      this.id = null
      this.name = ''
      this.$v.$reset()
    },
    requestDelete(ids, message) {
      this.$q.dialog({
        title: 'Confirm delete',
        message: message,
        cancel: true,
        ok: {
          color: 'negative',
          flat: true
        }
      }).onOk(async () => {
        try { 
          await this.deleteMultiple(ids)
          ids = []
        } catch(err) {
          console.log(err)
        }
      })
    },
    requestDeleteOne(id) {
      this.requestDelete([id], 'Are you sure you want to delete this author?')
    },
    requestDeleteMultiple(ids) {
      this.requestDelete(ids, 'Are you sure you want to delete all of these authors?')
    },
  },
  created() {
    this.fetchAll()
  },
  watch: {
    dialog(newVal) {
      if (!newVal) {
        this.resetForm()
      }
    }
  }
};
</script>
