import type { Passive, PassiveId } from '@/types/passive'
import type { DeepReadonly } from './deepReadOnly'

export const passives = {
  duplicator: {
    name: 'Duplicate Catch',
    activation: {
      condition: 'rodEquipped',
      rod: 'duplicator_rod',
    },
    effects: [
      {
        trigger: 'fishCaught',
        type: 'modifyCatch',
        params: {
          quantity: 2,
        },
      },
    ],
  },
} as const

export const PASSIVE_DB = passives satisfies DeepReadonly<Record<PassiveId, Passive>>
