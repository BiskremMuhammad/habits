/**
 * @author Muhammad Omran
 * @date 25-05-2021
 * @description Implement the view habit screen
 */

import {
  useRoute,
  useNavigation,
  useIsFocused,
} from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, {
  Dispatch,
  useEffect,
  useLayoutEffect,
  useReducer,
  useState,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  I18nManager,
  Dimensions,
  ScrollView,
  Pressable,
  Platform,
} from "react-native";
import DateTimePicker, {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useDispatch, useSelector } from "react-redux";
import { GlobalStore } from "../redux/store";
import { CommonStyles } from "../styles/common";
import {
  FASTING_HABIT_DURATIONS,
  Habit,
  HabitNotEveryDayNotificationId,
  HabitProgressData,
  HabitTypes,
  HabitTypesIdentity,
  RoutineHabit,
} from "../types/habit";
import { Routes } from "../types/route-names";
import { TimerScreenRouteParams } from "./timer-screen";
import { WeekDays, WeekDaysFullName } from "../types/week-days";
import { Plant, PlantStage } from "../components/elements/plant";
import { Button } from "../components/elements/button";
import { MotiView } from "@motify/components";
import { MonthView } from "../components/modules/view-habit/month-view";
import { HabitDurationInput } from "../components/modules/add-habit/habit-duration";
import { HabitFrequencyInput } from "../components/modules/add-habit/habit-frequency";
import {
  AddHabitActionTypes,
  addHabitReducer,
  INITIAL_ADD_HABIT_STATE,
} from "../components/modules/add-habit/add-habit-reducer";
import { Header } from "../components/elements/header";
import { Graph } from "../components/modules/view-habit/graph";
import { OpenedDropDown } from "../components/modules/add-habit/add-habit";
import {
  HabitActions,
  HabitActionTypes,
} from "../redux/reducers/habit/habit-actions";
import { HabitIcon } from "../components/elements/habit-icon";
import { CONSTANTS } from "../utils/constants";
import { FastingStages, FastingStagesLabels } from "../types/fasting-stages";
import InfoIcon from "../components/svgs/info-icon";
import { FastingStageInfoModal } from "../components/modules/modals/fasting-stage-info-modal";
import { Modal } from "../components/modules/modals/modal";
import { useMemo } from "react";
import {
  Time24Prettify,
  calculateStreak,
  mapToHabitTime,
} from "../utils/calendar-utils";
import { HabitUtils } from "../utils/habit-utils";
import { AddRoutinePeriodModal } from "../components/modules/modals/add-routine-period-modal";
import { Input } from "../components/elements/input";

const { width: screenWidth, height: screenHeight } = Dimensions.get("screen");

