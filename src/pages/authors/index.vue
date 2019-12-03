<template>
  <q-page padding>
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Home" to="/" />
      <q-breadcrumbs-el label="Authors" />
    </q-breadcrumbs>

    <div class="q-mt-xl q-mb-xl row">
      <q-table class="col-4 offset-4" title="Authors" selection="multiple" :selected.sync="selected"
              :data="authors" :columns="columns" row-key="_id" :pagination.sync="pagination">
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td auto-width>
              <q-checkbox v-model="props.selected" />
            </q-td>
            <q-td key="name" :props="props">{{ props.row.name }} </q-td>
            <q-td key="actions" :props="props">
              <q-btn flat color="primary" icon="edit" />              
              <q-btn flat color="primary" icon="delete" @click="requestDeleteOne(props.row._id)" />
            </q-td>
          </q-tr>
        </template>

        <template v-slot:bottom>
          <q-btn flat dense color="primary" label="Delete selected" v-if="showDeleteAll" @click="requestDeleteMultiple" />
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

export default {
  name: "authors",
  data() {
    return {
      dialog: false,
      selected: [],
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
    showDeleteAll() {
      return this.selected.length > 0
    },
    nameError() {
      if(!this.$v.name.required) return "Field is required"
    }
  },
  methods: {
    ...mapActions('authors', ['create', 'fetchAll', 'delete', 'deleteMultiple']),
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
      }).onOk(() => {
        console.log("To delete", ids)
        try { 
          const ids = this.selected.map(item => item._id)
          console.log("Raw table", ids)
          this.deleteMultiple(ids)
        } catch(err) {
          console.log(err)
        }
      })
    },
    requestDeleteOne(id) {
      console.log("Deleting 1")
      this.requestDelete([{_id: id}], 'Are you sure you want to delete this author?')
      console.log("Deleting 2")
      // this.$q.dialog({
      //   title: 'Confirm delete',
      //   message: 'Are you sure you want to delete this author?',
      //   cancel: true,
      //   ok: {
      //     color: 'negative',
      //     flat: true
      //   }
      // }).onOk(() => {
      //   try { 
      //     this.delete(id)
      //   } catch(err) {
      //     console.log(err)
      //   }
      // })
    },
    requestDeleteMultiple() {
      this.requestDelete(this.selected, 'Are you sure you want to delete all of these authors?')
      // this.$q.dialog({
      //   title: 'Confirm delete',
      //   message: 'Are you sure you want to delete all of these authors?',
      //   cancel: true,
      //   ok: {
      //     color: 'negative',
      //     flat: true
      //   }
      // }).onOk(() => {
      //   try { 
      //     const ids = this.selected.map(item => item._id)
      //     this.deleteMultiple(ids)
      //   } catch(err) {
      //     console.log(err)
      //   }
      // })
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
