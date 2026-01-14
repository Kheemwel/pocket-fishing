import type { DeepReadonly } from '../deepReadOnly'
import type { Season, TimeCycle, Weather } from '../../types/world'

type SeasonTimeWeight = number | Partial<Record<TimeCycle, number>>
type WeatherRules = DeepReadonly<Record<Weather, Partial<Record<Season, SeasonTimeWeight>>>>

export const WEATHER_RULES: WeatherRules = {
  clear: {
    spring: 40, // Standard
    summer: 70, // High pressure, very common
    autumn: 45, // Often clear but hazy
    winter: { day: 40, night: 50 }, // Cold nights are often very clear
  },
  rainy: {
    spring: 60, // The "rainy Season"
    summer: 15, // Occasional afternoon showers
    autumn: 40, // Consistent drizzle
    winter: 0, // Too cold for rainy
  },
  stormy: {
    summer: 35, // Thunderstormy season
    autumn: 15, // Late-season gales
    spring: 10,
    winter: 0,
  },
  foggy: {
    autumn: 50, // "Foggy Autumn" is a classic trope
    spring: 20, // Morning mist
    winter: { day: 15, night: 30 },
    summer: 5, // Rare in heat
  },
  windy: {
    autumn: 40, // Falling leaves/strong winds
    spring: 30, // Changing seasons
    summer: 10,
    winter: { day: 20, night: 15 },
  },
  snowy: {
    winter: { day: 50, night: 40 }, // Frequent snow
  },
  blizzard: {
    // Blizzards are dangerous and should be rare but mostly happen at night
    winter: { day: 5, night: 20 },
  },
  aurora: {
    // Only visible in the dead of winter on the clearest nights
    winter: { night: 15 },
  },
}
