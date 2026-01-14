import type { DeepReadonly } from '../deepReadOnly'
import type { WeightedTable } from '../../types/weighted'
import type { CatchableId } from '@/types/item'
import type { AreaId } from '@/types/location'

export const FISH_POOL: Partial<Record<AreaId, DeepReadonly<WeightedTable<CatchableId>>>> = {
  greenrock_lake: {
    entries: [
      { id: 'fish_carp', weight: 100 },
      { id: 'junk_boot', weight: 25 },
      { id: 'fish_gold', weight: 10 },
    ],
  },
  greenrock_river: {
    entries: [
      { id: 'fish_carp', weight: 100 },
      { id: 'junk_boot', weight: 25 },
      { id: 'fish_gold', weight: 10 },
    ],
  },
  greenrock_beach: {
    entries: [
      { id: 'fish_carp', weight: 100 },
      { id: 'junk_boot', weight: 25 },
      { id: 'fish_gold', weight: 10 },
    ],
  },
  greenrock_cave: {
    entries: [
      { id: 'fish_carp', weight: 100 },
      { id: 'junk_boot', weight: 25 },
      { id: 'fish_gold', weight: 10 },
    ],
  },
  bluestone_isle_beach: {
    entries: [
      { id: 'fish_carp', weight: 100 },
      { id: 'junk_boot', weight: 25 },
      { id: 'fish_gold', weight: 10 },
    ],
  },
  bluestone_isle_cave: {
    entries: [
      { id: 'fish_carp', weight: 100 },
      { id: 'junk_boot', weight: 25 },
      { id: 'fish_gold', weight: 10 },
    ],
  },
  redwater_island_beach: {
    entries: [
      { id: 'fish_carp', weight: 100 },
      { id: 'junk_boot', weight: 25 },
      { id: 'fish_gold', weight: 10 },
    ],
  },
  redwater_island_lagoon: {
    entries: [
      { id: 'fish_carp', weight: 100 },
      { id: 'junk_boot', weight: 25 },
      { id: 'fish_gold', weight: 10 },
    ],
  },
  redwater_island_cave: {
    entries: [
      { id: 'fish_carp', weight: 100 },
      { id: 'junk_boot', weight: 25 },
      { id: 'fish_gold', weight: 10 },
    ],
  },
}
