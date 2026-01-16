import { GameLoop } from '@/managers/LoopManager'
import { AquariumSystem } from '@/systems/AquariumSystem'
import { EffectSystem } from '@/systems/EffectSystem'
import { FishingSystem } from '@/systems/FishingSystem'
import { LevelingSystem } from '@/systems/LevelingSystem'
import { PlayerSystem } from '@/systems/PlayerSystem'
import { TravelSystem } from '@/systems/TravelSystem'
import { WorldSystem } from '@/systems/WorldSystem'
import { Dispatcher } from './Dispatcher'

export function initializeGame() {
  const dispatcher = new Dispatcher()

  // Register systems
  new FishingSystem(dispatcher)
  new PlayerSystem(dispatcher)
  new WorldSystem(dispatcher)
  new EffectSystem(dispatcher)
  new AquariumSystem(dispatcher)
  new TravelSystem(dispatcher)
  new LevelingSystem(dispatcher)

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
