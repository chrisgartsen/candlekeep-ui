export default async ({ router, store }) => {
  
  router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if(!store.getters['auth/isLoggedIn']) {
        next({ path: '/login', query: { redirect: to.fullPath } })
      } else {
        next()
      }
    } else {
      next()
    }
  })

}
