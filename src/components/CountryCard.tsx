import React, { memo } from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Box, Center, Image, Text } from "native-base";
require("number-to-locale-string-polyfill");

export interface Card {
  name: { common: string };
  flags: { png: string };
  population: number;
  continents: string;
  capital: string;
}

interface Props extends TouchableOpacityProps {
  data: Card;
}

const CountryCard = ({ data, ...rest }: Props) => {
  const population = data.population.toLocaleString("en-US");

  return (
    <Center mx={6} my={4}>
      <Box bgColor="white" shadow={3}>
        <TouchableOpacity activeOpacity={0.7}>
          <Image
            source={{ uri: data.flags.png }}
            alt={`${data.name.common} flag`}
            resizeMode="cover"
            style={{ width: 400, height: 200 }}
          />
          <Box p={4}>
            <Text bold mb={4}>
              {data.name.common}
            </Text>

            <Text>
              <Text bold>Population:</Text> {population}
            </Text>

            <Text>
              <Text bold>Region:</Text> {data.continents}
            </Text>

            <Text>
              <Text bold>Capital:</Text> {data.capital}
            </Text>
          </Box>
        </TouchableOpacity>
      </Box>
    </Center>
  );
};

export default memo(CountryCard);
