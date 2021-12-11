/**
 * @Date 2021-11-29 10:03:40
 * @Remark
 */

// lib
import GoEasy, { GoEasyMessage } from "goeasy";
// config
import { GOEASY } from "@/config/setting";
// public
import logUtils from "@/utils/logUtils";
// biz
import { getEntity, setEntity } from "./entity";

function formatChannel(channel: string | number): string {
  return typeof channel === "number" ? channel.toString() : channel;
}

/**
 * 发送消息
 * @param channel 发送的频道
 * @param message 消息,number类型收到后转化为string
 */
function send(channel: string, message: string | number) {
  const center = getEntity();
  if (!center) return;

  center.publish({
    channel, // 替换为您自己的channel
    message, // 替换为您想要发送的消息内容
  });
}

/**
 * 初始化并连接并订阅
 * @param channel 订阅频道标识
 * @param listener 事件监听方法
 */
function open(channel: string, listener: (message: GoEasyMessage) => void) {
  if (!GOEASY.OPEN) return;
  const mChannel = formatChannel(channel);
  if (mChannel === "") {
    logUtils.error("GoEasy", "channel为空string");
    return;
  }
  const center = GoEasy.getInstance({
    host: GOEASY.HOST,
    appkey: GOEASY.APPKEY,
  });
  setEntity(center);
  center.connect({
    onSuccess: () => {
      logUtils.info("GoEasy", "连接成功");
      // 连接成功后订阅
      center.subscribe({
        channel: mChannel,
        onMessage: (message: GoEasyMessage) => {
          logUtils.info("GoEasy推送", message);
          listener(message);
        },
      });
    },
    onFailed: (error: any) => {
      logUtils.error("GoEasy", "连接失败", error);
    },
    onProgress: (attempts: number) => {
      logUtils.info("GoEasy", "连接或自动重连中", attempts);
    },
  });
}

/**
 * 取消订阅并断开连接
 * @param channel 订阅频道标识
 */
function close(channel: string | number) {
  if (!GOEASY.OPEN) return;
  const center = getEntity();
  if (!center) return;
  const mChannel = formatChannel(channel);
  if (mChannel === "") {
    logUtils.error("GoEasy", "channel为空string");
    return;
  }
  logUtils.info("GoEasy", "开始取消订阅", mChannel);
  center.unsubscribe({
    channel,
    onSuccess: () => {
      logUtils.info("GoEasy", "取消订阅成功");
      // 断开和释放连接
      center.disconnect({
        onSuccess: () => {
          logUtils.info("GoEasy", "断开连接成功");
          setEntity(null);
        },
        onFailed: (error: any) => {
          logUtils.info("GoEasy", "断开连接失败", error);
        },
      });
    },
    onFailed: (error: any) => {
      logUtils.error("GoEasy", "取消订阅失败", error);
    },
  });
}

export default {
  open,
  close,
  send,
};
