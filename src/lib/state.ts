export const stateCodes = ["AUK", "WLG", "WAI", "CHC", "TAS"] as const

export type State = (typeof stateCodes)[number]

export const stateTax: Record<State, number> = {
  AUK: 0.0685,
  WLG: 0.08,
  WAI: 0.0625,
  CHC: 0.04,
  TAS: 0.0825,
} as const
