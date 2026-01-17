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
  treasure_hunter: {
    name: 'Treasure Hunter',
    activation: {
      condition: 'enchanted',
    },
    effects: [
      {
        trigger: 'fishCaught',
        type: 'grantRandomItem',
        params: {
          lootId: 'treasure_chest',
        },
      },
    ],
  },
  xp_boost: {
    name: 'XP Boost',
    activation: {
      condition: 'enchanted',
    },
    effects: [
      {
        trigger: 'fishCaught',
        type: 'modifyPlayerStat',
        params: {
          stat: 'xpMultiplier',
          value: 1.5,
          mode: 'multiply',
        },
      },
    ],
  },
  bait_saver: {
    name: 'Bait Saver',
    activation: {
      condition: 'enchanted',
    },
    effects: [
      {
        trigger: 'fishCaught',
        type: 'chance',
        params: {
          chance: 0.5,
          effects: [
            {
              trigger: 'fishCaught',
              type: 'modifyPlayerStat',
              params: {
                stat: 'bait',
                value: 1,
                mode: 'add',
              },
            },
          ],
        },
      },
    ],
  },
} as const

export const PASSIVE_DB = passives satisfies DeepReadonly<Record<PassiveId, Passive>>
