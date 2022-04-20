import { atom, DefaultValue, selector } from "recoil";
import { OptionProp } from "../utils/tts";

export interface ITimerProps {
  id: number;
  content: string;
  hour?: string;
  minute?: string;
  second?: string;
}

interface IUserInfo {
  isLogin: boolean;
  _id?: string;
  votePoint: any;
  nickName?: string;
  introduction?: string;
}
export type GamerInfoType = {
  _id: string;
  point?: {
    zero: number;
    one: number;
    two: number;
    three: number;
    four: number;
    five: number;
    six: number;
    seven: number;
    eight: number;
    nine: number;
    ten: number;
  };
  race?: string;
  university?: string;
  totalPoint?: number;
  nickName?: string;
};
const menuState = atom<boolean>({
  key: "menuState",
  default: false,
});

const timerRunningState = atom<boolean>({
  key: "timerRunningState",
  default: false,
});

const userInfoState = atom<IUserInfo>({
  key: "userInfoState",
  default: { _id: "", votePoint: {}, isLogin: false },
});

const buildAlertLanguage = atom<OptionProp>({
  key: "buildAlertLanguage",
  default: { lang: "ko-KR" },
});

const timerState = atom<ITimerProps[]>({
  key: "timerState",
  default: [],
});

const gamerState = atom<GamerInfoType>({
  key: "gamerState",
  default: { _id: "" },
});

const logoutState = atom<boolean>({
  key: "logoutState",
  default: false,
});

const timerSelector = selector<ITimerProps[]>({
  key: "timerSelector",
  get: ({ get }) => {
    return get(timerState);
  },
  set: ({ set }, timer) => {
    let timerCopy = timer as ITimerProps[];
    set(timerState, (prev) => {
      timerCopy = timerCopy.map((e) => {
        if (Number(e.hour) >= 24) {
          return { ...e, hour: "23" };
        }
        if (Number(e.minute) >= 60) {
          return { ...e, minute: "59" };
        }
        if (Number(e.second) >= 60) {
          return { ...e, second: "59" };
        } else {
          return e;
        }
      });
      return [...timerCopy];
    });
  },
});
export {
  menuState,
  timerState,
  timerRunningState,
  buildAlertLanguage,
  timerSelector,
  userInfoState,
  gamerState,
  logoutState,
};
