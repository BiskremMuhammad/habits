/**
 * @author Muhammad Omran
 * @date 12-05-2021
 * @description implement some utility functions to deal with enum types
 */

/**
 * to get the key pair of a known value in the enum
 *
 * @param {T} myEnum the enum to get key by the value
 * @param {string} enumValue the value to search for in the enum
 * @returns {string} the key pair of the value
 */
export function getEnumKeyByEnumValue<T extends { [index: string]: string }>(
  myEnum: T,
  enumValue: string
): keyof T | undefined {
  let keys = Object.keys(myEnum).filter((x) => myEnum[x] == enumValue);
  return keys.length > 0 ? keys[0] : undefined;
}
