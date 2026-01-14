import type { Item } from '@/types/item'

const materialDefaults = {
  category: 'material',
  stackable: true,
  tags: ['sellable'],
} as const

function createMaterial<T extends Omit<Item, keyof typeof materialDefaults>>(overrides: T) {
  return {
    ...materialDefaults,
    ...overrides,
  } as const
}

export const MATERIAL_DB = {
  fish_scale: createMaterial({
    name: 'Fish Scale',
    rarity: 'common',
    baseValue: 5,
  }),
  fish_oil: createMaterial({
    name: 'Fish Oil',
    rarity: 'rare',
    baseValue: 15,
  }),
} as const
