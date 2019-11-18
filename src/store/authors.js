export default {
  namespaced: true,

  state: {
    authors: []
  },

  getters: {
    authors(state) {
      return state.authors
    }
  }

}