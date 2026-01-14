import type { DeepReadonly } from 'vue'

export interface WeightedEntry<T> {
  readonly id: T
  readonly weight: number
  readonly min?: number
  readonly max?: number
}

export interface WeightedTable<T> {
  readonly entries: DeepReadonly<WeightedEntry<T>[]>
}
