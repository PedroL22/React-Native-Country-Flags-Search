import React, { useCallback, useState } from "react";
import { Box, Center, Image, Text, useToast, VStack } from "native-base";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { api } from "../services/api";
import { Loading } from "../components/Loading";
import { Card } from "./CountryCard";
require("number-to-locale-string-polyfill");

interface RouteParams {
  name: string;
}

export function CountryDetails() {
  const [isLoading, setIsLoading] = useState(true);
  const [details, setDetails] = useState<Card>({} as Card);

  const toast = useToast();
  const route = useRoute();

  const { name } = route.params as RouteParams;

  async function fetchDetails() {
    try {
      setIsLoading(true);

      const response = await api.get(`/name/${name}`);
      setDetails(response.data);
    } catch (error) {
      console.log(error);
      toast.show({
        title: "It was not possible to load the country details.",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchDetails();
    }, [name])
  );

  const population = details[0]?.population.toLocaleString("en-US");

  return (
    <VStack flex={1} bgColor={"gray.200"}>
      {isLoading ? (
        <Loading />
      ) : (
        <Center mx={6} my={4}>
          <Box bgColor="white" shadow={3}>
            <Box>
              <Image
                source={{ uri: details[0]?.flags?.png }}
                alt={`${details[0]?.name?.common} flag`}
                resizeMode="cover"
                style={{ width: 400, height: 200 }}
              />
            </Box>
            <Box p={10}>
              <Text bold mb={4}>
                {details[0]?.name?.common}
              </Text>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
              >
                <Box>
                  <Text>
                    <Text bold>Population:</Text> {population}
                  </Text>
                  <Text>
                    <Text bold>Region:</Text> {details[0]?.continents}
                  </Text>
                </Box>
                <Box>
                  <Text>
                    <Text bold>Capital:</Text> {details[0]?.capital}
                  </Text>
                  <Text>
                    <Text bold>Timezones:</Text> {details[0]?.timezones}
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
        </Center>
      )}
    </VStack>
  );
}
