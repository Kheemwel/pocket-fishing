import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../ui/layout/MainLayout.vue'),
      children: [
        { path: '', component: () => import('../ui/screens/FishingScreen.vue') },
        { path: 'inventory', component: () => import('../ui/screens/InventoryScreen.vue') },
        { path: 'shop', component: () => import('../ui/screens/ShopScreen.vue') },
      ],
    },
  ],
})

export default router
