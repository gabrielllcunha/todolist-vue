import { createRouter, createWebHistory } from 'vue-router'
import ItemsView from '@/views/ItemsView.vue'
import LoginView from '@/views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/items',
      name: 'items',
      component: ItemsView,
    },
    {
			path: '/:pathMatch(.*)*',
			redirect: '/items'
		},
  ]
})

export default router
