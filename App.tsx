/**
 * @author Muhammad Omran
 * @date 08-05-2021
 * @description implement the entry point of the app
 */

import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, I18nManager } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { enableScreens } from "react-native-screens";
import * as Font from "expo-font";
import { Provider } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";

import { store } from "./redux/store";
import { SplashScreen } from "./screens/splash";
import { TimerScreen } from "./screens/timer-screen";
import { CONSTANTS } from "./utils/constants";
import { SuccessScreen } from "./screens/success-screen";
import { AddHabitScreen } from "./screens/add-habit-screen";
import { DashboardScreen } from "./screens/dashboard-screen";
import { Routes } from "./types/route-names";
import { IdentityReinforcement } from "./screens/identity-screen";
import { ViewHabitScreen } from "./screens/view-habit";
import { Drawer } from "./components/elements/drawer";
import { AnnouncementsScreen } from "./screens/announcements-screen";
import { PushNotification } from "./utils/push-notification";
import { Modal } from "./components/modules/modals/modal";
import { RequestNotificationAccessModal } from "./components/modules/modals/request-notification-access-modal";
import { LogBox } from "react-native";
const ignoreWarns = ["AsyncStorage has been extracted from react-native"];

const warn = console.warn;

console.warn = (...arg) => {
  for (const warning of ignoreWarns) {
    if (arg[0].startsWith(warning)) {
      return;
    }
  }
  warn(...arg);
};

LogBox.ignoreLogs(ignoreWarns);
LogBox.ignoreLogs(["Setting a timer for a long period of time"]);
enableScreens();

const { width, height } = Dimensions.get("screen");

// disable RTL
try {
  I18nManager.allowRTL(false);
  I18nManager.forceRTL(false);
  I18nManager.swapLeftAndRightInRTL(false);
} catch (e) {
  console.log(e);
}

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

// support for notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [playIntroduction, setPlayIntroduction] = useState<boolean>(false);
  const [notificationModalOpened, setNotificationModalVisibility] =
    useState<boolean>(false);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      await Font.loadAsync(fonts);
      const firstTimer = await AsyncStorage.getItem(
        CONSTANTS.PLAY_INTRODUCTION_ASYNC_STORAGE_KEY
      );
      setPlayIntroduction(!!!firstTimer); // triple ! to get the inverted value if string was found
      // if it's not introduction (which means string has been found)
      //  >> trigger notification permission
      if (!!firstTimer) {
        const granted: boolean =
          !!(await PushNotification.registerForPushNotificationsAsync(false));
        const notificationModalFirstTime: boolean =
          !!!(await AsyncStorage.getItem(
            CONSTANTS.NOTIFICATION_MODAL_DISMISSED_STORAGE_KEY
          ));
        setNotificationModalVisibility(!granted || notificationModalFirstTime);
      }
    } catch (err) {
      console.log("got error on initial load: ", err);
    }
    setLoading(false);
  };

  const onNotificationModalDismissed = () => {
    setNotificationModalVisibility(false);
  };

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
            // temp disable drawer and annoucements navigation
            // playIntroduction ? Routes.SPLASH : Routes.HOME_ROUTE
            playIntroduction ? Routes.SPLASH : Routes.HOME
          }
        >
          {/* <Route.Screen name={Routes.HOME_ROUTE}>
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
          </Route.Screen> */}
          <DrawerNav.Screen name={Routes.HOME} component={DashboardScreen} />
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
      {notificationModalOpened && (
        <Modal fadeDuration={1000} delayAnimation={1000}>
          <RequestNotificationAccessModal
            callback={onNotificationModalDismissed}
          />
        </Modal>
      )}
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
