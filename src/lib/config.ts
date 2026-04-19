/**
 * Central app configuration.
 * All tunable values live here — import from this file, never hardcode elsewhere.
 */
export const config = {

  /**
   * Haptic feedback durations (ms) via navigator.vibrate().
   * Duration controls perceived intensity on most devices.
   *
   * Patterns:
   *   light   — subtle tap (toggles, navigation)
   *   medium  — noticeable bump (confirms, selections)
   *   success — double-pulse (entry saved, goal hit)
   *   error   — heavy double-pulse (validation fail, destructive action)
   */
  haptics: {
    light:   10,
    medium:  25,
    strong:  60,
    success: [12, 40, 12] as number[],
    error:   [40, 30, 40] as number[],
  },

} as const
