import { useQuery } from '@tanstack/react-query'

import { CountryEntity, SpecificCountry } from '../entities/CountryEntity'

import {
  requestAllCountries,
  requestCountryDetails,
} from '../clients/CountryClient'

export const useFetchAllCountries = () => {
  return useQuery<CountryEntity[]>(['ALL-COUNTRIES'], requestAllCountries)
}

export const useFetchCountryDetails = (name: string) => {
  return useQuery<SpecificCountry>(
    ['COUNTRIES-DETAILS', name],
    requestCountryDetails
  )
}
