import type { Dispatcher } from '@/core/Dispatcher'
import { WorldService } from '@/services/WorldService'
import { useWorldStateStore } from '@/stores/worldStateStore'
import type { LocationId } from '@/types/location'

// export class WorldSystem {
//   private readonly worldState: WorldState

//   constructor(private readonly dispatcher: Dispatcher) {
//     this.worldState = useWorldStateStore()
//     this.init()
//   }

//   private init(): void {
//     this.seasonTick()
//     this.timeTick()
//     this.changeTime()
//     this.changeSeason()
//     this.changeWeather()
//     this.onTimeCycleChanged()
//   }

//   private seasonTick() {
//     let elapsedSeconds = 0
//     this.dispatcher.subscribe('tick', ({ deltaTime }) => {
//       elapsedSeconds += deltaTime
//       if (elapsedSeconds >= 1) {
//         const newSeason = WorldService.getRealTimeSeason()
//         if (newSeason !== this.worldState.season) {
//           this.dispatcher.dispatch({ type: 'changeSeason', payload: { season: newSeason } })
//         }
//         elapsedSeconds = 0
//       }
//     })
//   }

//   private timeTick() {
//     let elapsedSeconds = 0
//     this.dispatcher.subscribe('tick', ({ deltaTime }) => {
//       elapsedSeconds += deltaTime
//       if (elapsedSeconds >= TIME_PER_TIME_CYCLE) {
//         this.dispatcher.dispatch({ type: 'changeTime' })
//         elapsedSeconds = 0
//       }
//     })
//   }

//   private changeTime() {
//     this.dispatcher.subscribe('changeTime', (payload) => {
//       console.log('changeTime', payload)
//       const timeCyle = payload
//         ? payload.time
//         : WorldService.getTime(this.worldState.time === 'day' ? 'night' : 'day')
//       this.worldState.time = timeCyle

//       this.dispatcher.dispatch({ type: 'timeCycleChanged' })
//     })
//   }

//   private changeSeason() {
//     this.dispatcher.subscribe('changeSeason', ({ season }) => {
//       console.log('changeSeason', season)
//       this.worldState.season = season
//       this.dispatcher.dispatch({ type: 'seasonChanged' })
//     })
//   }

//   private changeWeather() {
//     this.dispatcher.subscribe('changeWeather', (payload) => {
//       console.log('changeWeather', payload)
//       this.worldState.weather = payload
//         ? payload.weather
//         : WorldService.getWeather(this.worldState.season, this.worldState.time)
//       this.dispatcher.dispatch({ type: 'weatherChanged' })
//     })
//   }

//   private onTimeCycleChanged() {
//     this.dispatcher.subscribe('timeCycleChanged', () => {
//       console.log('timeCycleChanged')
//       this.dispatcher.dispatch({
//         type: 'changeWeather',
//         payload: {
//           weather: WorldService.getWeather(this.worldState.season, this.worldState.time),
//         },
//       })
//     })
//   }
// }

export class WorldSystem {
  constructor(private dispatcher: Dispatcher) {
    const world = useWorldStateStore()

    this.dispatcher.subscribe('tick', ({ deltaTime }) => {
      const flags = WorldService.advanceTime(world, deltaTime)

      if (flags.secondChanged) dispatcher.dispatch({ type: 'timeSecondChanged' })
      if (flags.minuteChanged) dispatcher.dispatch({ type: 'timeMinuteChanged' })
      if (flags.hourChanged) dispatcher.dispatch({ type: 'timeHourChanged' })
      if (flags.dayChanged) dispatcher.dispatch({ type: 'timeDayChanged' })
      if (flags.seasonChanged) dispatcher.dispatch({ type: 'timeSeasonChanged' })
      if (flags.yearChanged) dispatcher.dispatch({ type: 'timeYearChanged' })
      if (flags.timeCycleChanged) dispatcher.dispatch({ type: 'timeCycleChanged' })
    })

    this.dispatcher.subscribe('timeCycleChanged', () => {
      const timeCycle = WorldService.getTimeCycle(world)

      for (const locationId in world.locations) {
        const location = world.locations[locationId as LocationId]

        if (location.lastWeatherUpdateHour === world.time.hour) continue

        const season = WorldService.getSeasonForLocation(world, locationId as LocationId)

        location.weather = WorldService.getWeather(season, timeCycle)
        location.lastWeatherUpdateHour = world.time.hour

        dispatcher.dispatch({
          type: 'weatherChanged',
          payload: { locationId: locationId as LocationId, weather: location.weather },
        })
      }
    })
  }
}
