// Note: Created using https://app.quicktype.io/?l=ts for time constraints, probably some better documentation on the API out there

export interface Rocket {
  id: number
  active: boolean
  stages: number
  boosters: number
  cost_per_launch: number
  success_rate_pct: number
  first_flight: Date
  country: string
  company: string
  height: Diameter
  diameter: Diameter
  mass: Mass
  payload_weights: PayloadWeight[]
  first_stage: FirstStage
  second_stage: SecondStage
  engines: Engines
  landing_legs: LandingLegs
  flickr_images: string[]
  wikipedia: string
  description: string
  rocket_id: string
  rocket_name: string
  rocket_type: string
}

export interface Diameter {
  meters: number | null
  feet: number | null
}

export interface Engines {
  number: number
  type: string
  version: string
  layout: null | string
  isp: ISP
  engine_loss_max: number | null
  propellant_1: string
  propellant_2: string
  thrust_sea_level: Thrust
  thrust_vacuum: Thrust
  thrust_to_weight: number
}

export interface ISP {
  sea_level: number
  vacuum: number
}

export interface Thrust {
  kN: number
  lbf: number
}

export interface FirstStage {
  reusable: boolean
  engines: number
  fuel_amount_tons: number
  burn_time_sec: number | null
  thrust_sea_level: Thrust
  thrust_vacuum: Thrust
  cores?: number
}

export interface LandingLegs {
  number: number
  material: null | string
}

export interface Mass {
  kg: number
  lb: number
}

export interface PayloadWeight {
  id: string
  name: string
  kg: number
  lb: number
}

export interface SecondStage {
  reusable: boolean
  engines: number
  fuel_amount_tons: number
  burn_time_sec: number | null
  thrust: Thrust
  payloads: Payloads
}

export interface Payloads {
  option_1: string
  composite_fairing: CompositeFairing
  option_2?: string
}

export interface CompositeFairing {
  height: Diameter
  diameter: Diameter
}
