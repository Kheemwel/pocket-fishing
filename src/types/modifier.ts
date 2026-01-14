import { sizes, qualities, mutations } from '@/data/modifierDatabase'

interface ModifierTrait {
  name: string
  valueMultiplier: number
}

export type SizeId = keyof typeof sizes
export type QualityId = keyof typeof qualities
export type MutationId = keyof typeof mutations

export const SIZE_DB = sizes satisfies Record<SizeId, ModifierTrait>
export const QUALITY_DB = qualities satisfies Record<QualityId, ModifierTrait>
export const MUTATION_DB = mutations satisfies Record<MutationId, ModifierTrait>

export interface Modifier {
  size: SizeId // e.g., 'small'
  quality: QualityId // e.g., 'excellent'
  mutation: MutationId // e.g., 'glowing'
}

export interface ModifierBonus {
  size?: Partial<Record<SizeId, number>>
  quality?: Partial<Record<QualityId, number>>
  mutation?: Partial<Record<MutationId, number>>
}
