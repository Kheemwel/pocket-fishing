import type { SizeId, QualityId, MutationId } from '@/types/modifier'
import type { WeightedTable } from '../../types/weighted'

export const SIZE_DISTRIBUTION: WeightedTable<SizeId> = {
  entries: [
    { id: 'tiny', weight: 5 },
    { id: 'small', weight: 25 },
    { id: 'regular', weight: 100 },
    { id: 'large', weight: 2 },
    { id: 'giant', weight: 0.1 },
  ],
}

export const QUALITY_TABLE: WeightedTable<QualityId> = {
  entries: [
    { id: 'stone', weight: 30 },
    { id: 'standard', weight: 100 },
    { id: 'pearl', weight: 5 },
    { id: 'crystal', weight: 1 },
    { id: 'star', weight: 0.1 },
  ],
}

export const MUTATION_TABLE: WeightedTable<MutationId> = {
  entries: [
    { id: 'corrupted', weight: 1 },
    { id: 'none', weight: 100 },
    { id: 'albino', weight: 5 },
    { id: 'shiny', weight: 1 },
  ],
}
