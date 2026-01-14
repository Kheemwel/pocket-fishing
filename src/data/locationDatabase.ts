import type { LocationDatabase } from '@/types/location'
import type { DeepReadonly } from './deepReadOnly'

export const LOCATION_DB: DeepReadonly<LocationDatabase> = {
  greenrock_town: {
    name: 'Greenrock Town',
    seasonMode: { type: 'global' },
    areas: {
      greenrock_lake: {
        name: 'Greenrock Lake',
        travelTimeFromOrigin: 20,
        catchables: ['fish_carp', 'fish_gold', 'junk_boot'],
      },
      greenrock_river: {
        name: 'Greenrock River',
        travelTimeFromOrigin: 15,
        catchables: [],
      },
      greenrock_beach: {
        name: 'Greenrock Beach',
        travelTimeFromOrigin: 0,
        catchables: [],
      },
      greenrock_cave: {
        name: 'Greenrock Cave',
        travelTimeFromOrigin: 30,
        catchables: [],
      },
      greenrock_shop: {
        travelTimeFromOrigin: 10,
        name: 'Greenrock Shop',
      },
    },
  },
  bluestone_isle: {
    name: 'Bluestone Isle',
    seasonMode: { type: 'fixed', season: 'winter' }, // arctic
    areas: {
      bluestone_isle_beach: {
        name: 'Bluestone Beach',
        travelTimeFromOrigin: 60,
        catchables: [],
      },
      bluestone_isle_cave: {
        name: 'Bluestone Cave',
        travelTimeFromOrigin: 65,
        catchables: [],
      },
    },
  },
  redwater_island: {
    name: 'Redwater Island',
    seasonMode: { type: 'fixed', season: 'summer' }, // tropical
    areas: {
      redwater_island_beach: {
        name: 'Redwater Beach',
        travelTimeFromOrigin: 90,
        catchables: [],
      },
      redwater_island_lagoon: {
        name: 'Redwater Lagoon',
        travelTimeFromOrigin: 100,
        catchables: [],
      },
      redwater_island_cave: {
        name: 'Redwater Cave',
        travelTimeFromOrigin: 120,
        catchables: [],
      },
    },
  },
}
