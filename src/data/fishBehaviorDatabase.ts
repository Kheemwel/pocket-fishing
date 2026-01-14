import type { CatchProfile } from '@/types/catch'
import type { CatchableId } from '@/types/item'

export const FISH_BEHAVIOR_DB: Record<CatchableId, CatchProfile> = {
  fish_carp: {
    modifiers: [
      {
        when: {
          weather: ['rainy'],
          timeCycle: ['day'],
          timeRange: [{ startHour: 6, endHour: 18 }],
        },
        multiplier: 1.5,
      },
      {
        when: { season: ['winter'] },
        multiplier: 0.7,
      },
    ],
  },

  fish_gold: {
    modifiers: [
      {
        when: { timeCycle: ['night'], weather: ['clear'] },
        multiplier: 2.0,
      },
    ],
  },
  junk_boot: {
    modifiers: [
      {
        when: { weather: ['rainy'] },
        multiplier: 1.5,
      },
      {
        when: { weather: ['stormy'] },
        multiplier: 2.5,
      },
    ],
  },
}
