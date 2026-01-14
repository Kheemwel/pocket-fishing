import type { Effect, EffectId, EffectType } from '@/types/effect'

export const effects = {
  treasure_chest: {
    trigger: 'onUse',
    type: 'grantRandomItem',
    params: {
      lootId: 'treasure_chest',
    },
  },
  time_orb: {
    trigger: 'onUse',
    type: 'changeTime',
    params: {},
  },
  weather_totem: {
    trigger: 'onUse',
    type: 'changeWeather',
    params: {},
  },
  luck_potion: {
    trigger: 'onUse',
    type: 'applyBuff',
    params: {
      buffId: 'luck_potion',
    },
  },
} as const

export const EFFECT_DB = effects satisfies Record<EffectId, Effect<EffectType>>
