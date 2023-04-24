import {
  TouchableOpacity,
  TouchableOpacityProps,
  useColorScheme,
} from 'react-native'
import { Box, Center, Image, Text } from 'native-base'

import { SpecificCountry } from '../../entities/CountryEntity'

require('number-to-locale-string-polyfill')

type CountryCardProps = TouchableOpacityProps & {
  country: SpecificCountry
}

export const CountryCard = ({ country, onPress }: CountryCardProps) => {
  const population = country?.population?.toLocaleString('en-US')

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
          onPress={onPress}
        >
          <Image
            source={{ uri: country?.flags?.png }}
            alt={`${country?.name?.common} flag`}
            resizeMode='cover'
            style={{ width: 400, height: 200 }}
          />
          <Box p={4}>
            <Text
              bold
              mb={4}
              color={colorScheme === 'dark' ? 'white' : 'black'}
            >
              {country?.name?.common}
            </Text>

            <Text color={colorScheme === 'dark' ? 'white' : 'black'}>
              <Text bold>Population:</Text> {population}
            </Text>

            <Text color={colorScheme === 'dark' ? 'white' : 'black'}>
              <Text bold>Region:</Text> {country?.continents}
            </Text>

            <Text color={colorScheme === 'dark' ? 'white' : 'black'}>
              <Text bold>Capital:</Text> {country?.capital}
            </Text>
          </Box>
        </TouchableOpacity>
      </Box>
    </Center>
  )
}
