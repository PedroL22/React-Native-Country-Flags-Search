import { useColorScheme } from 'react-native'
import { useRoute } from '@react-navigation/native'

import { Box, Center, Image, Text, useToast, VStack } from 'native-base'
import { Loading } from '../../components/Loading'

import { useFetchCountryDetails } from '../../hooks/useQueryCountries'

require('number-to-locale-string-polyfill')

type RouteParams = {
  name: string
}

export const CountryDetails = () => {
  const route = useRoute()
  const { name } = route.params as RouteParams
  const toast = useToast()
  const colorScheme = useColorScheme()

  const { data, isLoading, isError } = useFetchCountryDetails(name)

  if (isError) {
    toast.show({
      title: 'It was not possible to load the country details.',
      placement: 'top',
      bgColor: 'red.500',
    })
  }

  return (
    <VStack
      flex={1}
      bgColor={colorScheme === 'dark' ? '#1f2937' : 'gray.200'}
      shadow={3}
    >
      {isLoading ? (
        <Loading />
      ) : (
        data && (
          <Center
            mx={6}
            my={4}
          >
            <Box
              bgColor={colorScheme === 'dark' ? '#374151' : 'white'}
              shadow={3}
            >
              <Box>
                <Image
                  source={{ uri: data[0]?.flags?.png }}
                  alt={`${data[0]?.name?.common} flag`}
                  resizeMode='cover'
                  style={{ width: 400, height: 200 }}
                />
              </Box>
              <Box p={10}>
                <Text
                  bold
                  mb={4}
                  color={colorScheme === 'dark' ? 'white' : 'black'}
                >
                  {data[0]?.name?.common}
                </Text>
                <Box
                  display='flex'
                  flexDirection='row'
                  justifyContent='space-between'
                >
                  <Box>
                    <Text color={colorScheme === 'dark' ? 'white' : 'black'}>
                      <Text bold>Population:</Text>
                      {data[0]?.population?.toLocaleString('en-US')}
                    </Text>
                    <Text color={colorScheme === 'dark' ? 'white' : 'black'}>
                      <Text bold>Region:</Text> {data[0]?.continents}
                    </Text>
                  </Box>
                  <Box maxWidth={100}>
                    <Text color={colorScheme === 'dark' ? 'white' : 'black'}>
                      <Text bold>Capital:</Text> {data[0]?.capital}
                    </Text>
                    <Text color={colorScheme === 'dark' ? 'white' : 'black'}>
                      <Text bold>Timezones:</Text> {data[0]?.timezones}
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Center>
        )
      )}
    </VStack>
  )
}
