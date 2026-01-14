import type { Dispatcher } from '@/core/Dispatcher'
import { defineStore } from 'pinia'
import { inject } from 'vue'
import { useFishingMinigameStore } from './minigameStore'
import { useFishingStateStore } from './fishingStateStore'
import { useWorldStateStore } from './worldStateStore'
import { WorldService } from '@/services/WorldService'
import { usePlayerStateStore } from './playerStateStore'
import { LocationService } from '@/services/LocationService'
import { formatGameTime } from '@/utils/mathUtils'

export const useFishingStore = defineStore('fishing', () => {
  const dispatcher = inject<{ dispatcher: Dispatcher }>('game')?.dispatcher
  const fishingState = useFishingStateStore()
  const playerState = usePlayerStateStore()
  const worldState = useWorldStateStore()
  const fishing = useFishingMinigameStore()

  dispatcher?.subscribe('tick', ({ deltaTime }) => {
    fishing.update(deltaTime)
  })

  function castRod() {
    dispatcher?.dispatch({ type: 'castRod' })
  }

  dispatcher?.subscribe('minigameStart', (payload) => {
    console.log('minigameStart')

    fishing.start({
      controlPercent: payload.control,
      resilience: payload.resilience,
      progressSpeed: payload.progressSpeed,
    })
  })

  function getTimeCycle() {
    return WorldService.getTimeCycle(worldState) === 'day' ? '☀️' : '🌙'
  }

  function getSeason() {
    switch (WorldService.getGlobalSeason(worldState)) {
      case 'spring':
        return '🌸'
      case 'summer':
        return '🌅'
      case 'autumn':
        return '🍁'
      case 'winter':
        return '❄️'
    }
  }

  function getWeather() {
    const weather =
      worldState.locations[LocationService.getLocationIdByAreaId(playerState.location)].weather
    switch (weather) {
      case 'clear':
        return '🌤️'
      case 'rainy':
        return '🌧️'
      case 'windy':
        return '🍃'
      case 'foggy':
        return '☁️'
      case 'snowy':
        return '🌨️'
      case 'stormy':
        return '⛈️'
      case 'blizzard':
        return '🌨️❄️'
      case 'aurora':
        return '🌌'
    }
  }

  function getTime() {
    return formatGameTime(worldState.time.hour, worldState.time.minute)
  }

  return {
    fishingState,
    castRod,
    getTimeCycle,
    getSeason,
    getWeather,
    getTime,
  }
})
