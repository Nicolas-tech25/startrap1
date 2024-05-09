// ./App.js
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesome } from "@expo/vector-icons";
import { StatusBar, View } from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import Cadastro from "./src/screens/Cadastro";
import Login from "./src/screens/Login";
import Home from "./src/screens/Home";
import Logout from "./src/components/Logout";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [isUserLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserLoggedIn(!!user);
    });
    return unsubscribe;
  }, []);


  if (!isUserLoggedIn) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Cadastro"
            component={Cadastro}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <>
      <StatusBar barStyle="black-content" />

      <NavigationContainer>
        <Tab.Navigator
          initialRouteName={isUserLoggedIn ? "Home" : "Login"}
          screenOptions={{
            // tabBarBadge: 3,
            tabBarStyle: {
              backgroundColor: "#FFFFFF",
              height: 65,
            },
            tabBarActiveBackgroundColor: "#f0f4f8",
            tabBarActiveTintColor: "#538dfd",
            tabBarInactiveTintColor: "#151515",
            tabBarLabelStyle: {
              fontSize: 14,
              fontWeight: "bold"
            },
          }}
        >
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
              tabBarIcon: ({ focused, size }) => (
                <FontAwesome name="home" size={27} color="#6f6f6f" />
              ),
            }}
          />
          <Tab.Screen
            name="Logout"
            component={Logout}
            options={{
              tabBarIcon: ({ focused, size }) => (
                <FontAwesome name="sign-out" size={27} color="#6f6f6f" />
              ),
              tabBarLabel: "Logout"
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}