<template>
    <q-table class="col-4 offset-4" title="Authors" selection="multiple" :selected.sync="selected"
          :data="authors" :columns="columns" row-key="_id" :pagination.sync="pagination">
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td auto-width>
          <q-checkbox v-model="props.selected" />
        </q-td>
        <q-td key="name" :props="props">{{ props.row.name }} </q-td>
        <q-td key="actions" :props="props">
          <q-btn flat color="primary" icon="edit" @click="showDialogForEdit(props.row._id)" />              
          <q-btn flat color="primary" icon="delete" @click="requestDeleteOne(props.row._id)" />
        </q-td>
      </q-tr>
    </template>

    <template v-slot:bottom>
      <q-btn flat dense color="primary" label="Delete selected" v-if="showDeleteAll" @click="requestDeleteMultiple" />
    </template>

  </q-table>
</template>

<script>
export default {
  name: 'authors-list',
  props: {
    authors: {
      required: true,
      type: Array
    }
  },
  data() {
    return {
      selected: [],
      pagination: {
        rowsPerPage: 30
      },
      columns: [     
        { name: 'name', label: 'Name', field: 'name', align: 'left' },
        { name: 'actions', label: '' }
      ]
    }
  },
  computed: {
    showDeleteAll() {
      return this.selected.length > 0
    },
  },
  methods: {
    requestDeleteOne(id) {
      this.$emit('requestDeleteOne', id)
    },
    requestDeleteMultiple() {
      const ids = this.selected.map(item => item._id)
      this.$emit('requestDeleteMultiple', ids)
      this.selected = []
    },
    showDialogForEdit(id) {
      this.$emit('showDialogForEdit', id)
    }
  }
}
</script>