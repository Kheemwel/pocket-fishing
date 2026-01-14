import type { Dispatcher } from '@/core/Dispatcher'
import { MinigameManager } from '@/managers/MinigameManager'
import type { MinigamePhase, MinigameResult } from '@/types/minigame'
import { defineStore } from 'pinia'
import { computed, inject, ref } from 'vue'

export const useFishingMinigameStore = defineStore('minigame', () => {
  const dispatcher = inject<{ dispatcher: Dispatcher }>('game')?.dispatcher
  // ----- REACTIVE STATE -----
  const active = ref(false)

  // exposed to UI
  const controlPos = ref(0.5)
  const controlSize = ref(0)
  const fishPos = ref(0.5)
  const progress = ref(0)
  const progressSpeed = ref(0)

  // input
  const reelHeld = ref(false)

  // internal (NOT reactive)
  let controller: MinigameManager | null = null
  const phase = ref<MinigamePhase>()

  // ----- ACTIONS -----
  function start(payload: { controlPercent: number; resilience: number; progressSpeed: number }) {
    controller = new MinigameManager(
      payload.controlPercent,
      payload.resilience,
      payload.progressSpeed,
    )

    progressSpeed.value = payload.progressSpeed

    active.value = true
    syncFromController()
  }

  function stop() {
    active.value = false
    reelHeld.value = false // <<< reset input
    controller = null
  }

  function update(dt: number) {
    if (!active.value || !controller) return

    phase.value = controller.phase

    const result = controller.update(dt, reelHeld.value)

    syncFromController()

    if (result) {
      handleResult(result)
    }
  }

  function setReelHeld(held: boolean) {
    reelHeld.value = held
  }

  // ----- INTERNAL HELPERS -----
  function syncFromController() {
    if (!controller) return

    controlPos.value = controller.controlPos
    controlSize.value = controller.controlSize
    fishPos.value = controller.fishPos
    progress.value = controller.progress
  }

  function handleResult(result: MinigameResult) {
    stop()

    dispatcher?.dispatch({
      type: 'minigameEnd',
      payload: {
        success: result.type == 'success',
        isPerfect: result.type === 'success' ? result.perfect : false,
      },
    })

    console.log('Minigame result:', result)
  }

  // ----- OPTIONAL COMPUTEDS -----
  const controlLeftPercent = computed(() => controlPos.value * 100)
  const controlWidthPercent = computed(() => controlSize.value * 100)
  const fishLeftPercent = computed(() => fishPos.value * 100)

  return {
    // state
    active,
    controlPos,
    controlSize,
    fishPos,
    progress,
    phase,
    progressSpeed,

    // input
    reelHeld,

    // actions
    start,
    stop,
    update,
    setReelHeld,

    // ui helpers
    controlLeftPercent,
    controlWidthPercent,
    fishLeftPercent,
  }
})
