import { createRouter, createWebHistory } from 'vue-router'
import AuthLogin from '@/layouts/authLogin.vue'
import DefaultLayout from '@/layouts/defaultLayout.vue'
import { loadLayoutMiddleware } from '@/router/middleware'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: {
        title: 'Dashboard',
        isAuth: true,
        layout: DefaultLayout,
      },
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/users/UsersView.vue'),
      meta: {
        title: 'User Management',
        isAuth: true,
        layout: DefaultLayout,
      },
    },
    {
      path: '/users/edit/:id',
      name: 'edit user',
      component: () => import('../views/users/EditUserView.vue'),
      meta: {
        title: 'Edit User',
        isAuth: true,
        layout: DefaultLayout,
      },
    },
    {
      path: '/users/create',
      name: 'create user',
      component: () => import('../views/users/CreateUserView.vue'),
      meta: {
        title: 'Create User',
        isAuth: true,
        layout: DefaultLayout,
      },
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title: 'Login',
        layout: AuthLogin,
      },
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      meta: {
        title: 'Register',
        layout: AuthLogin,
      },
      component: () => import('../views/RegisterView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notfound',
      component: () => import('../views/NotFound.vue'),
      meta: {
        title: 'Page Not Found',
      },
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.isAuth) {
    await loadLayoutMiddleware()
  }
  document.title = `${to.meta.title} | Dasher`
  next()
})

export default router
