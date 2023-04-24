import axios from 'axios'
import { QueryFunctionContext } from '@tanstack/react-query'

import { CountryEntity, SpecificCountry } from '../entities/CountryEntity'

export const requestAllCountries = async () => {
  const { data } = await axios.request<CountryEntity[]>({
    baseURL: 'https://restcountries.com/v3.1/all',
    method: 'GET',
  })

  return data
}

export const requestCountryDetails = async (context: QueryFunctionContext) => {
  const [, name] = context.queryKey

  const { data } = await axios.request<SpecificCountry>({
    baseURL: `https://restcountries.com/v3.1/name/${name}`,
    method: 'GET',
  })

  return data
}
