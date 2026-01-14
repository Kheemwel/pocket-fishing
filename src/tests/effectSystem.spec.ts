import { initializeGame } from '@/core/game'
import { EffectSystem } from '@/systems/EffectSystem'
import { describe, it, expect, vi } from 'vitest'

describe('Effect System', () => {
  const { dispatcher, state } = initializeGame()

  // const system: EffectSystem = new EffectSystem(dispatcher, state)

  // it('responds to a real dispatcher event', () => {
  //   // We spy on a private method to see if the internal "pipe" is working
  //   const runTriggerSpy = vi.spyOn(system as any, 'runTrigger')

  //   // Dispatch using the real logic of your Dispatcher class
  //   dispatcher.dispatch({ type: 'onUse', payload: { itemId: 'time_orb' } })

  //   expect(runTriggerSpy).toHaveBeenCalledWith('onUse')
  // })

  it('time should change', () => {
    const oldTime = state.world.time
    const oldWeather = state.world.weather
    dispatcher.dispatch({ type: 'onUse', payload: { itemId: 'time_orb' } })
    expect(state.world.time).not.toBe(oldTime)
    // expect(state.world.weather).toBe(oldWeather)
  })
})
