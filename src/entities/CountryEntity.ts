export type SpecificCountry = {
  name: {
    common: string
    official: string
    nativeName?: Record<string, { official: string; common: string }>
  }
  population?: number
  capital?: string
  flags?: {
    svg: string
    png: string
  }
  timezones?: string[]
  continents?: string[]
  fifa: string
  [key: number]: any
}

export type CountryEntity = {
  name: {
    common: string
    official: string
    nativeName?: Record<string, { official: string; common: string }>
  }
  population?: number
  capital?: string
  flags?: {
    svg: string
    png: string
  }
  timezones?: string[]
  continents?: string[]
  fifa: string
}
