import { message } from "antd";

export default function throttle(func, wait) {
  let previous = 0;
  return function () {
    let now = Date.now();
    let context = this;
    let args = arguments;
    if (now - previous > wait) {
      func.apply(context, args);
      return (previous = now);
    }

    message.warn(`发布时间太快,请您30秒后再重试`);
  };
}
