import type { ShopDef } from '@/types/shop'

export const SHOP_FISHERMAN: ShopDef = {
  id: 'shop_fisherman',
  entries: [
    { itemId: 'bait_worm', price: 5 },
    { itemId: 'rod_basic', price: 100, stock: 1 },
  ],
}
