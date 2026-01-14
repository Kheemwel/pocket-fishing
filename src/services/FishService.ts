import { FISH_BEHAVIOR_DB } from '@/data/fishBehaviorDatabase'
import { CATCHABLE_DB } from '@/data/item/catchableDatabase'
import { ITEM_DB } from '@/data/item/itemDatabase'
import { RARITIES_DB } from '@/data/rarityDatabase'
import { SIZE_DISTRIBUTION, QUALITY_TABLE, MUTATION_TABLE } from '@/data/weighted/modifierTable'
import type { PlayerState } from '@/types/state'
import type { CatchCondition } from '@/types/catch'
import type { CatchableId, RodId, BaitId, FishId } from '@/types/item'
import {
  type ModifierBonus,
  SIZE_DB,
  QUALITY_DB,
  MUTATION_DB,
  type Modifier,
} from '@/types/modifier'
import type { WeightedTable } from '@/types/weighted'
import type { DeepReadonly } from 'vue'
import { randomInt } from '../utils/mathUtils'
import { WeightedService } from './WeightedService'
import type { Season, Weather, TimeCycle } from '@/types/world'

export class FishService {
  // private static matchesCondition(condition: CatchCondition, world: WorldState): boolean {
  //   return (
  //     (!condition.season || condition.season.includes(world.season)) &&
  //     (!condition.weather || condition.weather.includes(world.weather)) &&
  //     (!condition.time || condition.time.includes(world.time))
  //   )
  // }

  private static matchCondition(
    cond: CatchCondition,
    ctx: {
      season: Season
      weather: Weather
      timeCycle: TimeCycle
      hour: number
    },
  ): boolean {
    if (cond.season && !cond.season.includes(ctx.season)) return false
    if (cond.weather && !cond.weather.includes(ctx.weather)) return false
    if (cond.timeCycle && !cond.timeCycle.includes(ctx.timeCycle)) return false

    if (cond.timeRange) {
      const inRange = cond.timeRange.some((r) => ctx.hour >= r.startHour && ctx.hour < r.endHour)
      if (!inRange) return false
    }

    return true
  }

  private static getFinalWeight(
    baseWeight: number,
    fishId: CatchableId,
    ctx: {
      season: Season
      weather: Weather
      timeCycle: TimeCycle
      hour: number
    },
  ): number {
    const profile = FISH_BEHAVIOR_DB[fishId]
    if (!profile) return baseWeight

    // let weight = baseWeight * (profile.baseWeightMultiplier ?? 1)
    let weight = baseWeight

    for (const mod of profile.modifiers) {
      if (this.matchCondition(mod.when, ctx)) {
        weight *= mod.multiplier
      }
    }

    return Math.max(0, weight)
  }

  private static luckFactor(totalLuck: number): number {
    // logarithmic growth for gradual scaling
    // extreme luck ±300 produces a large effect
    return Math.sign(totalLuck) * Math.log2(1 + Math.abs(totalLuck) / 30)
  }

  private static applyLuckAndRarity(weight: number, fishId: CatchableId, luck: number): number {
    const fish = CATCHABLE_DB[fishId as FishId]
    if (!fish) return weight

    const rarity = RARITIES_DB[fish.rarity]
    const factor = this.luckFactor(luck)

    // bonus: positive luck favors high rarity, negative favors trash
    const bonus = factor * rarity.luckMultiplier

    // scale weight but prevent it from going fully zero for moderate luck
    const scaledWeight = weight * (1 + bonus)

    // ensure minimum 1% of base weight unless extreme luck
    return Math.max(weight * 0.01, scaledWeight)
  }

  private static applyModifierBonus<T extends string>(
    table: WeightedTable<T>,
    bonus?: Partial<Record<T, number>>,
  ): WeightedTable<T> {
    // If no bonus, just return original table
    if (!bonus) return table

    return {
      entries: table.entries.map((entry) => ({
        ...entry,
        weight: entry.weight * (bonus[entry.id as T] ?? 1),
      })),
    }
  }

  private static mergeModifierBonuses(bonuses?: ModifierBonus[]): ModifierBonus | undefined {
    if (!bonuses || bonuses.length === 0) return undefined

    const result: ModifierBonus = {}

    for (const bonus of bonuses) {
      // We cast the keys to a general string to avoid the 'never' inference
      for (const category of ['size', 'quality', 'mutation'] as const) {
        const bonusCategory = bonus[category]
        if (!bonusCategory) continue

        // Ensure the category object exists in the result
        if (!result[category]) {
          result[category] = {}
        }

        // Cast to Record<string, number> to allow mathematical operations
        const target = result[category] as Record<string, number>
        const source = bonusCategory as Record<string, number>

        for (const id in source) {
          // Multiplicative stacking: default to 1 if not present
          target[id] = (target[id] ?? 1) * (source[id] ?? 1)
        }
      }
    }

    return result
  }

