import { config } from './config'

export type HapticPattern = keyof typeof config.haptics

export function haptic(pattern: HapticPattern = 'light'): void {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    navigator.vibrate(config.haptics[pattern])
  }
}
