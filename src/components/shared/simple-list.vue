<template>
    <q-table :title="title" selection="multiple" :selected.sync="selected"
          :data="items" :columns="columns" row-key="_id" :pagination.sync="pagination">
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
  name: 'simple-list',
  props: {
    items: {
      required: true,
      type: Array
    },
    title: {
      type: String,
      default: 'Item list'
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
      this.requestDelete([id], "Are you sure you want to delete this entry?");
    },
    requestDeleteMultiple() {
      const ids = this.selected.map(item => item._id)
      this.requestDelete(ids, "Are you sure you want to delete all of these entries?");
      this.selected = []
    },
    requestDelete(ids, message) {
      this.$q
        .dialog({
          title: "Confirm delete",
          message: message,
          cancel: true,
          ok: {
            color: "negative",
            flat: true
          }
        })
        .onOk(async () => {
          this.$emit('deleteItems', ids)
          ids = []
        });
    },

    showDialogForEdit(id) {
      this.$emit('showDialogForEdit', id)
    }
  }
}
</script>