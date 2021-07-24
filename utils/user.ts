/**
 * @author Muhammad Omran
 * @date 23-07-2021
 * @description implement util functions related to current user
 */

import { Platform } from "react-native";
import * as Application from "expo-application";
import v5 from "uuid/v5";

// used on web.
import { v4 as uuidv4 } from "uuid";
import { CONSTANTS } from "./constants";

export async function getInstallationIdManually() {
  let installationId;

  if (["android", "ios"].includes(Platform.OS)) {
    let identifierForVendor;

    if (Platform.OS === "android") {
      identifierForVendor = Application.androidId;
    } else {
      // ios
      identifierForVendor = await Application.getIosIdForVendorAsync();
    }

    const bundleIdentifier = Application.applicationId;

    let identifier: string;
    if (identifierForVendor) {
      identifier = `${bundleIdentifier}-${identifierForVendor}`;
    } else {
      const installationTime = await Application.getInstallationTimeAsync();
      identifier = `${bundleIdentifier}-${installationTime.getTime()}`;
    }
    installationId = v5(identifier, CONSTANTS.UUID_NAMESPACE);
  } else {
    // WEB. random (uuid v4)
    installationId = uuidv4();
  }

  return installationId;
}
