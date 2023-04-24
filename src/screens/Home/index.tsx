import { useState } from 'react'
import { useColorScheme } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { FlashList } from '@shopify/flash-list'

import { useFetchAllCountries } from '../../hooks/useQueryCountries'

import { Input, useToast, VStack } from 'native-base'
import { CountryCard } from '../../components/CountryCard'
import { Loading } from '../../components/Loading'

export const Home = () => {
  const { navigate } = useNavigation()
  const toast = useToast()
  const colorScheme = useColorScheme()

  const { data, isLoading, isError } = useFetchAllCountries()
  const [query, setQuery] = useState('')

  const countriesSearched = data
    ? data.filter((country) =>
        country.name.common.toLowerCase().includes(query.toLowerCase())
      )
    : []

  if (isError) {
    return toast.show({
      title: 'It was not possible to load the countries.',
      placement: 'top',
      bgColor: 'red.500',
    })
  }

  return (
    <VStack
      flex={1}
      bgColor={colorScheme === 'dark' ? '#1f2937' : 'gray.200'}
    >
      <Input
        mx={6}
        mt={3}
        variant='filled'
        placeholder='Search for a country...'
        focusOutlineColor={colorScheme === 'dark' ? '#374151' : 'gray.400'}
        bgColor={colorScheme === 'dark' ? '#374151' : 'gray.100'}
        color={colorScheme === 'dark' ? 'white' : 'black'}
        _focus={{ bgColor: colorScheme === 'dark' ? '#374151' : 'gray.100' }}
        borderColor='transparent'
        onChange={(e) => setQuery(e.nativeEvent.text)}
        value={query}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <FlashList
          data={countriesSearched}
          keyExtractor={(item) => item.name.common}
          renderItem={({ item }) => (
            <CountryCard
              country={item}
              onPress={() => {
                navigate('details', { name: item.name.official })
              }}
            />
          )}
          showsVerticalScrollIndicator={false}
          estimatedItemSize={350}
        />
      )}
    </VStack>
  )
}
