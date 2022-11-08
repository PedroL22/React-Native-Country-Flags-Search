import React, { useCallback, useEffect, useState } from "react";
import { FlatList, Text, useToast, VStack } from "native-base";
import { useFocusEffect } from "@react-navigation/native";
import { api } from "../services/api";
import { Loading } from "../components/Loading";
import CountryCard from "../components/CountryCard";

export function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState([]);

  const toast = useToast();

  async function fetchList() {
    try {
      setIsLoading(true);

      const response = await api.get("/all");
      setList(response.data);
    } catch (error) {
      console.log(error);
      toast.show({
        title: "Não foi possível carregar os bolões.",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchList();
    }, [])
  );

  return (
    <VStack flex={1} bgColor={"gray.200"}>
      <Text>Country Flags Search</Text>

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={list}
          keyExtractor={(item) => item.name.common}
          renderItem={({ item }) => <CountryCard data={item} />}
          showsVerticalScrollIndicator={false}
          initialNumToRender={10}
        />
      )}
    </VStack>
  );
}
