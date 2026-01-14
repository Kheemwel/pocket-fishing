export type RarityId = 'trash' | 'common' | 'rare' | 'legendary' | 'mythical' | 'exotic' | 'secret'

export interface Rarity {
  name: string
  order: number
  luckMultiplier: number
}
