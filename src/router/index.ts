import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../ui/layout/MainLayout.vue'),
      children: [
        { path: '', component: () => import('../ui/screens/LocationScreen.vue') },
        { path: 'inventory', component: () => import('../ui/screens/InventoryScreen.vue') },
        { path: 'shop', component: () => import('../ui/screens/ShopScreen.vue') },
        { path: 'map', component: () => import('../ui/screens/MapScreen.vue') },
        { path: 'fishing', component: () => import('../ui/screens/FishingScreen.vue') },
        { path: 'aquarium', component: () => import('../ui/screens/AquariumScreen.vue') },
        { path: 'crafting', component: () => import('../ui/screens/CraftingScreen.vue') },
        { path: 'enchanting', component: () => import('../ui/screens/EnchantingScreen.vue') },
      ],
    },
  ],
})

export default router
