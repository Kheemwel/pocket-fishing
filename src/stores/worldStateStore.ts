import type { WorldState } from '@/types/world'
import { defineStore } from 'pinia'

export const useWorldStateStore = defineStore('world_state', {
  state: (): WorldState => ({
    time: {
      second: 0,
      minute: 0,
      hour: 8,
      day: 1,
      seasonIndex: 0,
      year: 1,
    },
    locations: {
      greenrock_town: {
        weather: 'clear',
        lastWeatherUpdateHour: 0,
      },
      bluestone_isle: {
        weather: 'clear',
        lastWeatherUpdateHour: 0,
      },
      redwater_island: {
        weather: 'clear',
        lastWeatherUpdateHour: 0,
      },
    },
  }),
})