export const ViewHabitScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const isOnFocus = useIsFocused();
  const params = route.params as TimerScreenRouteParams;
  const habitId: string = params ? params.habitId : "";
  const habits: Habit[] = useSelector<GlobalStore, Habit[]>(
    (store: GlobalStore): Habit[] => store.habits
  );
  const storeDispatch = useDispatch<Dispatch<HabitActions>>();
  const [habit, setHabit] = useState<Habit>();
  const [tab, setTab] = useState<"CALENDAR" | "GRAPH">("CALENDAR");
  const tabs: Array<"CALENDAR" | "GRAPH"> = ["CALENDAR", "GRAPH"];
  const [currentOpenInput, setCurrentOpenInput] = useState(OpenedDropDown.NONE);
  const [hasChanges, setHasChanges] = useState<boolean>(false);

  const onChangeOpenedDropdown = (state: boolean, input: OpenedDropDown) => {
    setCurrentOpenInput(state ? input : OpenedDropDown.NONE);
  };

  const [fastingStageInfoModal, toggleFastingStageInfoModal] =
    useState<boolean>(false);
  const [showAddRoutinePeriodModal, toggleAddRoutinePeriodModal] =
    useState<boolean>(false);

  const [state, dispatch] = useReducer(
    addHabitReducer,
    habit ? habit : INITIAL_ADD_HABIT_STATE
  );
  const { type, isEveryDay, days, duration } = state;

  const onSaveChanges = async () => {
    if (!days.length || !hasChanges) return;

    let updatedHabit: Habit = {
      ...state,
      notification: state.isEveryDay ? "" : {},
    };
    if (state.notification) {
      // cancel habit existing scheduled notification
      await HabitUtils.cancelAllHabitNotifications(state);
    }
    const updatedHabitNewNotification: string | HabitNotEveryDayNotificationId =
      await HabitUtils.scheduleHabitNotificationAsync(updatedHabit);
    updatedHabit = { ...state, notification: updatedHabitNewNotification };
    storeDispatch({
      type: HabitActionTypes.UPDATE_HABIT,
      payload: updatedHabit,
    });
    setHasChanges(false);
  };

  const onAddPeriod = (period: RoutineHabit) => {
    let updatedHabit: Habit = {
      ...state,
      routineHabits: [...(state.routineHabits || []), period],
    };
    storeDispatch({
      type: HabitActionTypes.UPDATE_HABIT,
      payload: updatedHabit,
    });
    toggleAddRoutinePeriodModal(false);
  };

  const onRemovePeriod = (idx: number) => {
    let updatedHabit: Habit = {
      ...state,
      routineHabits: state.routineHabits?.filter((_, i) => i !== idx),
    };
    storeDispatch({
      type: HabitActionTypes.UPDATE_HABIT,
      payload: updatedHabit,
    });
  };

  useLayoutEffect(() => {
    if (isOnFocus) {
      const getHabit = habits.find((h) => h.id === habitId);
      if (getHabit) {
        setHabit(getHabit);
        dispatch({
          type: AddHabitActionTypes.UPDATE_HABIT,
          payload: getHabit,
        });
      } else {
        navigation.navigate(habits.length ? Routes.HOME : Routes.SPLASH);
      }
    }
  }, [isOnFocus, habits, navigation, habitId]);

  /**
   * Disable user from going back
   */
  useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        // Prevent default behavior of leaving the screen
        if (hasChanges) {
          onSaveChanges();
        }
        // navigation.dispatch(StackActions.push(Routes.HOME_ROUTE));
      }),
    [navigation, state, hasChanges]
  );

  const onChangeDuration = (val: string) => {
    setHasChanges(true);
    dispatch({
      type: AddHabitActionTypes.CHANGE_HABIT_DURATION,
      payload: val,
    });
  };

  const onChangeFreq = (radio: number) => {
    setHasChanges(true);
    dispatch({
      type: AddHabitActionTypes.CHANGE_HABIT_EVERYDAY_STATE,
      payload:
        radio === 1
          ? true
          : radio === 2
          ? Object.keys(WeekDays)
              .filter((_, i) => i > 0)
              .map<WeekDays>((k) => k as WeekDays)
          : [],
    });
  };

  const dispatchDays = (selectedDays: WeekDays[]) => {
    setHasChanges(true);
    dispatch({
      type: AddHabitActionTypes.CHANGE_HABIT_FREQUENCY,
      payload: selectedDays,
    });
  };

  const onShowAndroidTimePicker = () => {
    DateTimePickerAndroid.open({
      value: new Date(0, 0, 0, habit?.datetime.hour, habit?.datetime.minute),
      onChange: onChangeRoutineTime,
      mode: "time",
      is24Hour: false,
    });
  };

  const onChangeRoutineTime = (d: DateTimePickerEvent) => {
    setHasChanges(true);
    dispatch({
      type: AddHabitActionTypes.CHANGE_HABIT_TIME,
      payload: mapToHabitTime(new Date(d.nativeEvent.timestamp)),
    });
  };

  const onStartPracticing = () => {
    if (hasChanges) {
      onSaveChanges();
    }
    navigation.navigate(Routes.TIMER, {
      habitId: state.id,
    } as TimerScreenRouteParams);
  };

  const today: Date = new Date(new Date().setHours(0, 0, 0, 0));
  const habitDurationText: string = `${duration / 60} hr`;

  /**
   * calculate total habit practiced time
   *
   * @type {number}
   */
  const totalTime: number = useMemo(() => {
    if (!habit || !habit.progress.length) return 0;

    return Math.floor(
      habit.progress.reduce(
        (time: number, progress: HabitProgressData) => time + progress.duration,
        0
      ) / 60
    );
  }, [habit?.progress]);

  /**
   * calculate average habit practiced time
   *
   * @type {string}
   */
  const averageTime: string = useMemo(() => {
    if (!habit || !habit.progress.length) return "0";

    return (totalTime / habit.progress.length).toFixed(2);
  }, [habit?.progress, totalTime]);

  /**
   * calculate habit best streak
   *
   * @type {number}
   */
  const bestStreak: number = useMemo(() => {
    if (!habit) return 0;

    return Math.max(
      ...habit.progress.reduce(
        (streaks: number[], progress: HabitProgressData): number[] => {
          const [streak, _, __] = calculateStreak(progress.date, habit);
          if (!streaks.includes(streak)) {
            streaks.push(streak);
          }
          return streaks;
        },
        [0]
      )
    );
  }, [habit?.progress, habit?.days]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["rgb(13, 9, 39)", "rgb(33, 29, 66)"]}
        style={styles.backgroundOverlay}
      />
      <ScrollView>
        <View style={{ paddingVertical: CONSTANTS.HEADER_TOP_MARGIN }}>
          <Header leftAction="back" normalGoBack={true} />
          <View
            style={[
              styles.habitDetailsContainer,
              Platform.OS === "ios" && { zIndex: 4 },
            ]}
          >
            <View
              style={[
                styles.habitDetails,
                Platform.OS === "ios" && { zIndex: 4 },
              ]}
            >
              <Text style={styles.habitDetailsText}>
                {habit?.isRoutine
                  ? "I will do"
                  : habit?.type !== HabitTypes.OTHER
                  ? "I will"
                  : "I am a"}
              </Text>
              <View
                style={{
                  paddingHorizontal: habitDetailsPadding,
                  paddingLeft: habitDetailsMargin,
                  zIndex: 4,
                }}
              >
                <View style={CommonStyles.textWithIcon}>
                  <HabitIcon
                    type={habit?.type}
                    style={[
                      CommonStyles.habitTypeIcon,
                      { marginTop: Platform.OS === "ios" ? -18 : -11 },
                    ]}
                  />
                  <Text
                    style={[
                      CommonStyles.habitTypeText,
                      CommonStyles.habitTypeAccentText,
                    ]}
                  >
                    {habit?.type !== HabitTypes.OTHER
                      ? HabitTypesIdentity[habit?.type || HabitTypes.READING]
                      : habit.title}
                  </Text>
                </View>
              </View>
              {!!habit && (
                <HabitFrequencyInput
                  forceState={
                    currentOpenInput === OpenedDropDown.HABIT_FREQUENCY
                  }
                  toggleCallback={(state: boolean) =>
                    onChangeOpenedDropdown(
                      state,
                      OpenedDropDown.HABIT_FREQUENCY
                    )
                  }
                  isEveryDay={isEveryDay}
                  floatingPanel={true}
                  handlerStyle={{
                    marginTop: 0,
                    marginLeft: habitDetailsMargin - 13,
                  }}
                  days={days}
                  dispatchDays={dispatchDays}
                  onChangeFreq={onChangeFreq}
                />
              )}
              {!!habit && (
                <View
                  style={[
                    Platform.OS === "ios" && {
                      zIndex: 4,
                      flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
                      alignItems: "center",
                    },
                  ]}
                >
                  <Text style={[styles.habitDetailsText, { paddingBottom: 0 }]}>
                    at
                  </Text>
                  {Platform.OS === "android" ? (
                    <Pressable onPress={onShowAndroidTimePicker}>
                      <Input
                        text={Time24Prettify(habit.datetime)}
                        width="minimal"
                        hideIcon={true}
                        onChange={onShowAndroidTimePicker}
                        hasBorder={true}
                        hasCircleBorder={true}
                      />
                    </Pressable>
                  ) : (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={
                        new Date(
                          0,
                          0,
                          0,
                          habit.datetime.hour,
                          habit.datetime.minute
                        )
                      }
                      mode="time"
                      onChange={onChangeRoutineTime}
                      display="inline"
                      style={[
                        CommonStyles.habitTypeText,
                        CommonStyles.habitTypeAccentText,
                        { marginTop: 8 },
                      ]}
                    />
                  )}
                </View>
              )}
              {!!habit && (
                <HabitDurationInput
                  forceState={
                    currentOpenInput === OpenedDropDown.HABIT_DURATION
                  }
                  toggleCallback={(state: boolean) =>
                    onChangeOpenedDropdown(state, OpenedDropDown.HABIT_DURATION)
                  }
                  extraStyles={[
                    styles.habitDurationContainer,
                    habit.type === HabitTypes.FASTING && {
                      flexDirection: "column",
                      alignItems: "flex-start",
                      marginTop: 12,
                    },
                    Platform.OS === "ios" && { zIndex: 3 },
                  ]}
                  source="VIEW"
                  grayedLabel={true}
                  disableBorder={true}
                  customWidth="minimal"
                  useFastingDurations={habit.type === HabitTypes.FASTING}
                  enableDurationSelect={true}
                  initialDuration={duration}
                  hideInfoIcon={true}
                  onChangeDuration={onChangeDuration}
                />
              )}
              {!!habit && habit.type === HabitTypes.FASTING && (
                <Pressable
                  onPress={() => toggleFastingStageInfoModal(true)}
                  style={[CommonStyles.textWithIcon, styles.fastingStageInfo]}
                >
                  <Text style={styles.fastingStageInfoText}>{`What is ${
                    FastingStagesLabels[
                      Object.keys(FastingStages)[
                        FASTING_HABIT_DURATIONS.findIndex(
                          (s) => s === habitDurationText
                        ) + 1
                      ] as FastingStages
                    ]
                  }`}</Text>
                  <InfoIcon style={CommonStyles.infoIcon} />
                </Pressable>
              )}
            </View>
            <View
              style={[
                styles.plantContainer,
                Platform.OS === "ios" && { zIndex: 2 },
              ]}
            >
              {!!habit && <Plant habit={habit} extraStyles={styles.plant} />}
              <Text style={styles.weekday}>
                {Object.values(WeekDaysFullName).find(
                  (d, i) => i === today.getDay()
                )}
              </Text>
              <Button
                shape="circle"
                text="start"
                hasBackground={true}
                isStatic={true}
                extraTextStyles={{ textTransform: "capitalize" }}
                dim={true}
                onPress={onStartPracticing}
                hasCircleBorder={true}
              />
            </View>
          </View>
          {habit?.isRoutine && (
            <View style={styles.routineDateContainer}>
              <View style={styles.routineSeparator} />
              <Text
                style={[
                  styles.habitDetailsText,
                  { paddingHorizontal: 0, paddingLeft: 0 },
                ]}
              >
                Routine Periods
              </Text>
              {habit.routineHabits?.map((p, i) => (
                <View
                  key={`routine-period-${i + 1}`}
                  style={{
                    width: "100%",
                    flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
                    alignItems: "center",
                    marginBottom: 8,
                  }}
                >
                  <Text
                    style={[
                      CommonStyles.habitTypeText,
                      CommonStyles.habitTypeAccentText,
                      { paddingBottom: 0, flex: 1 },
                    ]}
                  >
                    {p.title}
                  </Text>
                  <Text
                    style={[
                      styles.routinePeriodDuration,
                      CommonStyles.habitTypeText,
                      CommonStyles.habitTypeAccentText,
                      { paddingBottom: 0 },
                    ]}
                  >
                    {p.duration >= 60 ? p.duration / 60 : p.duration}{" "}
                    {p.duration >= 60 ? "hr" : "min"}
                  </Text>
                  <Pressable
                    onPress={() => onRemovePeriod(i)}
                    style={[styles.routinePeriodDeleteButton]}
                  >
                    <Feather name="trash-2" size={24} color="white" />
                  </Pressable>
                </View>
              ))}
              <View style={styles.buttonContainer}>
                <Button
                  shape={"oval"}
                  text="Add Period"
                  hasBackground={true}
                  isStatic={false}
                  onPress={() => toggleAddRoutinePeriodModal(true)}
                  hasCircleBorder={true}
                />
              </View>
            </View>
          )}
          <View style={styles.accentSection}>
            <View style={styles.statsItem}>
              <Text style={styles.statsItemDescription}>total time</Text>
              <Text style={styles.statsItemValue}>{totalTime}</Text>
              <Text style={styles.statsItemPeriod}>minutes</Text>
            </View>
            <View style={styles.statsItem}>
              <Text style={styles.statsItemDescription}>Avg Session</Text>
              <Text style={styles.statsItemValue}>{averageTime}</Text>
              <Text style={styles.statsItemPeriod}>minutes</Text>
            </View>
            <View style={styles.statsItem}>
              <Text style={styles.statsItemDescription}>Best streak</Text>
              <Text style={styles.statsItemValue}>{bestStreak}</Text>
              <Text style={styles.statsItemPeriod}>days</Text>
            </View>
          </View>
          <View style={styles.tabs}>
            {tabs.map((t: "CALENDAR" | "GRAPH", i: number) => (
              <View key={i} style={styles.tabContainer}>
                <Pressable onPress={() => setTab(t)}>
                  <Text
                    style={[styles.tabText, t === tab && styles.tabTextActive]}
                  >
                    {t}
                  </Text>
                </Pressable>
                {t === tab && (
                  <MotiView
                    from={{ width: 0 }}
                    animate={{ width: 24 }}
                    style={styles.tabActiveIndicator}
                  ></MotiView>
                )}
              </View>
            ))}
          </View>
          {tab === "CALENDAR" && !!habit && <MonthView habit={habit} />}
          {tab === "GRAPH" && !!habit && (
            <Graph data={habit.progress.length ? habit.progress : []} />
          )}
        </View>
      </ScrollView>
      {fastingStageInfoModal && (
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
      {showAddRoutinePeriodModal && (
        <Modal>
          <AddRoutinePeriodModal
            onConfirm={onAddPeriod}
            onDismiss={() => toggleAddRoutinePeriodModal(false)}
          />
        </Modal>
      )}
    </View>
  );
};

