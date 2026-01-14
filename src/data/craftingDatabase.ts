import type { CraftRecipe } from '@/types/crafting'

export const RECIPE_FISH_MEAL: CraftRecipe = {
  id: 'fish_meal',
  ingredients: [{ itemId: 'fish_carp', amount: 3 }],
  results: [{ itemId: 'bait_worm', amount: 5 }],
}
