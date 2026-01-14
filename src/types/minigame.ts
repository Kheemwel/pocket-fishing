export type MinigamePhase = 'warmup' | 'running' | 'ended'

export type MinigameResult = { type: 'success'; perfect: boolean } | { type: 'fail' }
