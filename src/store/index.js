import Vue from 'vue'
import Vuex from 'vuex'

import layout from './layout'
import auth   from './auth'
import isbn   from './isbn'
import books  from './books'

Vue.use(Vuex)

export default function () {
  const Store = new Vuex.Store({
    modules: {
      layout,
      auth,
      isbn,
      books
    },

    strict: process.env.DEV
  })

  return Store
}
