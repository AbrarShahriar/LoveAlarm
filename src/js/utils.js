import OneSignal from "onesignal-cordova-plugin";
import nodes from "./components";
import { VARIABLES } from "./config";
import { Preferences } from "@capacitor/preferences";

export const select = (selector) => document.querySelector(selector);

export const updateUserId = (newUserId) => {
  nodes.uid.innerText = newUserId || "Please wait a few minutes";
};

export const OneSignalInit = () => {
  OneSignal.setAppId(VARIABLES.app_id);

  OneSignal.addSubscriptionObserver(async (e) => {
    const userId = await Preferences.get({ key: "userId" });
    console.log("addSubscriptionObserver", "Pref get", userId);

    if (!userId.value) {
      await Preferences.set({
        key: "userId",
        // make this e.to.userId
        value: e.from.userId,
      });
      console.log("addSubscriptionObserver", "e", e);
      updateUserId(e.from.userId);
    } else {
      updateUserId(userId.value);
    }
  });

  OneSignal.getDeviceState(async (res) => {
    const userId = await Preferences.get({ key: "userId" });
    console.log("getDeviceState", "Pref get", userId);

    if (!userId.value) {
      await Preferences.set({
        key: "userId",
        value: res.userId,
      });
      console.log("getDeviceState", "set", res);
      updateUserId(res.userId);
    } else {
      updateUserId(userId.value);
    }
  });

  OneSignal.setNotificationOpenedHandler(function (jsonData) {
    console.log("notificationOpenedCallback: " + JSON.stringify(jsonData));
  });

  OneSignal.promptForPushNotificationsWithUserResponse(function (accepted) {
    console.log("User accepted notifications: " + accepted);
  });
};

export const sendNotification = () => {
  if (nodes.heart_id_input.value == "") {
    return alert("Please enter a Heart ID!");
  }

  nodes.confirm.innerText = "Sending...";
  nodes.confirm.disabled = true;

  const reqOptions = {
    method: "POST",
    headers: {
      accept: "application/json",
      Authorization: `Basic ${VARIABLES.api_key}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      app_id: VARIABLES.app_id,
      include_player_ids: [nodes.heart_id_input.value],
      contents: {
        en: "Check your LoveAlarm app.",
      },
      headings: {
        en: "Someone has rang your LoveAlarm.",
      },
      priority: 10,
      name: "LoveAlarm Notification",
    }),
  };

  fetch("https://onesignal.com/api/v1/notifications", reqOptions)
    .then((res) => res.json())
    .then((res) => {
      if (!res.errors) {
        alert("Alarm sent successfully!!!");
      } else {
        alert(JSON.stringify(res.errors[0]));
      }

      nodes.confirm.innerText = "Confirm";
      nodes.confirm.disabled = false;
    })
    .catch((err) => {
      alert(JSON.stringify(err));
      nodes.confirm.innerText = "Confirm";
      nodes.confirm.disabled = false;
    });
};
