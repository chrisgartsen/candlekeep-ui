import Vue from 'vue'
import Vuex from 'vuex'

import layout from './layout'
import auth   from './auth'

Vue.use(Vuex)

export default function () {
  const Store = new Vuex.Store({
    modules: {
      layout,
      auth
    },

    strict: process.env.DEV
  })

  return Store
}
