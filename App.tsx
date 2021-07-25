/**
 * @author Muhammad Omran
 * @date 08-05-2021
 * @description implement the entry point of the app
 */

import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { enableScreens } from "react-native-screens";
import * as Font from "expo-font";
import { Provider } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";

import { store } from "./redux/store";
import { SplashScreen } from "./screens/splash";
import { TimerScreen } from "./screens/timer-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CONSTANTS } from "./utils/constants";
import { SuccessScreen } from "./screens/success-screen";
import { AddHabitScreen } from "./screens/add-habit-screen";
import { DashboardScreen } from "./screens/dashboard-screen";
import { Routes } from "./types/route-names";
import { IdentityReinforcement } from "./screens/identity-screen";
import { ViewHabitScreen } from "./screens/view-habit";
import { Drawer } from "./components/elements/drawer";
import { AnnouncementsScreen } from "./screens/announcements-screen";
enableScreens();

// TODO:: tmp to remove the non-sence firebase timer warning
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Setting a timer for a long period of time"]);

const { width, height } = Dimensions.get("screen");

/**
 * App Routing instance
 */
const Route = createStackNavigator();
const DrawerNav = createDrawerNavigator();

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
  const [playIntroduction, setPlayIntroduction] = useState<boolean>(false);

  useEffect(() => {
    const loadFonts = async () => {
      try {
        await Font.loadAsync(fonts);
        const firstTimer = await AsyncStorage.getItem(
          CONSTANTS.PLAY_INTRODUCTION_ASYNC_STORAGE_KEY
        );
        setPlayIntroduction(!!!firstTimer);
      } catch (err) {
        console.log("got error on initial load: ", err);
      }
      setLoading(false);
    };

    loadFonts();
  }, []);

  const completeIntro = () => {
    setPlayIntroduction(false);
    AsyncStorage.setItem(CONSTANTS.PLAY_INTRODUCTION_ASYNC_STORAGE_KEY, "true");
  };

  return loading ? (
    <></>
  ) : (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar style="light" />
        <Image source={require("./assets/bg.png")} style={styles.background} />
        <Route.Navigator
          screenOptions={{
            header: () => null,
            cardStyle: {
              backgroundColor: "transparent",
            },
          }}
          initialRouteName={
            playIntroduction ? Routes.SPLASH : Routes.HOME_ROUTE
          }
        >
          <Route.Screen name={Routes.HOME_ROUTE}>
            {() => (
              <DrawerNav.Navigator
                initialRouteName={Routes.HOME}
                drawerContent={(props) => <Drawer {...props} />}
                drawerStyle={{
                  backgroundColor: "transparent",
                  width: 0.81 * width,
                }}
                sceneContainerStyle={{
                  backgroundColor: "transparent",
                }}
                screenOptions={{
                  header: () => null,
                }}
              >
                <DrawerNav.Screen
                  name={Routes.HOME}
                  component={DashboardScreen}
                />
                <DrawerNav.Screen
                  name={Routes.ANNOUNCEMENTS}
                  component={AnnouncementsScreen}
                />
              </DrawerNav.Navigator>
            )}
          </Route.Screen>
          {playIntroduction && (
            <Route.Screen name={Routes.SPLASH} component={SplashScreen} />
          )}
          {playIntroduction && (
            <Route.Screen name={Routes.SUCCESS}>
              {(props) => (
                <SuccessScreen {...props} onCompleteIntro={completeIntro} />
              )}
            </Route.Screen>
          )}
          <Route.Screen
            name={Routes.IDENTITY_REINFORCEMENT}
            component={IdentityReinforcement}
          />
          <Route.Screen name={Routes.VIEW_HABIT} component={ViewHabitScreen} />
          <Route.Screen name={Routes.TIMER}>
            {(props) => (
              <TimerScreen {...props} isIntroduction={playIntroduction} />
            )}
          </Route.Screen>
          <Route.Screen name={Routes.ADD_HABIT}>
            {(props) => (
              <AddHabitScreen {...props} isIntroduction={playIntroduction} />
            )}
          </Route.Screen>
        </Route.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  background: {
    width,
    height,
    resizeMode: "cover",
    position: "absolute",
    top: 0,
    left: 0,
  },
});
