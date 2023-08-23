/**
 * @author Muhammad Omran
 * @date 15-05-2021
 * @description implement the timer Screen
 */

import React, {
  Dispatch,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  Platform,
  Pressable,
  AppState,
} from "react-native";
import { MotiText, MotiView } from "moti";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  StackActions,
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/core";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";

import { CommonStyles } from "../styles/common";
import { Button } from "../components/elements/button";
import {
  FASTING_HABIT_DURATIONS,
  Habit,
  HabitNotEveryDayNotificationId,
  HabitTypes,
  HabitTypesIdentity,
} from "../types/habit";
import { GlobalStore } from "../redux/store";
import InfoIcon from "../components/svgs/info-icon";
import {
  HabitActions,
  HabitActionTypes,
  ProgressPayload,
} from "../redux/reducers/habit/habit-actions";
import { useDerivedValue } from "react-native-reanimated";
import { Plant, PlantStage } from "../components/elements/plant";
import { Modal } from "../components/modules/modals/modal";
import { ExitSessionModal } from "../components/modules/modals/exit-session-modal";
import { Routes } from "../types/route-names";
import { HabitIcon } from "../components/elements/habit-icon";
import { getEnumKeyByEnumValue } from "../utils/enum-type-utils";
import { CONSTANTS } from "../utils/constants";
import { FastingStages } from "../types/fasting-stages";
import { FastingProgressStage } from "../components/elements/fasting-progress-stage";
import { FastingHuman } from "../components/elements/fasting-human";
import { FastingStageDuration } from "../components/modules/add-habit/fasting-stage-duration";
import { FastingStageInfoModal } from "../components/modules/modals/fasting-stage-info-modal";
import Firebase from "../utils/firebase";
import { UserResponce } from "../types/user-responce";
import { getUserDeviceIdAsync } from "../utils/user";
import { PushNotification } from "../utils/push-notification";
import { HabitUtils } from "../utils/habit-utils";
import { CommonActions } from "@react-navigation/native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("screen");

/**
 * define the various kinds of Progress State
 *
 * @enum
 * @exports
 */
export enum ProgressState {
  STOPPED,
  PLAYING,
  PAUSED,
  ENDED,
  SUBMITTED,
}

/**
 * interface that defines the route parameters should be passed to the component
 *
 * @interface
 * @exports
 */
export interface TimerScreenRouteParams {
  /**
   * the habit id
   *
   * @type {string}
   */
  habitId: string;
}

/**
 * interface that defines the props of the component
 *
 * @interface
 */
interface TimerScreenProps {
  /**
   * flag if app state is still playing the introduction
   *
   * @type {boolean}
   */
  isIntroduction: boolean;
}

