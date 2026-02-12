import type { Item } from '@/types/item'

const catchableDefaults = {
  stackable: true,
  tags: ['catchable', 'sellable'],
} as const

function createCatchable<T extends Omit<Item, keyof typeof catchableDefaults>>(
  overrides: T & { tags?: readonly string[] }, // Allow tags in overrides
) {
  return {
    ...catchableDefaults,
    ...overrides,
    // Merge the arrays: Default tags + whatever you passed in
    tags: [...catchableDefaults.tags, ...(overrides.tags || [])] as const,
  } as const
}

export const CATCHABLE_DB = {
  fish_carp: createCatchable({
    name: 'Common Carp',
    category: 'fish',
    rarity: 'common',
    baseValue: 10,
    xp: 5,
    fishingStats: {
      resilience: 90,
      progress_speed: 0,
    },
  }),
  fish_gold: createCatchable({
    name: 'Gold Fish',
    category: 'fish',
    rarity: 'common',
    baseValue: 15,
    xp: 10,
    resilience: 75,
    fishingStats: {
      resilience: 90,
      progress_speed: 0,
    },
  }),
  junk_boot: createCatchable({
    name: 'Rusty Boot',
    category: 'trash',
    rarity: 'trash',
    baseValue: 2,
    xp: 1,
    fishingStats: {
      resilience: 99,
      progress_speed: 0,
    },
  }),
} as const
