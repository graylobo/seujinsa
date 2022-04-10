import { Interface } from "readline";
import { atom } from "recoil";

const menuState = atom<boolean>({
  key: "menuState",
  default: false,
});


 export interface ITimerProps{
  id:number,
  content?:string
}
const timerComponentCount = atom<ITimerProps[]>({
  key: "timerComponentCount",
  default: [],
});

export { menuState, timerComponentCount };
