import { SplashScreen } from "@capacitor/splash-screen";
import ClipboardJS from "clipboard";
import nodes from "./components";
import { OneSignalInit, sendNotification } from "./utils";

new ClipboardJS(".copybtn");
SplashScreen.hide();
OneSignalInit();

nodes.sendNotiBtn.addEventListener("click", (e) => {
  nodes.backdrop.style.display = "block";
  nodes.close.style.display = "block";
});

nodes.close.addEventListener("click", (e) => {
  e.stopPropagation();
  nodes.backdrop.style.display = "none";
  nodes.close.style.display = "none";
});

nodes.confirm.addEventListener("click", sendNotification);
