interface QuestObjective {
  type: 'collect' | 'deliver'
  itemId: string
  amount: number
}

interface QuestReward {
  itemId: string
  amount: number
}

export interface QuestDef {
  id: string
  objectives: QuestObjective[]
  rewards: QuestReward[]
}
