/**
 * @Date 2021-11-30 09:27:47
 * @Remark
 */

// lib
import { GoEasyMessage } from "goeasy";
// config
// script & methods & public
import logUtils from "@/utils/logUtils";
import notification from "@/components/Notice/notification";
// http
// api
// interface && type && class
// 其它

function notificationMessage(str: string) {
  if (window.Notification) {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf("safari") !== -1) {
      if (ua.indexOf("chrome") > -1) {
        // Chrome
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            const n = new Notification("桌面推送", {
              body: str,
              icon: "../../style/img/logo.jpg",
            });

            n.onclick = () => {
              logUtils.log("点击");
              n.close();
            };
          } else {
            Notification.requestPermission();
            logUtils.log("没有权限,用户拒绝:Notification");
          }
        });
      } else {
        // Safari
        Notification.requestPermission((permission) => {
          if (permission === "granted") {
            const n = new Notification("桌面推送", {
              body: "这是我的第一条桌面推送",
              icon: "some/icon/url",
            });

            n.onclick = () => {
              logUtils.log("点击");
              n.close();
            };
          } else {
            Notification.requestPermission();
            logUtils.log("没有权限,用户拒绝:Notification");
          }
        });
      }
    }
  } else {
    logUtils.log("不支持Notification");
  }
}
// 推送监听处理
function messageListener(message: GoEasyMessage) {
  const str: string = message.content;
  try {
    notification.info("您有新的消息", str);
    notificationMessage(str);
  } catch (error) {
    logUtils.error("push json error", error);
  }
}

export default {
  messageListener,
};
