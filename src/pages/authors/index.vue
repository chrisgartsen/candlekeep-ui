<template>
  <q-page padding>
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Home" to="/" />
      <q-breadcrumbs-el label="Authors" />
    </q-breadcrumbs>

    <div class="q-mt-xl q-mb-xl row">
      <q-table class="col-4 offset-4" title="Authors" :data="authors" :columns="columns" row-key="_id" :pagination.sync="pagination">
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="name" :props="props">{{ props.row.name }} </q-td>
            <q-td key="actions" :props="props">
              <q-btn flat color="primary" icon="edit" />              
              <q-btn flat color="primary" icon="delete"/>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
    <div class="row">
      <div class="col offset-4">
        <q-btn label="Add author" color="primary" @click="showDialog" />
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
          <q-form
            class="q-gutter-md"
            @submit.prevent="submitForm"
            @keyup.enter="submitForm"
          >
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

export default {
  name: "authors",
  data() {
    return {
      dialog: false,
      name: "",
      pagination: {
        rowsPerPage: 30
      },
      columns: [     
        { name: 'name', label: 'Name', field: 'name', align: 'left' },
        { name: 'actions', label: '' }
      ]
    };
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
    ...mapActions('authors', ['create', 'fetchAll']),
    showDialog() {
      this.dialog = true;
    },
    submitForm() {
      this.$v.$touch()
      if(!this.$v.$error) {
        this.create({ name: this.name })
        this.dialog = false;
      }
    },
    resetForm() {
      this.name = ''
      this.$v.$reset()
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
