import { watch } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import ItemsView from '@/views/ItemsView.vue'
import LoginView from '@/views/LoginView.vue'
import { UserStore } from '@/stores/user';

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

router.beforeEach((to, from, next) => {
  const userStore = UserStore();
  const waitForAuthState = () => {
    if (!userStore.isAuthReady) {
      const stopWatching = watch(
        () => userStore.isAuthReady,
        (ready) => {
          if (ready) {
            stopWatching();
            proceed();
          }
        }
      );
    } else {
      proceed();
    }
  };
  const proceed = () => {
    if (to.name !== 'login' && !userStore.isLogged) {
      next({ name: 'login' });
    } else if (to.name === 'login' && userStore.isLogged) {
      next({ name: 'items' });
    } else {
      next();
    }
  };
  waitForAuthState();
});

export default router;
