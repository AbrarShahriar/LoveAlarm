import { select } from "./utils";

const sendNotiBtn = select(".send-noti");
const copybtn = select(".copybtn");
const uid = select(".uid");
const close = select(".close");
const backdrop = select(".backdrop");
const heart_id_input = select(".heart_id_input");
const confirm = select(".confirm_btn");

const nodes = {
  sendNotiBtn,
  copybtn,
  uid,
  close,
  backdrop,
  heart_id_input,
  confirm,
};

export default nodes;
