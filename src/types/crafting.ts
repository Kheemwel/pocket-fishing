interface CraftIngredient {
  readonly itemId: string
  readonly amount: number
}

export interface CraftRecipe {
  readonly id: string
  readonly ingredients: CraftIngredient[]
  readonly results: CraftIngredient[]
}
