import type { RarityId, Rarity } from '@/types/rarity'

export const RARITIES_DB: Record<RarityId, Rarity> = {
  trash: {
    name: 'Trash',
    order: 0,
    luckMultiplier: -1,
  },
  common: {
    name: 'Common',
    order: 1,
    luckMultiplier: 0.5,
  },
  rare: {
    name: 'Rare',
    order: 2,
    luckMultiplier: 1,
  },
  legendary: {
    name: 'Legendary',
    order: 3,
    luckMultiplier: 1.5,
  },
  mythical: {
    name: 'Mythical',
    order: 4,
    luckMultiplier: 2,
  },
  exotic: {
    name: 'Exotic',
    order: 5,
    luckMultiplier: 3,
  },
  secret: {
    name: 'Secret',
    order: 6,
    luckMultiplier: 5,
  },
}
