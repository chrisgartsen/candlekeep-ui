<template>
  <q-page padding>
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Home" to="/" />
      <q-breadcrumbs-el label="Authors" />
    </q-breadcrumbs>

    <br /><br /><br /><br />
    Authors: {{ authors }}

    <br /><br /><br /><br /><br /><br />

    <q-btn label="Add author" color="primary" @click="showDialog" />

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
import { mapGetters } from "vuex";
import { required } from "vuelidate/lib/validators";

export default {
  name: "authors",
  data() {
    return {
      dialog: false,
      name: ""
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
    showDialog() {
      this.dialog = true;
    },
    submitForm() {
      this.$v.$touch()
      if(!this.$v.$error) {
        this.dialog = false;
      }
    },
    resetForm() {
      this.name = ''
      this.$v.$reset()
    }
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
