<template>
  <q-page padding>
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Home" to="/" />
      <q-breadcrumbs-el label="Authors" />
    </q-breadcrumbs>

    <div class="q-mt-xl q-mb-xl row">
      <authors-list
        class="col-4 offset-4"
        :items="authors"
        title="Authors"
        @deleteItems="deleteAuthors"
        @showDialogForEdit="showDialogForEdit"
      />
    </div>

    <div class="row">
      <div class="col offset-4">
        <q-btn
          label="Add author"
          color="primary"
          @click="showDialogForCreate"
        />
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
import { mapGetters, mapActions } from "vuex";
import { required } from "vuelidate/lib/validators"

import authorsList from "components/shared/simple-list"
import simpleForm from "components/shared/simple-form"

export default {
  name: "authors",
  components: {
    authorsList,
    simpleForm
  },
  data() {
    return {
      dialog: false,
      id: null,
      name: ""
    };
  },
  computed: {
    ...mapGetters("authors", ["authors"]),
    formTitle() {
      return this.id ? "Edit author" : "Add author"
    },
    submitButton() {
      return this.id ? "Update" : "Create"
    }
  },
  methods: {
    ...mapActions("authors", [
      "submit",
      "fetchAll",
      "fetchAuthor",
      "deleteMultiple"
    ]),
    showDialogForCreate() {
      this.dialog = true
    },
    async showDialogForEdit(id) {
      const author = await this.fetchAuthor(id)
      if (author) {
        this.id = author._id
        this.name = author.name
        this.dialog = true
      }
    },
    submitForm(fieldValue) {
      this.submit({ id: this.id, name: fieldValue })
      this.dialog = false;
    },
    resetForm() {
      this.id = null
      this.name = ""
    },
    async deleteAuthors(ids) {
      try {
        await this.deleteMultiple(ids)
      } catch(err) {
        console.log(err)
      }
    }
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
