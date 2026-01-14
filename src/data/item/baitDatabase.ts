import type { Item } from '@/types/item'

const baitDefaults = {
  category: 'misc',
  stackable: true,
  tags: ['equipable', 'consumable', 'bait'],
} as const

function createBait<T extends Omit<Item, keyof typeof baitDefaults>>(overrides: T) {
  return {
    ...baitDefaults,
    ...overrides,
  } as const
}

export const BAIT_DB = {
  bait_worm: createBait({
    name: 'Worm Bait',
    rarity: 'common',
    fishingStats: {
      lure_speed: 10,
      luck: 10,
      control: 0,
      resilience: 0,
      progress_speed: 0,
    },
  }),
} as const
