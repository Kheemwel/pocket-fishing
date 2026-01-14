type UpdateFn = (dt: number) => void

export class GameLoop {
  private lastTime = 0
  private running = false
  private updateFn: UpdateFn

  constructor(updateFn: UpdateFn) {
    this.updateFn = updateFn
  }

  start() {
    if (this.running) return
    this.running = true
    this.lastTime = performance.now()
    requestAnimationFrame(this.loop)
  }

  stop() {
    this.running = false
  }

  private loop = (time: number) => {
    if (!this.running) return

    const dt = (time - this.lastTime) / 1000
    this.lastTime = time

    this.updateFn(dt)

    requestAnimationFrame(this.loop)
  }
}
