export type HapticPattern = 'light' | 'medium' | 'success' | 'error'

const PATTERNS: Record<HapticPattern, number | number[]> = {
  light:   10,
  medium:  30,
  success: [10, 50, 10],
  error:   [50, 30, 50],
}

export function haptic(pattern: HapticPattern = 'light'): void {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    navigator.vibrate(PATTERNS[pattern])
  }
}
