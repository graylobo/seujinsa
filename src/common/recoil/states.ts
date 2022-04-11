import { atom, DefaultValue, selector } from "recoil";
import { DefaultProps } from "vue/types/options";
import {OptionProp} from "../utils/tts"


export interface ITimerProps{
  id:number,
  content:string,
  hour?:string,
  minute?:string,
  second?:string
}
const menuState = atom<boolean>({
  key: "menuState",
  default: false,
});

const timerRunningState = atom<boolean>({
  key:"timerRunningState",
  default:false
})

const buildAlertLanguage=atom<OptionProp>({
  key:"buildAlertLanguage",
  default:{lang:"ko-KR"}
})

const timerState = atom<ITimerProps[]>({
  key: "timerState",
  default: [],
});

const timerSelector = selector<ITimerProps[]>({
  key:"timerSelector",
  get:({get})=>{
    return get(timerState);
  },
  set:({set},timer)=>{
    set(timerState,(prev)=>{
      timer = timer.map((e)=>{
        if(e.hour>=24){
          return {...e,hour:23}
        }
        if(e.minute>=60){
          return {...e,minute:59}
        }
        if(e.second>=60){
          return {...e,second:59}
        }
        else{
          return e
        }
      })
      return [...timer]
    })

  }
})
export { menuState, timerState,timerRunningState,buildAlertLanguage,timerSelector };
