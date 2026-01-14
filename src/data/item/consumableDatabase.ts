import type { Item } from '@/types/item'

const consumableDefaults = {
  stackable: true,
  tags: ['consumable'],
} as const

function createConsumable<T extends Omit<Item, keyof typeof consumableDefaults>>(overrides: T) {
  return {
    ...consumableDefaults,
    ...overrides,
  } as const
}

export const CONSUMABLE_DB = {
  luck_potion: createConsumable({
    name: 'Luck Potion',
    category: 'misc',
    rarity: 'rare',
    effects: ['luck_potion'],
  }),
  treasure_chest: createConsumable({
    name: 'Treasure Chest',
    category: 'treasure',
    rarity: 'rare',
    effects: ['treasure_chest'],
  }),
  time_orb: createConsumable({
    name: 'Orb of Dusk',
    category: 'misc',
    rarity: 'mythical',
    effects: ['time_orb'],
  }),
  weather_totem: createConsumable({
    name: 'Totem of Weather',
    category: 'misc',
    rarity: 'mythical',
    effects: ['weather_totem'],
  }),
} as const