export const TimerScreen = ({ isIntroduction }: TimerScreenProps) => {
  const route = useRoute();
  const navigation = useNavigation();
  const isOnFocus = useIsFocused();
  const params = route.params as TimerScreenRouteParams;
  const habitId: string = params ? params.habitId : "";
  const habits: Habit[] = useSelector<GlobalStore, Habit[]>(
    (store: GlobalStore): Habit[] => store.habits
  );
  const dispatch = useDispatch();
  const [habit, setHabit] = useState<Habit>();

  const [state, setState] = useState<ProgressState>(ProgressState.STOPPED);
  const [timer, setTimer] = useState<number>(
    habit && habit.type === HabitTypes.FASTING ? 0 : (habit?.duration || 1) * 60
  );
  const [submittedTimer, setSubmittedTimer] = useState<number>(0);
  const [eta, setEta] = useState<Date>(new Date());
  const [etaNotificationId, setEtaNotificationId] = useState<string>("");
  let timerCounter = useRef<ReturnType<typeof setInterval> | null>(null);

  // ......for exit session modal
  const [exitSessionModalOpened, setExitSessionModalOpenState] =
    useState<boolean>(false);

  // ......for submitting partial time
  const [partialTimeWarningModalOpened, togglePartialTimeWarningModal] =
    useState<boolean>(false);

  // ......for show fasting stage info modal
  const [fastingStageInfoModal, toggleFastingStageInfoModal] =
    useState<boolean>(false);

  const [peers, setPeers] = useState<number>(
    Math.floor(Math.random() * 23) + 100
  );

  useEffect(() => {
    if (!habit) return;

    const fs = getFirestore();
    const habitUsersRef = collection(fs, CONSTANTS.FIREBASE_HABITS_COLLECTION);
    const registerPeersListener = onSnapshot(habitUsersRef, (sn) => {
      let peersCount: number = 0;
      sn.forEach((doc) => {
        const userData: UserResponce = doc.data()! as UserResponce;
        if (userData.practicing === habit.type) {
          peersCount++;
        }
      });
      setPeers(
        peersCount <= 100
          ? Math.floor(Math.random() * 23) + 100 + peersCount
          : peersCount
      );
    });

    return () => {
      registerPeersListener();
    };
  }, [habit?.type]);

  /**
   * for the background timer
   */
  const appState = useRef(AppState.currentState);

  /**
   * update the progress value for the animations
   */
  const curProgress = useDerivedValue<number>(() => {
    const totalDuration: number =
      habit && habit.type === HabitTypes.FASTING
        ? 24 * 60 * 60
        : (habit?.duration || 1) * 60;
    return (
      (((habit && habit.type === HabitTypes.FASTING
        ? -timer
        : timer - totalDuration) *
        -1) /
        totalDuration) *
        100 +
      (state === ProgressState.STOPPED
        ? 0
        : 100 /
          totalDuration) /* add 1% because this will evaluate to 1% delay, which means the last re-render will be skipped */
    );
  }, [timer]);

  /**
   * Disable user from going back
   */
  useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        // Prevent default behavior of leaving the screen
        if (
          !isIntroduction &&
          !exitSessionModalOpened &&
          state !== ProgressState.SUBMITTED
        ) {
          onCancelSessionHandler(true);
        } else {
          navigation.dispatch(e.data.action);
        }
        e.preventDefault();
        return;
      }),
    [navigation, isIntroduction, state, exitSessionModalOpened]
  );

  useLayoutEffect(() => {
    if (isOnFocus) {
      const getHabit = habits.find((h) => h.id === habitId);
      if (getHabit) {
        setHabit(getHabit);
        if (
          habit?.id !== getHabit.id ||
          habit.duration !== getHabit.duration ||
          habit.type !== getHabit.type ||
          habit.isEveryDay !== getHabit.isEveryDay
        ) {
          setTimer(
            getHabit.type === HabitTypes.FASTING
              ? 0
              : (getHabit.duration || 1) * 60
          );
        }
        // setState(ProgressState.STOPPED);
      } else {
        navigation.navigate(habits.length ? Routes.HOME : Routes.SPLASH);
      }
    }
  }, [isOnFocus, habits, navigation, habitId]);

  /**
   * to register the timer in the background task
   */
  useEffect(() => {
    const sub = AppState.addEventListener("change", handleAppStateChange);
    return () => sub.remove();
  }, [habit, state, isIntroduction, eta, etaNotificationId]);

  /**
   * record starting time immidiatly when background is invoked
   */
  const recordStartTime = async (): Promise<void> => {
    try {
      const now = new Date();
      await AsyncStorage.setItem(
        CONSTANTS.BACKGROUND_TIMER_KEY,
        now.toISOString()
      );
    } catch (err) {
      // TODO: handle errors from setItem properly
      console.warn(err);
    }
  };

  const handleAppStateChange = async (nextAppState: any) => {
    if (!habit || state !== ProgressState.PLAYING) return;

    if (nextAppState.match(/inactive|background/)) {
      await recordStartTime();
      stopTheTimer();
      if (!isIntroduction) {
        PushNotification.scheduleNotification(
          "Congratulations!",
          `Congratulations you have illuminated your ${HabitTypes[
            habit!.type
          ].charAt(0)}${HabitTypes[habit!.type].substr(1).toLowerCase()} plant`,
          eta
        ).then((id: string) => {
          setEtaNotificationId(id);
        });
      }
    } else if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      // We just became active again: recalculate elapsed time based
      // on what we stored in AsyncStorage when we started.
      const elapsed = await getElapsedTime();

      // Update the elapsed seconds state
      setTimer((t) => {
        const newTime: number =
          habit.type === HabitTypes.FASTING ? t + elapsed : t - elapsed;
        return habit.type === HabitTypes.FASTING && newTime >= 24 * 60 * 60
          ? 24 * 60 * 60 - 1
          : habit.type !== HabitTypes.FASTING && newTime <= 0
          ? 1
          : newTime;
      });
      runTheTimer();
      // cancel committed time notification reached
      if (etaNotificationId) {
        PushNotification.cancelNotification(etaNotificationId);
      }
    }
    appState.current = nextAppState;
  };

  /**
   * To calculate the time elapsed since the app is backgrounded
   *
   * @returns {Promise<number>} the time elapsed since the app is backgrounded
   */
  const getElapsedTime: () => Promise<number> = async (): Promise<number> => {
    try {
      const startTime = await AsyncStorage.getItem(
        CONSTANTS.BACKGROUND_TIMER_KEY
      );
      if (!startTime) return 0;

      const now = new Date();
      return Number(
        Math.floor((now.getTime() - new Date(startTime).getTime()) / 1000)
      );
    } catch (err) {
      console.warn(err);
      return 0;
    }
  };

  // clear timeput whenever component unforced unmout
  useEffect(() => {
    return () => {
      if (timerCounter.current) {
        clearInterval(timerCounter.current);
        timerCounter.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (
      isIntroduction &&
      state === ProgressState.PLAYING &&
      habit &&
      habit.type === HabitTypes.FASTING &&
      timer > 0 &&
      timer % 3 === 0
    ) {
      setTimer(
        timer + 5 * 59 >= habit.duration * 60
          ? habit.duration * 60
          : timer + 5 * 59
      );
    }
  }, [isIntroduction, timer, state]);

  useEffect(() => {
    if (
      (habit &&
        isIntroduction &&
        habit.type === HabitTypes.FASTING &&
        timer >= habit.duration * 60) ||
      (habit && habit.type === HabitTypes.FASTING && timer === 24 * 60 * 60) ||
      (habit && habit.type !== HabitTypes.FASTING && timer <= 0)
    ) {
      changeState(ProgressState.ENDED);
    }
  }, [timer]);

  const runTheTimer = () => {
    if (!timerCounter.current && habit) {
      const period: number = isIntroduction ? 300 : 1000;
      timerCounter.current = setInterval(() => {
        setTimer((t) =>
          habit && habit.type === HabitTypes.FASTING ? t + 1 : t - 1
        );
      }, period);
    }
  };

  const stopTheTimer = () => {
    if (timerCounter.current) {
      clearInterval(timerCounter.current);
      timerCounter.current = null;
    }
  };

  const changeState = async (newState?: ProgressState) => {
    if (
      (state === ProgressState.STOPPED || state === ProgressState.PAUSED) &&
      (!newState || newState === ProgressState.PLAYING)
    ) {
      runTheTimer();
      const timeToComplete: number =
        habit && habit.type === HabitTypes.FASTING
          ? habit.duration * 60
          : timer;
      const etaTime: Date = new Date(Date.now() + timeToComplete * 1000);
      setEta(etaTime);
      // change user practicing state on the server
      changeUserPracticingState(habit ? habit.type : "none");
    } else {
      stopTheTimer();
      // cancel committed time notification reached
      if (etaNotificationId) {
        PushNotification.cancelNotification(etaNotificationId);
      }
    }
    if (
      newState === ProgressState.ENDED ||
      newState === ProgressState.SUBMITTED
    ) {
      // change user practicing state on the server to "none"
      changeUserPracticingState("none");
      // cancel today's notification for this habit
      if (habit && !HabitUtils.isHabitRestDay(habit)) {
        const today6pm: Date = new Date(new Date().setHours(18, 0, 0, 0));
        const now: Date = new Date(Date.now());
        if (now.getTime() < today6pm.getTime()) {
          await HabitUtils.cancelHabitTodaysNotification(habit).then(
            (notification: string | HabitNotEveryDayNotificationId) => {
              dispatch({
                type: HabitActionTypes.UPDATE_HABIT,
                payload: { ...habit, notification },
              });
            }
          );
        }
      }
    }
    setState(
      newState
        ? newState
        : state === ProgressState.STOPPED || state === ProgressState.PAUSED
        ? ProgressState.PLAYING
        : ProgressState.PAUSED
    );
  };

  const changeUserPracticingState = (
    userPracticingState: HabitTypes | "none"
  ) => {
    getUserDeviceIdAsync().then((id: string) => {
      Firebase.updateDocument(
        CONSTANTS.FIREBASE_HABITS_COLLECTION,
        { practicing: userPracticingState } as UserResponce,
        id
      );
    });
  };

  const onSubmit = async () => {
    await changeState(ProgressState.SUBMITTED);
    togglePartialTimeWarningModal(false);
    const timeToSubmit: number =
      habit && habit.type === HabitTypes.FASTING
        ? timer
        : (habit?.duration || 1) * 60 - timer;
    setSubmittedTimer(timeToSubmit);
    dispatch({
      type: HabitActionTypes.SAVE_DAY_PROGRESS,
      payload: {
        habitId,
        time: timeToSubmit,
      } as ProgressPayload,
    });
  };

  const onSubmitAnimationHasCompleted = (a: string) => {
    if (state === ProgressState.SUBMITTED && isOnFocus && a === "top") {
      if (isIntroduction) {
        navigation.navigate(Routes.SUCCESS, {
          habitId: habitId,
        } as TimerScreenRouteParams);
      } else {
        goToViewHabit();
      }
    }
  };

  const goToViewHabit = () => {
    changeUserPracticingState("none");
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          { name: Routes.HOME },
          {
            name: Routes.VIEW_HABIT,
            params: {
              habitId,
            } as TimerScreenRouteParams,
          },
        ],
      })
    );
  };

  const onCancelSessionHandler = async (openState: boolean) => {
    if (!isIntroduction) {
      setExitSessionModalOpenState(openState);
      // also pause the timer
      if (state === ProgressState.PLAYING) {
        changeState(ProgressState.PAUSED);
      }
    } else {
      await PushNotification.cancelAllNotifications();
      dispatch({
        type: HabitActionTypes.INTRODUCTION_CLEAR_UP,
      });
      navigation.goBack();
    }
  };

  const progressCircleWidth: number =
    screenWidth - 36.5 - (screenHeight < 800 ? 16 : 0);

  const habitDurationText: string = `${(habit?.duration || 1) / 60} hr`;

  return (
    <View style={TimeScreenStyles.container}>
      <Image
        source={require("../assets/timer/timer-bg.png")}
        style={TimeScreenStyles.backgroundOverlay}
      />
      {!!habit ? (
        habit.type === HabitTypes.READING ? (
          <Image
            source={require("../assets/timer/read.png")}
            style={[
              TimeScreenStyles.illustrationBackground,
              { height: (screenWidth * 375) / 362 },
            ]}
          />
        ) : habit.type === HabitTypes.MEDITATING ? (
          <Image
            source={require("../assets/timer/meditate.png")}
            style={[
              TimeScreenStyles.illustrationBackground,
              { height: (screenWidth * 750) / 830 },
            ]}
          />
        ) : habit.type === HabitTypes.JOURNALING ? (
          <Image
            source={require("../assets/timer/write.png")}
            style={[
              TimeScreenStyles.illustrationBackground,
              { height: (screenWidth * 750) / 745 },
            ]}
          />
        ) : null
      ) : null}
      <View style={TimeScreenStyles.header}>
        <Pressable onPress={() => onCancelSessionHandler(true)}>
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </Pressable>
        <Text style={TimeScreenStyles.identity}>I am a</Text>
        <HabitIcon
          type={habit?.type}
          style={[
            CommonStyles.withIcon,
            Platform.OS === "ios" && { marginTop: -8 },
          ]}
        />
        <Text
          style={[
            CommonStyles.habitTypeText,
            CommonStyles.habitTypeAccentText,
            { paddingBottom: 0 },
          ]}
        >
          {HabitTypesIdentity[habit?.type || HabitTypes.READING]}
        </Text>
      </View>
      <View style={TimeScreenStyles.peers}>
        <Text style={TimeScreenStyles.peersNum}>
          {peers >= 1000
            ? Math.floor(peers / 1000) +
              (peers % 1000 >= 100
                ? `.${(peers % 1000).toString().charAt(0)}`
                : "") +
              "K"
            : peers}
        </Text>
        <Text style={TimeScreenStyles.peersText}>
          are {HabitTypes[habit?.type || HabitTypes.READING].charAt(0)}
          {HabitTypes[habit?.type || HabitTypes.READING]
            .substr(1)
            .toLowerCase()}{" "}
          now
        </Text>
      </View>
      <View style={TimeScreenStyles.timerContainer}>
        <View style={TimeScreenStyles.progressContainer}>
          <View style={{ position: "relative" }}>
            <AnimatedCircularProgress
              size={progressCircleWidth}
              width={7}
              fill={
                (habit &&
                  habit.type === HabitTypes.FASTING &&
                  timer === 24 * 60 * 60 - 1) ||
                (habit?.type !== HabitTypes.FASTING &&
                  timer === (habit?.duration || 1) * 60 - 1)
                  ? 1
                  : curProgress.value
              }
              tintColor="#fff"
              lineCap="round"
              rotation={-150}
              arcSweepAngle={300}
              backgroundColor="rgba(255,255,255, 0.16)"
            />
            {habit && habit.type === HabitTypes.FASTING && (
              <View
                style={[
                  TimeScreenStyles.timerFastingStagesContainer,
                  {
                    width: progressCircleWidth - 10,
                    height: progressCircleWidth - 10,
                  },
                ]}
              >
                {Object.keys(FastingStages).map((s: string, i: number) => {
                  const stageMappedDuration: string =
                    i > 0 ? FASTING_HABIT_DURATIONS[i - 1] : "0";
                  const stageDuration: number =
                    Number(stageMappedDuration.match(/\d+/g)![0]) * 60 * 60;
                  return (
                    <FastingProgressStage
                      key={i}
                      active={timer >= stageDuration}
                      arcRotation={120}
                      circleRadius={progressCircleWidth / 2 - 2.5}
                      selected={habit && habit.duration * 60 === stageDuration}
                      stage={
                        getEnumKeyByEnumValue(FastingStages, s) as FastingStages
                      }
                    />
                  );
                })}
              </View>
            )}
          </View>
          {habit && habit.type === HabitTypes.FASTING ? (
            <FastingHuman
              size={0.85 * progressCircleWidth}
              fill={
                timer >= habit.duration * 60 ? 1 : timer / (habit.duration * 60)
              }
            />
          ) : !!habit ? (
            <Plant
              habit={habit}
              isActiveSession={
                state !== ProgressState.SUBMITTED || isIntroduction
              }
              sessionProgress={
                timer <= 0
                  ? 1
                  : (habit.duration * 60 - timer) / (habit.duration * 60)
              }
              forceGlow={state === ProgressState.SUBMITTED}
              forceStage={
                !isIntroduction
                  ? undefined
                  : state === ProgressState.STOPPED
                  ? PlantStage.STAGE_20
                  : timer > 57
                  ? PlantStage.STAGE_1
                  : timer > 54
                  ? PlantStage.STAGE_2
                  : timer > 51
                  ? PlantStage.STAGE_3
                  : timer > 48
                  ? PlantStage.STAGE_4
                  : timer > 45
                  ? PlantStage.STAGE_5
                  : timer > 42
                  ? PlantStage.STAGE_6
                  : timer > 39
                  ? PlantStage.STAGE_7
                  : timer > 36
                  ? PlantStage.STAGE_8
                  : timer > 33
                  ? PlantStage.STAGE_9
                  : timer > 30
                  ? PlantStage.STAGE_10
                  : timer > 27
                  ? PlantStage.STAGE_11
                  : timer > 24
                  ? PlantStage.STAGE_12
                  : timer > 21
                  ? PlantStage.STAGE_13
                  : timer > 18
                  ? PlantStage.STAGE_14
                  : timer > 15
                  ? PlantStage.STAGE_15
                  : timer > 12
                  ? PlantStage.STAGE_16
                  : timer > 9
                  ? PlantStage.STAGE_17
                  : timer > 6
                  ? PlantStage.STAGE_18
                  : timer > 3
                  ? PlantStage.STAGE_19
                  : PlantStage.STAGE_20
              }
              useHeight={!isIntroduction}
              extraStyles={[
                { bottom: "6%" },
                isIntroduction && {
                  height: "85%",
                  width: "auto",
                },
              ]}
            />
          ) : null}
          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: state === ProgressState.ENDED ? 0 : 1 }}
            style={TimeScreenStyles.timer}
          >
            <MotiText
              animate={{
                top: state === ProgressState.SUBMITTED ? 220 : 0,
                scale: state === ProgressState.SUBMITTED ? 0.4 : 1,
              }}
              transition={{
                delay: 300,
                duration: 2000,
                type: "timing",
                opacity: {
                  delay: 0,
                  type: "timing",
                  duration: 300,
                },
              }}
              onDidAnimate={onSubmitAnimationHasCompleted}
              style={[
                TimeScreenStyles.timerText,
                habit &&
                  habit.duration >= 60 &&
                  TimeScreenStyles.hourlyTimerText,
              ]}
            >
              {state === ProgressState.SUBMITTED
                ? `+${
                    habit && habit.duration >= 60
                      ? `${
                          submittedTimer / (60 * 60) < 10
                            ? `0${Math.floor(submittedTimer / (60 * 60))}`
                            : Math.floor(submittedTimer / (60 * 60))
                        }:`
                      : ""
                  }${
                    (submittedTimer / 60) % 60 < 10
                      ? `0${Math.floor((submittedTimer / 60) % 60)}`
                      : Math.floor((submittedTimer / 60) % 60)
                  }:${
                    submittedTimer % 60 < 10
                      ? `0${submittedTimer % 60}`
                      : submittedTimer % 60
                  }`
                : `${
                    habit && habit.duration >= 60
                      ? `${
                          timer / (60 * 60) < 10
                            ? `0${Math.floor(timer / (60 * 60))}`
                            : Math.floor(timer / (60 * 60))
                        }:`
                      : ""
                  }${
                    (timer / 60) % 60 < 10
                      ? `0${Math.floor((timer / 60) % 60)}`
                      : Math.floor((timer / 60) % 60)
                  }:${timer % 60 < 10 ? `0${timer % 60}` : timer % 60}`}
            </MotiText>
            <MotiView
              from={{ opacity: 0 }}
              animate={{ opacity: state === ProgressState.PLAYING ? 0.9 : 0 }}
              style={TimeScreenStyles.timerEta}
            >
              <Text style={TimeScreenStyles.timerEtaText}>Eta </Text>
              <Text
                style={[
                  TimeScreenStyles.timerEtaText,
                  TimeScreenStyles.timerEtaTimeText,
                ]}
              >{`${
                eta.getHours() > 12 ? eta.getHours() % 12 : eta.getHours()
              }:${
                eta.getMinutes() < 10
                  ? `0${eta.getMinutes()}`
                  : eta.getMinutes()
              }`}</Text>
              <Text style={TimeScreenStyles.timerEtaText}>
                {eta.getHours() > 12 ? " pm" : " am"}
              </Text>
            </MotiView>
          </MotiView>
        </View>
        <View style={TimeScreenStyles.timerControls}>
          <Button
            text="cancel"
            shape="circle"
            noBorder={true}
            hasBackground={true}
            extraTextStyles={{ textTransform: "capitalize" }}
            onPress={() => onCancelSessionHandler(true)}
          />
          {state !== ProgressState.ENDED &&
            state !== ProgressState.SUBMITTED && (
              <Button
                text={
                  state === ProgressState.STOPPED
                    ? "Start"
                    : state === ProgressState.PAUSED
                    ? "Resume"
                    : "Pause"
                }
                shape="circle"
                hasBackground={true}
                hasCircleBorder={true}
                extraTextStyles={{ textTransform: "capitalize" }}
                darkBorder={state === ProgressState.PLAYING}
                dim={state === ProgressState.PLAYING}
                darkText={state !== ProgressState.STOPPED}
                onPress={() => changeState()}
              />
            )}
        </View>
        {(state === ProgressState.ENDED || state === ProgressState.PAUSED) && (
          <View style={TimeScreenStyles.footer}>
            <Button
              shape="oval"
              text="submit"
              noBorder={true}
              isAccentButton={true}
              onPress={() =>
                state === ProgressState.PAUSED
                  ? togglePartialTimeWarningModal(true)
                  : onSubmit()
              }
              extraStyles={{ height: 56, width: "45%" }}
            />
            {screenHeight >= 800 && (
              <View style={TimeScreenStyles.footerSpacer} />
            )}
            <View style={TimeScreenStyles.footerInfoSection}>
              <InfoIcon
                style={[TimeScreenStyles.footerInfoIcon, CommonStyles.withIcon]}
                fill="#fff"
              />
              <Text style={TimeScreenStyles.footerInfoText}>
                Hit SUBMIT to infuse your habit with the light you've built up.
              </Text>
            </View>
            {screenHeight >= 800 && (
              <View style={TimeScreenStyles.footerSpacer} />
            )}
          </View>
        )}
        {habit &&
          habit.type === HabitTypes.FASTING &&
          state !== ProgressState.ENDED &&
          state !== ProgressState.PAUSED && (
            <View style={TimeScreenStyles.fastingFooter}>
              <FastingStageDuration
                stage={
                  Object.keys(FastingStages)[
                    FASTING_HABIT_DURATIONS.findIndex(
                      (s) => s === habitDurationText
                    ) + 1
                  ] as FastingStages
                }
                index={FASTING_HABIT_DURATIONS.findIndex(
                  (s) => s === habitDurationText
                )}
                extraStyles={[
                  TimeScreenStyles.fastingStageeInfo,
                  { marginBottom: 0 },
                ]}
                selected={false}
                hasSpacer={true}
                showInfoIcon={true}
                onSelect={(v: string) => toggleFastingStageInfoModal(true)}
              />
            </View>
          )}
      </View>
      {exitSessionModalOpened && !isIntroduction && (
        <Modal>
          <ExitSessionModal
            onCancel={() => onCancelSessionHandler(false)}
            onExit={goToViewHabit}
          />
        </Modal>
      )}
      {partialTimeWarningModalOpened && !isIntroduction && (
        <Modal>
          <ExitSessionModal
            title="Submit a Partial Session?"
            message="Are you sure you want to submit? It won’t count as a completed session. You can always pause and resume the session later."
            submitText="submit"
            onCancel={() => togglePartialTimeWarningModal(false)}
            onExit={onSubmit}
          />
        </Modal>
      )}
      {habit && habit.type === HabitTypes.FASTING && fastingStageInfoModal && (
        <Modal>
          <FastingStageInfoModal
            stage={
              Object.keys(FastingStages)[
                FASTING_HABIT_DURATIONS.findIndex(
                  (s) => s === habitDurationText
                ) + 1
              ] as FastingStages
            }
            index={FASTING_HABIT_DURATIONS.findIndex(
              (s) => s === habitDurationText
            )}
            onDismiss={() => toggleFastingStageInfoModal(false)}
          />
        </Modal>
      )}
    </View>
  );
};

const TimeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: CONSTANTS.HEADER_TOP_MARGIN,
  },
  backgroundOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: screenWidth,
    height: screenHeight,
    resizeMode: "cover",
  },
  illustrationBackground: {
    width: screenWidth,
    resizeMode: "cover",
    position: "absolute",
    alignSelf: "flex-start",
    top: 0,
    opacity: 0.55,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 21,
  },
  identity: {
    fontFamily: "JosefinSans-Bold",
    fontSize: 24,
    lineHeight: 32,
    color: "#fff",
    marginLeft: 21,
    marginRight: 13,
    opacity: 0.7,
  },
  peers: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 24,
    marginTop: 8,
    marginBottom: 11,
  },
  peersNum: {
    fontFamily: "Rubik-Regular",
    fontSize: 24,
    marginRight: 6,
    color: "#fff",
  },
  peersText: {
    fontFamily: "Rubik-Regular",
    fontSize: 14,
    marginBottom: 2,
    color: "#BDBDBD",
  },
  timerContainer: {
    flex: 1,
    display: "flex",
    paddingHorizontal: 27,
  },
  progressContainer: {
    alignItems: "center",
  },
  timer: {
    position: "absolute",
    top: 32,
    left: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    paddingBottom: 18,
  },
  timerEta: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  timerEtaText: {
    fontFamily: "Rubik-Light",
    fontSize: 18,
    lineHeight: 32,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: "#fff",
    opacity: 0.8,
  },
  timerEtaTimeText: {
    fontSize: 24,
    opacity: 1,
  },
  timerText: {
    fontFamily: "Rubik-Light",
    fontSize: 91,
    textAlign: "center",
    letterSpacing: 2,
    color: "#fff",
  },
  hourlyTimerText: {
    fontSize: 61,
  },
  timerFastingStagesContainer: {
    position: "absolute",
    top: 5,
    left: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  timerControls: {
    marginTop: screenHeight < 800 ? -32 : -26,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  footer: {
    display: "flex",
    alignItems: "center",
    flex: screenHeight < 800 ? 0 : 1,
    marginTop: -16,
  },
  footerInfoSection: {
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 8,
    paddingVertical: 16,
    marginTop: 12,
    backgroundColor: "rgba(12, 8, 52, 0.6)",
    borderRadius: 16,
    marginHorizontal: "9%",
  },
  footerInfoIcon: {
    width: 14,
    height: 14,
    opacity: 0.5,
  },
  footerSpacer: { flex: 1 },
  footerInfoText: {
    fontFamily: "Rubik-Regular",
    fontSize: 16,
    lineHeight: 24,
    color: "#fff",
    opacity: 0.66,
  },
  fastingFooter: {
    flex: 1,
    width: screenWidth * 0.61,
    alignSelf: "center",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  fastingStageeInfo: {
    backgroundColor: "rgba(12, 8, 52, 0.8)",
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 2,
  },
  fastingStageInfoText: {
    fontFamily: "JosefinSans-SemiBold",
    fontSize: 18,
    lineHeight: 32,
    color: "#fff",
    opacity: 0.5,
  },
  fastingStageInfoDuration: {
    fontFamily: "Rubik-Regular",
    fontSize: 16,
    lineHeight: 28,
    color: "#fff",
    opacity: 0.5,
  },
});