  static calculateTotalCatchValue(catchId: CatchableId, modifier: Modifier): number {
    return (
      (ITEM_DB[catchId].baseValue as number) *
      SIZE_DB[modifier.size].valueMultiplier *
      QUALITY_DB[modifier.quality].valueMultiplier *
      MUTATION_DB[modifier.mutation].valueMultiplier
    )
  }

  static rollModifier(bonuses?: ModifierBonus[]): Modifier {
    const merged = this.mergeModifierBonuses(bonuses)

    const sizeTable = this.applyModifierBonus(SIZE_DISTRIBUTION, merged?.size)

    const qualityTable = FishService.applyModifierBonus(QUALITY_TABLE, merged?.quality)

    const mutationTable = FishService.applyModifierBonus(MUTATION_TABLE, merged?.mutation)

    return {
      size: WeightedService.rollWeighted(sizeTable),
      quality: WeightedService.rollWeighted(qualityTable),
      mutation: WeightedService.rollWeighted(mutationTable),
    }
  }

  static calculateTotalWaitTime(rodId: RodId, baitId: BaitId): number {
    const waitTime = randomInt(5, 15)

    // Get speeds (default to 0 if undefined)
    const rodLureSpeed = ITEM_DB[rodId].fishingStats.lure_speed
    const baitLureSpeed = baitId ? ITEM_DB[baitId].fishingStats.lure_speed : 0

    const totalLureSpeed = Math.min(100, rodLureSpeed + baitLureSpeed)
    console.log(rodId)

    // No Math.max(0) here, so negative speeds can increase the time infinitely
    const multiplier = 1 - totalLureSpeed / 100

    // We only use Math.max(1) at the very end to ensure
    // it never hits 0 or becomes a "teleporting" instant catch.
    return Math.max(1, waitTime * multiplier)
  }

  static buildFishTable(
    pool: DeepReadonly<WeightedTable<CatchableId>>,
    luck: number,
    ctx: {
      season: Season
      weather: Weather
      timeCycle: TimeCycle
      hour: number
    },
  ): DeepReadonly<WeightedTable<CatchableId>> {
    return {
      entries: pool.entries.map((entry) => {
        // 1. Ecology
        let weight = FishService.getFinalWeight(entry.weight, entry.id, ctx)

        // 2. Player luck + rarity
        weight = FishService.applyLuckAndRarity(weight, entry.id, luck)

        return {
          ...entry,
          weight: Math.max(0, weight),
        }
      }),
    }
  }

  static calculateTotalLuck(player: PlayerState, rodId: RodId, baitId?: BaitId): number {
    const rodLuck = ITEM_DB[rodId].fishingStats.luck
    const baitLuck = baitId ? ITEM_DB[baitId].fishingStats.luck : 0
    return player.luck + rodLuck + baitLuck
  }

  static calculateTotalControl(rodId: RodId, baitId?: BaitId): number {
    const rodControl = ITEM_DB[rodId].fishingStats.control
    const baitControl = baitId ? ITEM_DB[baitId].fishingStats.control : 0
    return rodControl + baitControl
  }

  static calculateTotalResilience(CatchableId: CatchableId, rodId: RodId, baitId?: BaitId): number {
    const catchableResilience = ITEM_DB[CatchableId].fishingStats.resilience
    const rodResilience = ITEM_DB[rodId].fishingStats.resilience
    const baitResilience = baitId ? ITEM_DB[baitId].fishingStats.resilience : 0
    return catchableResilience + rodResilience + baitResilience
  }

  static calculateTotalProgressSpeed(
    CatchableId: CatchableId,
    rodId: RodId,
    baitId?: BaitId,
  ): number {
    const catchableProgressSpeed = ITEM_DB[CatchableId].fishingStats.progress_speed
    const rodProgressSpeed = ITEM_DB[rodId].fishingStats.progress_speed
    const baitProgressSpeed = baitId ? ITEM_DB[baitId].fishingStats.progress_speed : 0
    return catchableProgressSpeed + rodProgressSpeed + baitProgressSpeed
  }
}
