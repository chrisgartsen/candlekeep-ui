
const routes = [
  { path: '/',
    component: () => import('layouts/layout.vue'),
    children: [
      { path: '', component: () => import('pages/index.vue') },
      { path: '/login', component: () => import('pages/login.vue') },
      { path: '/books', component: () => import('pages/books/index.vue'), meta: { requiresAuth: true } },
      { path: '/books/add', component: () => import('pages/books/create.vue'), meta: { requiresAuth: true } }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
