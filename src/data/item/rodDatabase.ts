import type { Item } from '@/types/item'

const rodDefaults = {
  category: 'equipment',
  stackable: false,
  tags: ['equipable', 'permanent', 'rod'],
} as const

function createRod<T extends Omit<Item, keyof typeof rodDefaults>>(overrides: T) {
  return {
    ...rodDefaults,
    ...overrides,
  } as const
}

export const ROD_DB = {
  rod_basic: createRod({
    name: 'Basic Fishing Rod',
    rarity: 'common',
    fishingStats: {
      lure_speed: 0,
      luck: 0,
      control: 30,
      resilience: 0,
      progress_speed: 0,
    },
  }),
  fast_rod: createRod({
    name: 'Fast Rod',
    rarity: 'secret',
    fishingStats: {
      lure_speed: 95,
      luck: 0,
      control: 25,
      resilience: 0,
      progress_speed: 50,
    },
  }),
  dev_rod: createRod({
    name: 'Dev Rod',
    rarity: 'secret',
    fishingStats: {
      lure_speed: 100,
      luck: 0,
      control: 100,
      resilience: 999,
      progress_speed: -90,
    },
  }),
  try_hard_rod: createRod({
    name: 'Try Hard Rod',
    rarity: 'secret',
    fishingStats: {
      lure_speed: 100,
      luck: 999,
      control: 15,
      resilience: -999,
      progress_speed: 300,
    },
  }),
  duplicator_rod: createRod({
    name: 'Rod of Duplication',
    rarity: 'secret',
    fishingStats: {
      lure_speed: 100,
      luck: 0,
      control: 30,
      resilience: 30,
      progress_speed: 0,
    },
    passive: 'duplicator',
  }),
} as const
