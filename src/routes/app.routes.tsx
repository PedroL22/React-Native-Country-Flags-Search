import { useColorScheme } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../screens/Home";
import { CountryDetails } from "../components/CountryDetails";

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  const colorScheme = useColorScheme();

  return (
    <Navigator
      screenOptions={{
        headerShown: true,
        tabBarLabel: "Country Search Flags",
        tabBarStyle: {
          height: 0,
        },
        headerStyle: {
          backgroundColor: colorScheme === "dark" ? "#374151" : "white",
        },
        headerTintColor: colorScheme === "dark" ? "white" : "black",
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{ tabBarButton: () => null, title: "Country Search" }}
      />
      <Screen
        name="details"
        component={CountryDetails}
        options={{ tabBarButton: () => null, title: "Details" }}
      />
    </Navigator>
  );
}
