import React, { useCallback, useState } from 'react'
import { useColorScheme } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { api } from '../../services/api'

import { FlatList, Input, useToast, VStack } from 'native-base'
import CountryCard from '../../components/CountryCard'
import { Loading } from '../../components/Loading'

export function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [filteredData, setFilteredData] = useState([])
  const [masterData, setMasterData] = useState([])
  const [search, setSearch] = useState('')

  const searchFilter = (text: string) => {
    if (text) {
      const newData = masterData.filter((item) => {
        const itemData = item.name.common
        const textData = text

        return itemData.indexOf(textData) > -1
      })
      setFilteredData(newData)
      setSearch(text)
    } else {
      setFilteredData(masterData)
      setSearch(text)
    }
  }

  const { navigate } = useNavigation()
  const toast = useToast()

  async function fetchList() {
    try {
      setIsLoading(true)

      const response = await api.get('/all')
      setFilteredData(response.data)
      setMasterData(response.data)
    } catch (error) {
      console.log(error)
      toast.show({
        title: 'It was not possible to load the countries.',
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchList()
    }, [])
  )

  const colorScheme = useColorScheme()

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
        value={search}
        onChangeText={(text) => searchFilter(text)}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.name.common}
          renderItem={({ item }) => (
            <CountryCard
              data={item}
              onPress={() => navigate('details', { name: item.name.official })}
            />
          )}
          showsVerticalScrollIndicator={false}
          initialNumToRender={10}
        />
      )}
    </VStack>
  )
}
