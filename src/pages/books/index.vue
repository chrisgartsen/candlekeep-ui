<template>
  <q-page padding>

    <q-breadcrumbs>
      <q-breadcrumbs-el label="Home" to="/" />
      <q-breadcrumbs-el label="Books" />
    </q-breadcrumbs>
    
    <div class="q-mt-xl q-mb-xl">
      <q-table title="Books" :data="books" :columns="columns" row-key="_id" selection="multiple" :selected.sync="selected" :pagination.sync="pagination">

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td auto-width>
              <q-checkbox v-model="props.selected" />
            </q-td>
            <q-td key="isbn" :props="props">
              {{ props.row.isbn }}
            </q-td>
            <q-td key="title" :props="props">
              {{ props.row.title }}
            </q-td>
            <q-td key="author" :props="props">
              {{ props.row.author ? props.row.author.name : "" }}
            </q-td>
            <q-td key="genre" :props="props">
              {{ props.row.genre }}
            </q-td>
            <q-td key="language" :props="props">
              {{ props.row.language }}
            </q-td>
            <q-td key="actions" :props="props">
              <q-btn flat color="primary" icon="edit" :to="{ name: 'books/edit', params: { id: props.row._id }}" />              
              <q-btn flat color="primary" icon="delete" @click="requestDelete(props.row._id)" />
            </q-td>
          </q-tr>
        </template>

        <template v-slot:no-data="{ icon, message, filter }">
          <div class="full-width text-primary">
            No books are present. Why not <router-link to="/books/add" class="table-link">add a new book</router-link>?
          </div>
        </template>

        <template v-slot:bottom v-if="showAllButttons">
          <q-btn flat dense color="primary" label="Delete selected" @click="requestDeleteAll" class="q-mr-xl" />
          <q-btn flat dense color="primary" label="Update selected" />
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
      selected: [],
      pagination: {
        rowsPerPage: 30
      },
      columns: [
        { name: 'isbn', label: 'ISBN', field: 'isbn', align: 'left' },
        { name: 'title', label: 'Title',  field: 'title', align: 'left' },
        { name: 'author', label: 'Author',  field: 'author', align: 'left' },
        { name: 'genre', label: 'Genre',  field: 'genre', align: 'left' },
        { name: 'language', label: 'Language',  field: 'language', align: 'left' },
        { name: 'actions', label: 'Actions'}
      ],
    }
  },
  computed: {
    ...mapGetters('books', ['books']),
    showAllButttons() {
      return this.selected.length > 0
    }
  },
  methods: {
    ...mapActions('books', ['deleteBook', 'deleteBooks']),
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
    },
    requestDeleteAll() {
      this.$q.dialog({
        title: 'Confirm delete',
        message: 'Are you sure you want to all of these books?',
        cancel: true,
        ok: {
          color: 'negative',
          flat: true
        }
      }).onOk(() => {
        try { 
          const ids = this.selected.map(item => item._id)
          this.deleteBooks(ids)
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