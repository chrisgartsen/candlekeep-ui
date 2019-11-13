<template>
  <q-page padding>

    <q-breadcrumbs>
      <q-breadcrumbs-el label="Home" to="/" />
      <q-breadcrumbs-el label="Books" />
    </q-breadcrumbs>
    
    <div class="q-mt-xl q-mb-xl">
      <q-table title="Books" :data="books" :columns="columns" row-key="id">
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="isbn" :props="props">
              {{ props.row.isbn }}
            </q-td>
            <q-td key="title" :props="props">
              {{ props.row.title }}
            </q-td>
            <q-td key="actions" :props="props">
              <q-btn flat color="primary" icon="delete" @click="requestDelete(props.row._id)" />
            </q-td>
          </q-tr>
        </template>

        <template v-slot:no-data="{ icon, message, filter }">
          <div class="full-width text-primary">
            No books are present. Why not <router-link to="/books/add" class="table-link">add a new book</router-link>?
          </div>
        </template>

      </q-table>
    </div>

    <q-btn label="Add book" to="/books/add" color="primary" />

  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

export default {
  name: 'books',
  data() {
    return {
      columns: [
        { name: 'isbn', label: 'ISBN', field: 'isbn', align: 'left' },
        { name: 'title', label: 'Title',  field: 'title', align: 'left' },
        { name: 'actions', label: 'Actions'}
      ],
    }
  },
  computed: {
    ...mapGetters('books', ['books'])
  },
  methods: {
    ...mapActions('books', ['deleteBook']),
    requestDelete(id) {
      this.$q.dialog({
        title: 'Confirm delete',
        message: 'Are you sure you want to delete this book?',
        cancel: true,
        ok: {
          color: 'negative',
          flat: true
        }
      }).onOk(() => {
        try { 
          this.deleteBook(id)
        } catch(err) {
          console.log(err)
        }
      })
    }
  },
  async created() {
    try {
      await this.$store.dispatch('books/fetchBooks')
    } catch(err) {
      console.log(err)
    }
  },
}
</script>