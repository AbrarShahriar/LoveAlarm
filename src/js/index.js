import { SplashScreen } from "@capacitor/splash-screen";
import OneSignal from "onesignal-cordova-plugin";

const VARIABLES = {
  app_id: "19448945-6c9f-41b7-b493-745490c7db49",
  api_key: "MDI1MTllN2ItYTRlZC00YmQxLWE5MTItZDM5MTY4NDI3MWVk",
};

SplashScreen.hide();

const sendNotiBtn = document.querySelector(".send-noti");
const copy = document.querySelector(".copy");
const uid = document.querySelector(".uid");
const close = document.querySelector(".close");
const backdrop = document.querySelector(".backdrop");
const heart_id_input = document.querySelector(".heart_id_input");
const confirm = document.querySelector(".confirm_btn");

OneSignal.setAppId(VARIABLES.app_id);

OneSignal.setNotificationOpenedHandler(function (jsonData) {
  console.log("notificationOpenedCallback: " + JSON.stringify(jsonData));
});

OneSignal.promptForPushNotificationsWithUserResponse(function (accepted) {
  console.log("User accepted notifications: " + accepted);
});

OneSignal.getDeviceState((res) => {
  uid.value = res.userId;
});

sendNotiBtn.addEventListener("click", (e) => {
  backdrop.style.display = "block";
  close.style.display = "block";
});

close.addEventListener("click", (e) => {
  e.stopPropagation();
  backdrop.style.display = "none";
  close.style.display = "none";
});

confirm.addEventListener("click", (e) => {
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      Authorization: `Basic ${VARIABLES.api_key}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      app_id: VARIABLES.app_id,
      include_player_ids: [heart_id_input.value],
      contents: {
        en: "Someone has rang your LoveAlarm.",
      },
      headings: {
        en: "Check your LoveAlarm app.",
      },
      priority: 10,
      name: "LoveAlarm Notification",
    }),
  };

  fetch("https://onesignal.com/api/v1/notifications", options)
    .then((res) => res.json())
    .then((res) => {
      if (!res.error) {
        alert("Alarm sent successfully!!!");
      } else {
        alert(JSON.stringify(res.error));
      }
    })
    .catch((err) => alert(JSON.stringify(err)));
});

copy.addEventListener("click", (e) => {
  uid.select();
  if (uid.selectRange) {
    uid.selectRange(0, 9999);
  }
  let uidText = uid.value;

  navigator.clipboard.writeText(uidText);
  alert(`copied ${uidText}`);
});
