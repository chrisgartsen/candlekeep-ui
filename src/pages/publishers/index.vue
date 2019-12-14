<template>
  <q-page padding>
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Home" to="/" />
      <q-breadcrumbs-el label="Publishers" />
    </q-breadcrumbs>

    <div class="q-mt-xl q-mb-xl row">
      <publishers-list
        class="col-4 offset-4"
        :items="publishers"
        title="Publishers"
        @deleteItems="deletePublishers"
        @showDialogForEdit="showDialogForEdit"
      />
    </div>

    <div class="row">
      <div class="col offset-4">
        <q-btn
          label="Add publisher"
          color="primary"
          @click="showDialogForCreate"
        />
      </div>
    </div>

    <q-dialog v-model="dialog">
      <publisher-form
        :formTitle="formTitle"
        :buttonCaption="submitButton"
        :fieldValue="name"
        @submitForm="submitForm"
      />
    </q-dialog>

  </q-page>
</template>

<script>
import publishersList from 'components/shared/simple-list'
import publisherForm  from 'components/shared/simple-form'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: "publishers",
  components: {
    publishersList,
    publisherForm
  },
  data() {
    return {
      dialog: false,
      id: null,
      name: ''
    }
  },
  methods: {
    ...mapActions('publishers', ['fetchAll', 'fetchPublisher','submit', 'deleteMultiple']),
    showDialogForCreate() {
      this.dialog = true
    },
    async showDialogForEdit(id) {
      const publisher = await this.fetchPublisher(id)
      if(publisher) {
        this.id = publisher._id
        this.name = publisher.name
        this.dialog = true
      }
    },
    submitForm(fieldValue) {
      this.submit({ id: this.id, name: fieldValue })
      this.dialog = false
    },
    async deletePublishers(ids) {
      try {
        await this.deleteMultiple(ids)
      } catch (error) {
        console.log(error)
      }
    },
    resetForm() {
      this.id = null,
      this.name = ''
    }
  },
  computed: {
    ...mapGetters('publishers', ['publishers']),
    formTitle() {
      return this.id ? "Edit author" : "Add author"
    },
    submitButton() {
      return this.id ? "Update" : "Create"
    }
  },
  created() {
    this.fetchAll()
  },
  watch: {
    dialog(newVal) {
      if(!newVal) {
        this.resetForm()
      }
    }
  }
};
</script>
