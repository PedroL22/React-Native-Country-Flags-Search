import React, { memo } from 'react'
import {
  TouchableOpacity,
  TouchableOpacityProps,
  useColorScheme,
} from 'react-native'
import { Box, Center, Image, Text } from 'native-base'

require('number-to-locale-string-polyfill')

export type Card = {
  name: { common: string }
  flags: { png: string }
  population: number
  continents: string
  capital: string
}

type Props = TouchableOpacityProps & {
  data: Card
}

const CountryCard = ({ data, ...rest }: Props) => {
  const population = data.population.toLocaleString('en-US')

  const colorScheme = useColorScheme()

  return (
    <Center
      mx={6}
      my={3}
    >
      <Box
        bgColor={colorScheme === 'dark' ? '#374151' : 'white'}
        shadow={3}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          {...rest}
        >
          <Image
            source={{ uri: data.flags.png }}
            alt={`${data.name.common} flag`}
            resizeMode='cover'
            style={{ width: 400, height: 200 }}
          />
          <Box p={4}>
            <Text
              bold
              mb={4}
              color={colorScheme === 'dark' ? 'white' : 'black'}
            >
              {data.name.common}
            </Text>

            <Text color={colorScheme === 'dark' ? 'white' : 'black'}>
              <Text bold>Population:</Text> {population}
            </Text>

            <Text color={colorScheme === 'dark' ? 'white' : 'black'}>
              <Text bold>Region:</Text> {data.continents}
            </Text>

            <Text color={colorScheme === 'dark' ? 'white' : 'black'}>
              <Text bold>Capital:</Text> {data.capital}
            </Text>
          </Box>
        </TouchableOpacity>
      </Box>
    </Center>
  )
}

export default memo(CountryCard)
