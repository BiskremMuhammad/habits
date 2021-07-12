/**
 * @author Muhammad Omran
 * @date 15-05-2021
 * @description implement the timer Screen
 */

import React, {
  Dispatch,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  Alert,
  Platform,
  Pressable,
} from "react-native";
import { AnimatePresence, MotiText, MotiView } from "moti";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  StackActions,
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/core";
import { AnimatedCircularProgress } from "react-native-circular-progress";

import { CommonStyles } from "../styles/common";
import { Button } from "../components/elements/button";
import {
  FASTING_HABIT_DURATIONS,
  Habit,
  HabitTypes,
  HabitTypesIdentity,
} from "../types/habit";
import { useDispatch, useSelector } from "react-redux";
import { GlobalStore } from "../redux/store";
import InfoIcon from "../components/svgs/info-icon";
import {
  HabitActions,
  HabitActionTypes,
  ProgressPayload,
} from "../redux/reducers/habit/habit-actions";
import { useDerivedValue } from "react-native-reanimated";
import { Plant, PlantState } from "../components/elements/plant";
import { Modal } from "../components/modules/modals/modal";
import { ExitSessionModal } from "../components/modules/modals/exit-session-modal";
import { Routes } from "../types/route-names";
import { calculateStreak } from "../utils/calendar-utils";
import { HabitIcon } from "../components/elements/habit-icon";
import { getEnumKeyByEnumValue } from "../utils/enum-type-utils";
import { CONSTANTS } from "../utils/constants";
import { FastingStages } from "../types/fasting-stages";
import { FastingProgressStage } from "../components/elements/fasting-progress-stage";

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
  const dispatch = useDispatch<Dispatch<HabitActions>>();
  const [habit, setHabit] = useState<Habit>();

  const [state, setState] = useState<ProgressState>(ProgressState.STOPPED);
  const [timer, setTimer] = useState<number>((habit?.duration || 1) * 60);
  const [submittedTimer, setSubmittedTimer] = useState<number>(0);
  const [eta, setEta] = useState<Date>(new Date());
  let timerCounter = useRef<ReturnType<typeof setInterval> | null>(null);

  // ......for exit session modal
  const [exitSessionModalOpened, setExitSessionModalOpenState] =
    useState<boolean>(false);

  // ......for submitting partial time
  const [partialTimeWarningModalOpened, togglePartialTimeWarningModal] =
    useState<boolean>(false);

  /**
   * update the progress value for the animations
   */
  const curProgress = useDerivedValue<number>(() => {
    return (
      (((timer - (habit?.duration || 1) * 60) * -1) /
        ((habit?.duration || 1) * 60)) *
        100 +
      (state === ProgressState.STOPPED
        ? 0
        : 100 /
          ((habit?.duration || 1) *
            60)) /* add 1% because this will evaluate to 1% delay, which means the last re-render will be skipped */
    );
  }, [timer]);

  /**
   * plant animation props
   */
  const plantPositionX = useDerivedValue<number>(() => {
    return curProgress.value >= 0 &&
      curProgress.value < 50 &&
      state !== ProgressState.STOPPED
      ? 9
      : 6;
  }, [state]);

  const plantHeight = useDerivedValue<number>(() => {
    return curProgress.value >= 0 &&
      curProgress.value < 50 &&
      state !== ProgressState.STOPPED
      ? 48.35
      : (curProgress.value / 100 || 1) * 255.4;
  }, [state]);

  const plantPositionBottom = useDerivedValue<number>(() => {
    return curProgress.value >= 0 &&
      curProgress.value < 50 &&
      state !== ProgressState.STOPPED
      ? 75
      : curProgress.value >= 50 && state !== ProgressState.ENDED
      ? (1 - curProgress.value / 100 + 0.4 || 1) * 75
      : 24;
  }, [state]);

  const plant = useDerivedValue<PlantState>(() => {
    if (state === ProgressState.STOPPED) {
      return PlantState.DARK;
    } else if (curProgress.value >= 0 && curProgress.value < 50) {
      return PlantState.SMALL;
    } else if (curProgress.value >= 100 && state === ProgressState.SUBMITTED) {
      return PlantState.GLOW;
    } else {
      return PlantState.NORMAL;
    }
  }, [state]);

  /**
   * Disable user from going back
   */
  useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        // Prevent default behavior of leaving the screen
        e.preventDefault();
        if (!isIntroduction) {
          onCancelSessionHandler(true);
        } else {
          navigation.dispatch(e.data.action);
        }
        return;
      }),
    [navigation, isIntroduction]
  );

  useLayoutEffect(() => {
    if (isOnFocus) {
      const getHabit = habits.find((h) => h.id === habitId);
      if (getHabit) {
        setHabit(getHabit);
        setTimer((getHabit.duration || 1) * 60);
        // setState(ProgressState.STOPPED);
      } else {
        navigation.dispatch(
          StackActions.push(habits.length ? Routes.HOME_ROUTE : Routes.SPLASH)
        );
      }
    }
  }, [isOnFocus, habits, navigation, habitId]);

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
      timer > 0 &&
      timer % 3 === 0
    ) {
      setTimer(timer <= 8 ? 1 : timer - 8);
    }
  }, [isIntroduction, timer, state]);

  useEffect(() => {
    if (timer <= 0) {
      if (timerCounter.current) {
        clearInterval(timerCounter.current);
        timerCounter.current = null;
        setState(ProgressState.ENDED);
      }
    }
  }, [timer]);

  const changeState = (newState?: ProgressState) => {
    if (
      (state === ProgressState.STOPPED || state === ProgressState.PAUSED) &&
      (!newState || newState === ProgressState.PLAYING)
    ) {
      if (!timerCounter.current) {
        timerCounter.current = setInterval(() => {
          setTimer((t) => t - 1);
        }, 1000);
      }
      setEta(new Date(Date.now() + timer * 1000));
    } else {
      if (timerCounter.current) {
        clearInterval(timerCounter.current);
        timerCounter.current = null;
      }
    }
    setState(
      (state === ProgressState.STOPPED || state === ProgressState.PAUSED) &&
        (!newState || newState === ProgressState.PLAYING)
        ? ProgressState.PLAYING
        : ProgressState.PAUSED
    );
  };

  const onSubmit = () => {
    setState(ProgressState.SUBMITTED);
    togglePartialTimeWarningModal(false);
    const timeToSubmit: number = (habit?.duration || 1) * 60 - timer;
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
        navigation.navigate(Routes.SUCCESS);
      } else {
        goToViewHabit();
      }
    }
  };

  const goToViewHabit = () => {
    navigation.dispatch(
      StackActions.push(Routes.VIEW_HABIT, {
        habitId: habitId,
      } as TimerScreenRouteParams)
    );
  };

  const onCancelSessionHandler = (openState: boolean) => {
    if (!isIntroduction) {
      setExitSessionModalOpenState(openState);
      // also pause the timer
      if (state === ProgressState.PLAYING) {
        changeState(ProgressState.PAUSED);
      }
    } else {
      navigation.goBack();
    }
  };

  const today: Date = new Date(new Date().setHours(0, 0, 0, 0));
  const [streak, _, __] = useMemo(
    () =>
      calculateStreak(
        today,
        habit ? habit.progress : [],
        habit ? habit.days : []
      ),
    [habit]
  );

  const progressCircleWidth: number =
    screenWidth - 32 - 54 - (screenHeight < 800 ? 28 : 0);

  return (
    <View style={TimeScreenStyles.container}>
      <LinearGradient
        colors={["rgb(13, 9, 39)", "rgb(33, 29, 66)"]}
        style={TimeScreenStyles.backgroundOverlay}
      />
      <Image
        source={require("../assets/illustration.png")}
        style={TimeScreenStyles.illustrationBackground}
      />
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
        {streak > 0 && !isIntroduction && (
          <Text style={CommonStyles.habitStreak}>{streak > 0 && streak}</Text>
        )}
      </View>
      <View style={TimeScreenStyles.peers}>
        <Text style={TimeScreenStyles.peersNum}>2K</Text>
        <Text style={TimeScreenStyles.peersText}>are reading now</Text>
      </View>
      <View style={TimeScreenStyles.timerContainer}>
        <View style={TimeScreenStyles.progressContainer}>
          <View style={{ position: "relative" }}>
            <AnimatedCircularProgress
              size={progressCircleWidth}
              width={5}
              fill={
                timer === (habit?.duration || 1) * 60 - 1
                  ? 1
                  : curProgress.value
              }
              tintColor="#fff"
              lineCap="round"
              rotation={-145}
              arcSweepAngle={290}
              backgroundColor="rgba(255,255,255, 0.16)"
            />
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
          </View>
          <Plant
            state={
              state === ProgressState.SUBMITTED ? PlantState.GLOW : plant.value
            }
            height={plantHeight}
            positionX={plantPositionX}
            positionBottom={plantPositionBottom}
          />
          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: state === ProgressState.ENDED ? 0 : 1 }}
            style={TimeScreenStyles.timer}
          >
            <MotiView
              from={{ opacity: 0 }}
              animate={{ opacity: state === ProgressState.PLAYING ? 0.2 : 0 }}
              style={TimeScreenStyles.timerEta}
            >
              <Text style={TimeScreenStyles.timerEtaText}>Eta </Text>
              <Text style={TimeScreenStyles.timerEtaText}>{`${
                eta.getHours() > 12 ? eta.getHours() % 12 : eta.getHours()
              }:${
                eta.getMinutes() < 10
                  ? `0${eta.getMinutes()}`
                  : eta.getMinutes()
              } ${eta.getHours() > 12 ? "pm" : "am"}`}</Text>
            </MotiView>
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
              style={TimeScreenStyles.timerText}
            >
              {state === ProgressState.SUBMITTED
                ? `${
                    submittedTimer / 60 < 10
                      ? `0${Math.floor(submittedTimer / 60)}`
                      : Math.floor(submittedTimer / 60)
                  }:${
                    submittedTimer % 60 < 10
                      ? `0${submittedTimer % 60}`
                      : submittedTimer % 60
                  }`
                : `${
                    habit && habit.duration > 60
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
          </MotiView>
        </View>
        <View style={TimeScreenStyles.timerControls}>
          <Button
            text="cancel"
            shape="circle"
            noBorder={true}
            hasBackground={true}
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
            />
            <View style={TimeScreenStyles.footerInfoSection}>
              <InfoIcon
                style={[TimeScreenStyles.footerInfoIcon, CommonStyles.withIcon]}
                fill="#fff"
              />
              <Text style={TimeScreenStyles.footerInfoText}>
                Hit SUBMIT to infuse your habit with the light you've built up.
              </Text>
            </View>
          </View>
        )}
      </View>
      <AnimatePresence>
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
      </AnimatePresence>
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
    opacity: 0.6,
  },
  illustrationBackground: {
    width: screenWidth,
    height: screenWidth * (362 / 375),
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
    marginTop: 25,
    marginBottom: 40,
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
    top: 0,
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
    opacity: 0.2,
  },
  timerEtaText: {
    fontFamily: "Rubik-Light",
    fontSize: 18,
    lineHeight: 32,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: "#fff",
  },
  timerText: {
    fontFamily: "Rubik-Light",
    fontSize: 69,
    textAlign: "center",
    letterSpacing: 2,
    color: "#fff",
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
    marginTop: screenHeight < 800 ? 0 : 33,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  footer: {
    display: "flex",
    alignItems: "center",
    marginTop: -16,
  },
  footerInfoSection: {
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 8,
    paddingVertical: 16,
    marginTop: 21,
    backgroundColor: "rgba(12, 8, 52, 0.6)",
    borderRadius: 16,
    marginHorizontal: "9%",
  },
  footerInfoIcon: {
    width: 14,
    height: 14,
    opacity: 0.5,
  },
  footerInfoText: {
    fontFamily: "Rubik-Regular",
    fontSize: 16,
    lineHeight: 24,
    color: "#fff",
    opacity: 0.66,
  },
});
