import type { MinigamePhase, MinigameResult } from '@/types/minigame'
import { clamp, randomFloat } from '@/utils/mathUtils'

export class MinigameManager {
  // ----- CONFIG -----
  readonly controlSize: number
  readonly warmupDuration = 1.0

  readonly controlAccel = 3.5 // faster response
  readonly controlMaxSpeed = 0.85 // can keep up with fast fish
  readonly controlDamping = 2.2 // less drag

  // ----- STATE -----
  phase: MinigamePhase = 'warmup'
  private warmupTimer = 0

  controlPos = 0
  fishPos = 0.5
  progress = 15

  private controlVelocity = 0

  // ----- FISH STATE -----
  private timeSinceLastFishMove = 0
  private fishMoveDuration = 0
  private fishMoveSpeed = 0

  private fishEscaped = false

  // ----- PROGRESS STATE -----
  private elapsedTime = 0

  readonly endDelay = 1
  private endTimer = 0
  private finalResult: MinigameResult = { type: 'fail' }

  constructor(
    controlPercent: number,
    /** Total resilience (already summed before passing in) */
    readonly resilience: number,
    /** Progress speed modifier (can be negative) */
    readonly progressSpeed: number,
  ) {
    this.controlSize = controlPercent / 100

    // start centered
    this.controlPos = (1 - this.controlSize) / 2
    this.fishPos = 0.5
  }

  // ============================================================
  // UPDATE LOOP
  // ============================================================

  update(dt: number, reelHeld: boolean): MinigameResult | null {
    if (this.phase === 'ended') {
      this.endTimer += dt
      if (this.endTimer >= this.endDelay) {
        return this.finalResult
      }
      return null
    }

    if (this.phase === 'warmup') {
      this.updateWarmup(dt)
      return null
    }

    this.updateControl(dt, reelHeld)
    this.updateFish(dt)
    this.updateProgress(dt)

    if (this.progress <= 0) {
      this.phase = 'ended'
      this.finalResult = { type: 'fail' }
    }

    if (this.progress >= 100) {
      this.phase = 'ended'
      this.finalResult = {
        type: 'success',
        perfect: !this.fishEscaped,
      }
    }

    return null
  }

  // ============================================================
  // WARMUP
  // ============================================================

  private updateWarmup(dt: number) {
    this.warmupTimer += dt
    if (this.phase === 'warmup' && this.warmupTimer >= this.warmupDuration) {
      this.phase = 'running'
      this.controlVelocity = 0
    }
  }

  // ============================================================
  // CONTROL BAR
  // ============================================================

  private updateControl(dt: number, reelHeld: boolean) {
    const dir = reelHeld ? 1 : -1

    this.controlVelocity += dir * this.controlAccel * dt
    this.controlVelocity = clamp(this.controlVelocity, -this.controlMaxSpeed, this.controlMaxSpeed)

    // damping
    this.controlVelocity -= this.controlVelocity * this.controlDamping * dt

    // const EPS = 0.0001
    // if (Math.abs(this.controlVelocity) < EPS) this.controlVelocity = 0

    this.controlPos += this.controlVelocity * dt

    const maxPos = 1 - this.controlSize
    this.controlPos = clamp(this.controlPos, 0, maxPos)

    if (this.controlPos === 0 || this.controlPos === maxPos) {
      this.controlVelocity = 0
    }
  }

  // ============================================================
  // FISH MOVEMENT (WIKI-ACCURATE)
  // ============================================================

  private updateFish(dt: number) {
    const res = Math.max(this.resilience / 100, 0.2)

    this.timeSinceLastFishMove += dt

    // rerolled every frame
    const interval = randomFloat(2 * res, 5.1 * res)

    // start new movement
    if (this.fishMoveDuration <= 0 && interval > this.timeSinceLastFishMove) {
      this.timeSinceLastFishMove = 0

      // movement duration
      const durRes = clamp(res, 0.1, 1.5)
      this.fishMoveDuration = randomFloat(1.3 * durRes, 3.5 * durRes)

      // distance
      let distance: number
      if (this.fishPos <= 0.05) {
        const r = clamp(res, 0.8, 1.4)
        distance = (randomFloat(9, 32) * r) / 100
      } else {
        const r = clamp(res, 0.8, 1.2)
        distance = (randomFloat(-40, 40) * r) / 100
      }

      this.fishMoveSpeed = distance / this.fishMoveDuration
    }

    // apply movement
    if (this.fishMoveDuration > 0) {
      this.fishMoveDuration -= dt
      this.fishPos += this.fishMoveSpeed * dt
    }

    this.fishPos = clamp(this.fishPos, 0.03, 0.9)
  }

  // ============================================================
  // PROGRESS
  // ============================================================

  private updateProgress(dt: number) {
    this.elapsedTime += dt

    const inside =
      this.fishPos >= this.controlPos && this.fishPos <= this.controlPos + this.controlSize

    if (!inside) this.fishEscaped = true

    // ----- progress speed (wiki formula) -----
    const p = this.progressSpeed
    const secondsToCatch = 1.2 + 6.8 / (1 + p / 100)
    const gainPerSecond = 100 / secondsToCatch

    // ----- progress loss -----
    const res = Math.max(this.resilience / 100, 0.2)
    const fps = 60
    const extraLoss = 0.0017 * res * this.elapsedTime * fps

    const lossPerSecond = 12 + extraLoss

    const delta = inside ? gainPerSecond * dt : -lossPerSecond * dt

    this.progress = clamp(this.progress + delta, 0, 100)
  }
}
