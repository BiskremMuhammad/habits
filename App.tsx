/**
 * @author Muhammad Omran
 * @date 08-05-2021
 * @description implement the entry point of the app
 */

import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as Font from "expo-font";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { SplashScreen } from "./screens/splash";
import { createStackNavigator } from "@react-navigation/stack";

/**
 * App Routing instance
 */
const Route = createStackNavigator();

// import fonts
let fonts = {
  "JosefinSans-Regular": require("./assets/fonts/JosefinSans-Regular.ttf"),
  "JosefinSans-Medium": require("./assets/fonts/JosefinSans-Medium.ttf"),
  "JosefinSans-SemiBold": require("./assets/fonts/JosefinSans-SemiBold.ttf"),
  "JosefinSans-Bold": require("./assets/fonts/JosefinSans-Bold.ttf"),
  "Rubik-Light": require("./assets/fonts/Rubik-Light.ttf"),
  "Rubik-Regular": require("./assets/fonts/Rubik-Regular.ttf"),
  "Rubik-Medium": require("./assets/fonts/Rubik-Medium.ttf"),
  "Rubik-SemiBold": require("./assets/fonts/Rubik-SemiBold.ttf"),
  "Rubik-Bold": require("./assets/fonts/Rubik-Bold.ttf"),
  "Rubik-ExtraBold": require("./assets/fonts/Rubik-ExtraBold.ttf"),
};

export default function App() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync(fonts);
      setLoading(false);
    };

    loadFonts();
  }, []);

  return loading ? (
    <></>
  ) : (
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
