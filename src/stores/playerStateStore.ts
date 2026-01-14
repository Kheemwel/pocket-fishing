import type { PlayerState } from '@/types/state'
import { defineStore } from 'pinia'

export const usePlayerStateStore = defineStore('player_state', {
  state: (): PlayerState => ({
    money: 0,
    level: 1,
    xp: 0,
    luck: 0,
    xpMultiplier: 1,
    equipments: {
      rod: 'rod_basic',
    },
    buffs: [],
    items: [],
    location: 'greenrock_lake',
  }),
})
