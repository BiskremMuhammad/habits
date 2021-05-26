/**
 * @author Muhammad Omran
 * @date 26-05-2021
 * @description implement util functions that is related to dealing with date and time
 */

/**
 * helper function that returns month total number of days
 *
 * @param {number} month the month to get total number of days to 31, 30, 29, or 28
 * @param {number} year the year of the month
 * @returns {number} the number of the days in the month
 */
export function getDaysInMonth(month: number, year: number) {
  // 0 = last day of the previous month
  return new Date(year, month + 1, 0).getDate();
}
