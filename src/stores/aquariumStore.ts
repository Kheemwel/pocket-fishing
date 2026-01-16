import { defineStore } from 'pinia'
import type { AquariumState } from '@/types/state'

export const useAquariumStore = defineStore('aquarium', {
  state: (): AquariumState => ({
    aquariums: [
      {
        id: 'basic_aquarium',
        slots: [],
        productionProgress: 0,
      },
    ],
  }),
})
