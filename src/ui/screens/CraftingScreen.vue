<script setup lang="ts">
import { usePlayerStateStore } from '@/stores/playerStateStore'
import { RECIPE_FISH_MEAL } from '@/data/craftingDatabase'
import { ITEM_DB } from '@/data/item/itemDatabase'
import type { CraftRecipe } from '@/types/crafting'

const playerState = usePlayerStateStore()

function hasIngredients(recipe: CraftRecipe) {
  return recipe.ingredients.every((ingredient) => {
    const playerItem = playerState.items.find((item) => item.itemId === ingredient.itemId)
    return playerItem && playerItem.quantity >= ingredient.amount
  })
}

function craftItem(recipe: CraftRecipe) {
  if (!hasIngredients(recipe)) {
    return
  }

  recipe.ingredients.forEach((ingredient) => {
    playerState.removeItem({
      itemId: ingredient.itemId,
      quantity: ingredient.amount,
    })
  })

  recipe.results.forEach((result) => {
    playerState.addItem({
      itemId: result.itemId,
      quantity: result.amount,
    })
  })
}
</script>

<template>
  <div class="crafting-screen">
    <h1>Crafting</h1>
    <div class="recipe">
      <h2>Fish Meal</h2>
      <p>Ingredients:</p>
      <ul>
        <li v-for="ingredient in RECIPE_FISH_MEAL.ingredients" :key="ingredient.itemId">
          {{ ITEM_DB[ingredient.itemId].name }} x{{ ingredient.amount }}
        </li>
      </ul>
      <p>Results:</p>
      <ul>
        <li v-for="result in RECIPE_FISH_MEAL.results" :key="result.itemId">
          {{ ITEM_DB[result.itemId].name }} x{{ result.amount }}
        </li>
      </ul>
      <button :disabled="!hasIngredients(RECIPE_FISH_MEAL)" @click="craftItem(RECIPE_FISH_MEAL)">
        Craft
      </button>
    </div>
  </div>
</template>

<style scoped></style>
