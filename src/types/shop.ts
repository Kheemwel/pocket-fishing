export interface ShopEntry {
  itemId: string
  price: number
  currency?: string
  stock?: number
}

export interface ShopDef {
  id: string
  entries: ShopEntry[]
}
