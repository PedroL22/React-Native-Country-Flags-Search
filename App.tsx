import { useColorScheme } from "react-native";
import { NativeBaseProvider, StatusBar } from "native-base";
import { Routes } from "./src/routes";
import { Loading } from "./src/components/Loading";
import { THEME } from "./src/styles/theme";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  const colorScheme = useColorScheme();

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded ? <Routes /> : <Loading />}
    </NativeBaseProvider>
  );
}
