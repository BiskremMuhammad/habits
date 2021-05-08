/**
 * @author Muhammad Omran
 * @date 08-05-2021
 * @description implement the entry point of the app
 */

import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { Provider } from "react-redux";
import { store } from "./redux/store";
import { SplashScreen } from "./screens/splash";
import { createStackNavigator } from "@react-navigation/stack";

/**
 * App Routing instance
 */
const Route = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar style="light" />
        <Route.Navigator
          screenOptions={{
            header: () => null,
          }}
        >
          <Route.Screen name="Splash" component={SplashScreen} />
        </Route.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
