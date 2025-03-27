// Note: Created using https://app.quicktype.io/?l=ts for time constraints, probably some better documentation on the API out there

export interface Launch {
  flight_number: number
  mission_name: string
  mission_id: string[]
  upcoming: boolean
  launch_year: string
  launch_date_unix: number
  launch_date_utc: Date
  launch_date_local: Date
  is_tentative: boolean
  tentative_max_precision: TentativeMaxPrecision
  tbd: boolean
  launch_window: number | null
  rocket: Rocket
  ships: string[]
  telemetry: Telemetry
  launch_site: LaunchSite
  launch_success: boolean | null
  launch_failure_details?: LaunchFailureDetails
  links: Links
  details: null | string
  static_fire_date_utc: Date | null
  static_fire_date_unix: number | null
  timeline: { [key: string]: number | null } | null
  crew: any[] | null
  last_date_update?: Date
  last_ll_launch_date?: Date | null
  last_ll_update?: Date | null
  last_wiki_launch_date?: Date
  last_wiki_revision?: string
  last_wiki_update?: Date
  launch_date_source?: LaunchDateSource
}

export type LaunchDateSource = 'wiki' | 'launch_library'

export interface LaunchFailureDetails {
  time: number
  altitude: number | null
  reason: string
}

export interface LaunchSite {
  site_id: SiteID
  site_name: SiteName
  site_name_long: SiteNameLong
}

export type SiteID = 'kwajalein_atoll' | 'ccafs_slc_40' | 'vafb_slc_4e' | 'ksc_lc_39a'

export type SiteName = 'Kwajalein Atoll' | 'CCAFS SLC 40' | 'VAFB SLC 4E' | 'KSC LC 39A'

export type SiteNameLong =
  | 'Kwajalein Atoll Omelek Island'
  | 'Cape Canaveral Air Force Station Space Launch Complex 40'
  | 'Vandenberg Air Force Base Space Launch Complex 4E'
  | 'Kennedy Space Center Historic Launch Complex 39A'

export interface Links {
  mission_patch: null | string
  mission_patch_small: null | string
  reddit_campaign: null | string
  reddit_launch: null | string
  reddit_recovery: null | string
  reddit_media: null | string
  presskit: null | string
  article_link: null | string
  wikipedia: null | string
  video_link: null | string
  youtube_id: null | string
  flickr_images: string[]
}

export interface Rocket {
  rocket_id: RocketID
  rocket_name: RocketName
  rocket_type: RocketType
  first_stage: FirstStage
  second_stage: SecondStage
  fairings: Fairings | null
}

export interface Fairings {
  reused: boolean | null
  recovery_attempt: boolean | null
  recovered: boolean | null
  ship: Ship | null
}

export type Ship = 'GOMSTREE' | 'GOSEARCHER' | 'GOMSCHIEF'

export interface FirstStage {
  cores: Core[]
}

export interface Core {
  core_serial: null | string
  flight: number | null
  block: number | null
  gridfins: boolean | null
  legs: boolean | null
  reused: boolean | null
  land_success: boolean | null
  landing_intent: boolean | null
  landing_type: LandingType | null
  landing_vehicle: LandingVehicle | null
}

export type LandingType = 'Ocean' | 'ASDS' | 'RTLS'

export type LandingVehicle = 'JRTI-1' | 'OCISLY' | 'LZ-1' | 'JRTI' | 'LZ-2' | 'LZ-4'

export type RocketID = 'falcon1' | 'falcon9' | 'falconheavy'

export type RocketName = 'Falcon 1' | 'Falcon 9' | 'Falcon Heavy'

export type RocketType = 'Merlin A' | 'Merlin C' | 'v1.0' | 'v1.1' | 'FT'

export interface SecondStage {
  block: number | null
  payloads: Payload[]
}

export interface Payload {
  payload_id: string
  norad_id: number[]
  reused: boolean
  customers: string[]
  nationality?: string
  manufacturer?: null | string
  payload_type: PayloadType
  payload_mass_kg: number | null
  payload_mass_lbs: number | null
  orbit: string
  orbit_params: OrbitParams
  cap_serial?: string
  mass_returned_kg?: number | null
  mass_returned_lbs?: number | null
  flight_time_sec?: number | null
  cargo_manifest?: null | string
  uid?: string
}

export interface OrbitParams {
  reference_system: ReferenceSystem | null
  regime: Regime | null
  longitude: number | null
  semi_major_axis_km: number | null
  eccentricity: number | null
  periapsis_km: number | null
  apoapsis_km: number | null
  inclination_deg: number | null
  period_min: number | null
  lifespan_years: number | null
  epoch: Date | null
  mean_motion: number | null
  raan: number | null
  arg_of_pericenter?: number | null
  mean_anomaly?: number | null
}

export type ReferenceSystem = 'geocentric' | 'heliocentric' | 'highly-elliptical'

export type Regime =
  | 'low-earth'
  | 'geostationary'
  | 'L1-point'
  | 'geosynchronous'
  | 'sun-synchronous'
  | 'high-earth'
  | 'semi-synchronous'
  | 'highly-elliptical'
  | 'very-low-earth'
  | 'medium-earth'
  | 'sub-orbital'

export type PayloadType =
  | 'Satellite'
  | 'Dragon Boilerplate'
  | 'Dragon 1.0'
  | 'Dragon 1.1'
  | 'Lander'
  | 'Crew Dragon'
  | 'Dragon 2.0'

export interface Telemetry {
  flight_club: null | string
}

export type TentativeMaxPrecision = 'hour'
