import type { QuestDef } from '@/types/quest'

export const QUEST_CARP_HUNT: QuestDef = {
  id: 'quest_carp_hunt',
  objectives: [{ type: 'collect', itemId: 'fish_carp', amount: 5 }],
  rewards: [{ itemId: 'bait_worm', amount: 10 }],
}
