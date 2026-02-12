import type { RarityId, Rarity } from '@/types/rarity'

export const RARITIES_DB: Record<RarityId, Rarity> = {
  trash: {
    name: 'Trash',
    order: 0,
    luckMultiplier: -1,
    color: '#964B00',
  },
  common: {
    name: 'Common',
    order: 1,
    luckMultiplier: 0.5,
    color: '#FFFFFF',
  },
  rare: {
    name: 'Rare',
    order: 2,
    luckMultiplier: 1,
    color: '#00BFFF',
  },
  legendary: {
    name: 'Legendary',
    order: 3,
    luckMultiplier: 1.5,
    color: '#FFD700',
  },
  mythical: {
    name: 'Mythical',
    order: 4,
    luckMultiplier: 2,
    color: '#FF00FF',
  },
  exotic: {
    name: 'Exotic',
    order: 5,
    luckMultiplier: 3,
    color: '#00FFFF',
  },
  secret: {
    name: 'Secret',
    order: 6,
    luckMultiplier: 5,
    color: '#800080',
  },
}
