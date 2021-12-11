/*
 * @Descripttion:
 * @version:
 * @Author: marui
 * @Date: 2021-02-20 16:45:10
 */
declare module "goeasy" {
  export interface GoEasyMessage {
    channel: string;
    content: string;
    time: string;
  }

  const GoEasy: any;
  export default GoEasy;
}
