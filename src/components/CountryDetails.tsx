import React, { useCallback, useState } from "react";
import { useColorScheme } from "react-native";
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

  const colorScheme = useColorScheme();

  return (
    <VStack
      flex={1}
      bgColor={colorScheme === "dark" ? "#1f2937" : "gray.200"}
      shadow={3}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <Center mx={6} my={4}>
          <Box
            bgColor={colorScheme === "dark" ? "#374151" : "white"}
            shadow={3}
          >
            <Box>
              <Image
                source={{ uri: details[0]?.flags?.png }}
                alt={`${details[0]?.name?.common} flag`}
                resizeMode="cover"
                style={{ width: 400, height: 200 }}
              />
            </Box>
            <Box p={10}>
              <Text
                bold
                mb={4}
                color={colorScheme === "dark" ? "white" : "black"}
              >
                {details[0]?.name?.common}
              </Text>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
              >
                <Box>
                  <Text color={colorScheme === "dark" ? "white" : "black"}>
                    <Text bold>Population:</Text> {population}
                  </Text>
                  <Text color={colorScheme === "dark" ? "white" : "black"}>
                    <Text bold>Region:</Text> {details[0]?.continents}
                  </Text>
                </Box>
                <Box maxWidth={100}>
                  <Text color={colorScheme === "dark" ? "white" : "black"}>
                    <Text bold>Capital:</Text> {details[0]?.capital}
                  </Text>
                  <Text color={colorScheme === "dark" ? "white" : "black"}>
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
