import type { Item } from '@/types/item'

const runeDefaults = {
  stackable: true,
  category: 'rune',
  rarity: 'secret',
} as const

function createRune<T extends Omit<Item, keyof typeof runeDefaults>>(
  overrides: T & { tags?: readonly string[] },
) {
  return {
    ...runeDefaults,
    ...overrides,
    tags: [...(overrides.tags || [])] as const,
  } as const
}

export const RUNE_DB = {
  rune_of_duplication: createRune({
    name: 'Rune of Duplication',
    baseValue: 100,
  }),
} as const
