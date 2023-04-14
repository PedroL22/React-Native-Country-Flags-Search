import { useColorScheme } from 'react-native'
import { Center, Spinner } from 'native-base'

export function Loading() {
  const colorScheme = useColorScheme()

  return (
    <Center flex={1}>
      <Spinner color={colorScheme === 'dark' ? 'gray.200' : 'gray.500'} />
    </Center>
  )
}
