import type { TimeCycle, Weather } from './world'
import type { LootTableId } from '@/data/weighted/lootTable'
import type { effects } from '@/data/effectDatabase'
import type { BuffId } from './buff'
import type { Modifier } from './modifier'

export type EffectTrigger = 'onUse' | 'tick' | 'fishCaught'

export interface EffectParameter {
  readonly modifyCatch: {
    readonly modifier?: Modifier
    readonly quantity?: number
  }
  readonly modifyPlayerStat: {
    readonly stat: 'luck' | 'xp'
    readonly value: number
    readonly mode: 'add' | 'subtract' | 'multiply' | 'override'
  }
  readonly changeWeather: { readonly weather?: Weather }
  readonly changeTime: { readonly time?: TimeCycle }
  readonly grantRandomItem: { readonly lootId: LootTableId }
  readonly applyBuff: { buffId: BuffId }
  readonly chance: {
    readonly chance: number
    readonly effects: Effect<EffectType>[]
  }
}

export type EffectType = keyof EffectParameter

export interface Effect<E extends EffectType> {
  readonly trigger: EffectTrigger
  readonly type: E
  readonly params: EffectParameter[E]
}

export type EffectId = keyof typeof effects
