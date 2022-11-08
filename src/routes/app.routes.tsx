import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../screens/Home";
import { CountryDetails } from "../components/CountryDetails";

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  return (
    <Navigator>
      <Screen
        name="home"
        component={Home}
        options={{ tabBarButton: () => null }}
      />
      <Screen
        name="details"
        component={CountryDetails}
        options={{ tabBarButton: () => null }}
      />
    </Navigator>
  );
}
