export const sizes = {
  tiny: { name: 'Tiny', valueMultiplier: 0.25 },
  small: { name: 'Small', valueMultiplier: 0.5 },
  regular: { name: 'Medium', valueMultiplier: 1 },
  large: { name: 'Large', valueMultiplier: 1.5 },
  giant: { name: 'Giant', valueMultiplier: 2 },
} as const

export const qualities = {
  stone: { name: 'Stone', valueMultiplier: 0.75 },
  standard: { name: 'Standard', valueMultiplier: 1 },
  pearl: { name: 'Pearl', valueMultiplier: 1.5 },
  crystal: { name: 'Crystal', valueMultiplier: 2.0 },
  star: { name: 'Star', valueMultiplier: 3 },
} as const

export const mutations = {
  corrupted: { name: 'Corrupted', valueMultiplier: 0.5 },
  none: { name: 'None', valueMultiplier: 1 },
  albino: { name: 'Albino', valueMultiplier: 1.1 },
  shiny: { name: 'Shiny', valueMultiplier: 2 },
} as const