const habitDetailsMargin: number = 56;
const habitDetailsPadding: number = 6;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: screenWidth,
    height: screenHeight,
    opacity: 0.6,
  },
  habitDetailsContainer: {
    display: "flex",
    flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
  },
  habitDetails: {
    display: "flex",
    paddingVertical: 72,
    flex: 1.5,
  },
  habitDetailsText: {
    fontFamily: "JosefinSans-Regular",
    fontSize: 24,
    lineHeight: 32,
    color: "#fff",
    opacity: 0.5,
    paddingBottom: 14,
    paddingHorizontal: habitDetailsPadding,
    paddingLeft: habitDetailsMargin,
  },
  habitDurationContainer: {
    display: "flex",
    flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
    alignItems: "center",
    justifyContent: "flex-start",
    alignSelf: "stretch",
    width: "100%",
    paddingHorizontal: habitDetailsPadding,
    paddingLeft: habitDetailsMargin,
  },
  fastingStageInfo: {
    paddingHorizontal: habitDetailsPadding,
    paddingLeft: habitDetailsMargin,
  },
  fastingStageInfoText: {
    fontFamily: "Rubik-Regular",
    fontSize: 12,
    lineHeight: 24,
    color: "#fff",
    opacity: 0.5,
    marginRight: 7,
  },
  plantContainer: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  plant: {
    position: "absolute",
    zIndex: -1,
    bottom: 112,
  },
  weekday: {
    fontFamily: "JosefinSans-Regular",
    fontSize: 13,
    lineHeight: 16,
    letterSpacing: 1.5,
    color: "#fff",
    textTransform: "uppercase",
    opacity: 0.4,
  },
  accentSection: {
    height: 137,
    display: "flex",
    flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(78, 70, 126, 0.2)",
    paddingHorizontal: 50,
    marginVertical: 35,
  },
  statsItem: {
    alignItems: "center",
  },
  statsItemDescription: {
    fontFamily: "Rubik-Medium",
    textTransform: "uppercase",
    fontSize: 11,
    lineHeight: 17,
    color: "#fff",
    opacity: 0.5,
  },
  statsItemValue: {
    fontFamily: "Rubik-Regular",
    fontSize: 28,
    marginTop: 7,
    color: "#fff",
  },
  statsItemPeriod: {
    fontFamily: "Rubik-Regular",
    fontSize: 12,
    lineHeight: 24,
    color: "#fff",
    textTransform: "lowercase",
    opacity: 0.5,
  },
  tabs: {
    display: "flex",
    flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
    alignItems: "center",
    marginTop: 15,
    paddingHorizontal: 42,
    marginBottom: 24,
  },
  tabContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  tabText: {
    fontFamily: "JosefinSans-SemiBold",
    fontSize: 20,
    lineHeight: 20,
    letterSpacing: 1.5,
    color: "#fff",
    opacity: 0.4,
    textTransform: "uppercase",
    marginBottom: 12,
  },
  tabTextActive: {
    opacity: 1,
  },
  tabActiveIndicator: {
    height: 2,
    borderRadius: 4,
    backgroundColor: "#fff",
    opacity: 0.66,
  },
  routineDateContainer: {
    flexDirection: "column",
    position: "relative",
    paddingHorizontal: habitDetailsMargin,
  },
  routineSeparator: {
    width: "25%",
    position: "absolute",
    height: 4,
    backgroundColor: "white",
    marginTop: -28,
    marginLeft: habitDetailsMargin,
  },
  routinePeriodDuration: {
    flexShrink: 0,
    flexGrow: 0,
    width: "30%",
    textAlign: "center",
    alignItems: "center",
  },
  routinePeriodDeleteButton: {
    flexShrink: 0,
    flexGrow: 0,
    width: "7%",
    textAlign: "right",
    alignItems: "flex-end",
    opacity: 0.4,
  },
  buttonContainer: {
    alignSelf: "stretch",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 0.0855 * screenHeight,
  },
});
