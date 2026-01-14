import type { FishingMode, FishingState } from '@/types/state'
import { defineStore } from 'pinia'

export const useFishingStateStore = defineStore('fishing_state', {
  state: (): FishingState => ({
    mode: 'idle' as FishingMode,
    currentCatch: undefined,
  }),
})
