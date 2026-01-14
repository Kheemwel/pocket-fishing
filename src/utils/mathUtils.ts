export function clamp(num: number, min: number, max: number) {
  return Math.min(Math.max(num, min), max)
}

export function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function randomFloat(min: number, max: number) {
  return min + Math.random() * (max - min)
}

export function formatGameTime(hour: number, minute: number): string {
  // 1. Determine period
  const period = hour >= 12 ? 'PM' : 'AM'

  // 2. Convert 0-23 hour to 12-hour format
  // (0 becomes 12, 13 becomes 1, etc.)
  let displayHour = hour % 12
  if (displayHour === 0) displayHour = 12

  // 3. Format minutes with leading zero (e.g., 5 -> "05")
  const displayMinutes = minute.toString().padStart(2, '0')

  return `${displayHour}:${displayMinutes} ${period}`
}
