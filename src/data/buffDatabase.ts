import type { Buff, BuffId } from '@/types/buff'
import type { DeepReadonly } from './deepReadOnly'

export const buffs = {
  luck_potion: {
    name: 'Luck',
    duration: 300,
    effects: [
      {
        trigger: 'tick',
        type: 'modifyPlayerStat',
        params: {
          stat: 'luck',
          value: 30,
          mode: 'add',
        },
      },
    ],
  },
} as const

export const BUFF_DB = buffs satisfies DeepReadonly<Record<BuffId, Buff>>
