/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Dispatcher } from '@/core/Dispatcher'
import type { FishingState, PlayerState, WorldState } from '@/types/state'
import {
  type Effect,
  type EffectId,
  type EffectParameter,
  type EffectTrigger,
  type EffectType,
} from '@/types/effect'
import { BUFF_DB } from '@/data/buffDatabase'
import type { BuffId } from '@/types/buff'
import type { TimeCycle, Weather } from '@/types/world'
import type { Passive, PassiveId } from '@/types/passive'
import { EFFECT_DB } from '@/data/effectDatabase'
import { ITEM_DB } from '@/data/item/itemDatabase'
import type { Item } from '@/types/item'
import { PASSIVE_DB } from '@/data/passiveDatabase'
import type { GameActionPayloads } from '@/types/gameAction'
import { usePlayerStateStore } from '@/stores/playerStateStore'
import { useFishingStateStore } from '@/stores/fishingStateStore'
import { useWorldStateStore } from '@/stores/worldStateStore'
import { WeightedService } from '@/services/WeightedService'
import { WorldService } from '@/services/WorldService'

export class EffectSystem {
  private readonly playerState: PlayerState
  private readonly fishingState: FishingState
  private readonly worldState: WorldState
  private readonly activePassives: Map<PassiveId, VoidFunction[]>
  private elapsedSeconds = 0

  constructor(private readonly dispatcher: Dispatcher) {
    this.playerState = usePlayerStateStore()
    this.fishingState = useFishingStateStore()
    this.worldState = useWorldStateStore()
    this.activePassives = new Map()
    this.init()
  }

  private init(): void {
    this.activatePassives()
    this.buffDurationChecker()
    this.onItemUse()
    this.onItemEquipped()
  }

  private activatePassives() {
    Object.keys(PASSIVE_DB).forEach((passiveId) => {
      this.registerPassive(passiveId as PassiveId)
    })
  }

  private registerPassive(passiveId: PassiveId) {
    const passive = PASSIVE_DB[passiveId]
    if (!this.isPassiveActive(passive)) return

    const subscriptions: VoidFunction[] = []
    passive.effects.forEach((effect) => {
      subscriptions.push(
        this.dispatcher.subscribe(effect.trigger, (payload) => {
          this.executeEffect(effect, payload)
        }),
      )
    })
    this.activePassives.set(passiveId, subscriptions)
  }

  private unregisterPassive(passiveId: PassiveId) {
    const subscriptions = this.activePassives.get(passiveId)
    subscriptions?.forEach((subs) => {
      subs()
    })
    this.activePassives.delete(passiveId)
  }

  /** Checks if passive should be active */
  private isPassiveActive(passive: Passive): boolean {
    switch (passive.activation.condition) {
      case 'rodEquipped':
        return this.playerState.equipments.rod === passive.activation.rod
      case 'baitEquipped':
        return this.playerState.equipments.bait === passive.activation.bait
      default:
        return false
    }
  }

  private buffDurationChecker() {
    this.dispatcher.subscribe('tick', ({ deltaTime }) => {
      this.elapsedSeconds += deltaTime

      if (this.elapsedSeconds < 1) return
      this.elapsedSeconds -= 1

      this.playerState.buffs.forEach((buff) => {
        buff.remainingTime -= 1
      })

      this.playerState.buffs = this.playerState.buffs.filter((buff) => buff.remainingTime > 0)
    })
  }

  private applyBuff(buffId: BuffId) {
    const existing = this.playerState.buffs.find((b) => b.id === buffId)

    if (existing) {
      existing.remainingTime = BUFF_DB[buffId].duration
    } else {
      this.playerState.buffs.push({
        id: buffId,
        remainingTime: BUFF_DB[buffId].duration,
      })
    }
  }

  private executeEffect(effect: Effect<EffectType>, payload?: GameActionPayloads[EffectTrigger]) {
    switch (effect.type) {
      case 'modifyPlayerStat': {
        const { stat, value, mode } = effect.params as EffectParameter['modifyPlayerStat']

        switch (mode) {
          case 'add':
            this.playerState[stat] += value
            break
          case 'subtract':
            this.playerState[stat] -= value
            break
          case 'multiply':
            this.playerState[stat] = this.playerState[stat] + 1 * value
            break
          case 'override':
            this.playerState[stat] = value
            break
        }
        break
      }

      case 'applyBuff': {
        this.applyBuff((effect.params as EffectParameter['applyBuff']).buffId)
        break
      }

      case 'grantRandomItem': {
        const item = WeightedService.generateLoot(
          (effect.params as EffectParameter['grantRandomItem']).lootId,
        )
        this.dispatcher.dispatch({
          type: 'addItem',
          payload: { items: [item] },
        })
        break
      }

      case 'changeWeather':
        const weatherParam = effect.params as EffectParameter['changeWeather']
        const weather = weatherParam
          ? (weatherParam.weather as Weather)
          : WorldService.getWeather(this.worldState.season, this.worldState.time)
        this.worldState.weather = weather

        this.dispatcher.dispatch({ type: 'weatherChanged' })
        break

      case 'changeTime':
        const timeParam = effect.params as EffectParameter['changeTime']
        const time = timeParam
          ? (timeParam.time as TimeCycle)
          : WorldService.getTime(this.worldState.time)
        this.worldState.time = time
        this.dispatcher.dispatch({ type: 'timeCycleChanged' })
        break

      case 'modifyCatch':
        const modifyCatchParam = effect.params as EffectParameter['modifyCatch']
        this.fishingState.currentCatch!.quantity = modifyCatchParam.quantity as number
        break
    }
  }

  private onItemUse() {
    this.dispatcher.subscribe('onUse', ({ itemId }) => {
      const effects = (ITEM_DB[itemId] as Item).effects as EffectId[]
      effects.forEach((effectId) => {
        this.executeEffect(EFFECT_DB[effectId])
      })
    })
  }

  private onItemEquipped() {
    this.dispatcher.subscribe('onEquipped', ({ equipmentId }) => {
      const item = ITEM_DB[equipmentId] as Item
      if (!item.passive) return

      const passive = item.passive as PassiveId
      this.registerPassive(passive)
    })
  }
}
