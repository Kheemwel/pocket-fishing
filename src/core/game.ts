import { GameLoop } from '@/managers/LoopManager'
import { EffectSystem } from '@/systems/EffectSystem'
import { FishingSystem } from '@/systems/FishingSystem'
import { PlayerSystem } from '@/systems/PlayerSystem'
import { WorldSystem } from '@/systems/WorldSystem'
import { Dispatcher } from './dispatcher'

export function initializeGame() {
  const dispatcher = new Dispatcher()

  // Register systems
  new FishingSystem(dispatcher)
  new PlayerSystem(dispatcher)
  new WorldSystem(dispatcher)
  new EffectSystem(dispatcher)

  // Create the game loop
  const loop = new GameLoop((deltaTime) => {
    dispatcher.dispatch({ type: 'tick', payload: { deltaTime } })
  })

  // start the loop immediately
  loop.start()

  return {
    dispatcher,
  }
}
