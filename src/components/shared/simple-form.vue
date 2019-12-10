<template>
  <q-card style="width:400px; max-width: 60vw;">

    <q-card-section class="row items-center">
      <div class="text-h6 text-primary">{{ formTitle }}</div>
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
      <q-btn flat color="primary" @click="submitForm">{{ buttonCaption }}</q-btn>
    </q-card-actions>

  </q-card>
</template>

<script>
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'simple-form',
  props: {
    formTitle: {
      type: String,
      default: "Enter data"
    },
    buttonCaption: {
      type: String,
      default: 'Submit'
    },
    fieldValue: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      name: this.fieldValue
    }
  },
  computed: {
    nameError() {
      if(!this.$v.name.required) return 'Field is required'
    }
  },
  validations: {
    name: {
      required
    }
  },
  methods: {
    submitForm() {
      this.$v.$touch()
      if(!this.$v.$error) {
        this.$emit('submitForm', this.name)
      }
    }
  }
}
</script>