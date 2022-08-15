import { jsx } from "@emotion/react";
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
    [index: string]: number;
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
  position?: string;
  nickName?: string;
  level?: string;
  standardTier?: "string";
  platform?: { afreeca: string; elo: string; youtube: string; twitch: string };
};

export type QnAProps = {
  _id: string;
  emailID?: string;
  nickName?: string;
  date: string;
  title: string;
  body: string;
};

export type SearchProps = {
  inputText: string;
  race: string;
  tier: string;
  onair: boolean;
  thumbnail: boolean;
  spon: boolean;
  recordExist: boolean;
  univ: string;
  neon:boolean;
};

const menuState = atom<boolean>({
  key: "menuState",
  default: false,
});
const isMobileState = atom<boolean>({
  key: "isMobileState",
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

// 서버에서 받아온 게이머 정보
const gamerState = atom<GamerInfoType>({
  key: "gamerState",
  default: { _id: "" },
});

const topTenGamerList = atom<GamerInfoType[]>({
  key: "topTenGamerList",
  default: [],
});

const logoutState = atom<boolean>({
  key: "logoutState",
  default: false,
});

const qnaInfoState = atom<QnAProps>({
  key: "qnaInfoState",
  default: {
    _id: "",
    emailID: "",
    nickName: "",
    date: "",
    title: "",
    body: "",
  },
});

const searchState = atom<SearchProps>({
  key: "searchState",
  default: {
    inputText: "",
    race: "",
    tier: "",
    onair: false,
    thumbnail: true,
    spon: false,
    recordExist: false,
    univ: "",
    neon:false,
  },
});

interface LoadingProps {
  loading: boolean;
  msg?: string;
}

const loadingState = atom<LoadingProps>({
  key: "loadingState",
  default: { loading: false, msg: "" },
});

const themeState = atom({
  key: "themeState",
  default: "dark",
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

interface PopupProps {
  show: boolean;
  component?: (...args: any) => JSX.Element | null;
  content?: any;
}
const popupState = atom<PopupProps>({
  key: "popupState",
  default: {
    show: false,
    component: () => null,
    content: null,
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
  isMobileState,
  qnaInfoState,
  topTenGamerList,
  searchState,
  loadingState,
  themeState,
  popupState,
};

export type { PopupProps };
