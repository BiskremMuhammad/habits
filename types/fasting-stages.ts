/**
 * @author Muhammad Omran
 * @date 07-07-2021
 * @description define fasting habit stages
 */

/**
 * define the different stages of fasting
 *
 * @enum
 * @exports
 */
export enum FastingStages {
  STARTING = "STARTING",
  LOWERING = "LOWERING",
  STABILIZING = "STABILIZING",
  BURN = "BURN",
  KETOSOS = "KETOSOS",
  AUTOPHAGY = "AUTOPHAGY",
  AUTOPHAGY_TWO = "AUTOPHAGY_TWO",
  FULL_DAY = "FULL_DAY",
}

/**
 * enum that defines the Label for each fasting stage
 *
 * @enum
 * @exports
 */
export enum FastingStagesLabels {
  STARTING = "Starting",
  LOWERING = "Blood Sugar+",
  STABILIZING = "Blood Sugar=",
  BURN = "Fat Burn",
  KETOSOS = "Ketosis",
  AUTOPHAGY = "Autophagy",
  AUTOPHAGY_TWO = "Autophagy II",
  FULL_DAY = "Full Day",
}
