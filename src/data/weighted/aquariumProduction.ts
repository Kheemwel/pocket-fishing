import type { DeepReadonly } from '../deepReadOnly'
import type { WeightedTable } from '../../types/weighted'
import type { FishId, ItemId } from '@/types/item'

export const AQUARIUM_TABLE: Record<FishId, DeepReadonly<WeightedTable<ItemId>>> = {
  fish_carp: {
    entries: [
      { id: 'fish_scale', weight: 70, min: 1, max: 3 },
      { id: 'fish_oil', weight: 30, min: 1, max: 1 },
    ],
  },
  fish_gold: {
    entries: [
      { id: 'fish_scale', weight: 50, min: 1, max: 3 },
      { id: 'fish_oil', weight: 50, min: 1, max: 2 },
    ],
  },
}
