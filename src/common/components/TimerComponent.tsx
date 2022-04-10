import React, { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { timerComponentCount, ITimerProps } from "../recoil/states";

interface Props {
  id: number;
}
export default function TimerComponent({ id }: Props) {
  const [text, setText] = useState("");
  const [min, setMin] = useState(3);
  const [sec, setSec] = useState(0);
  const time = useRef<number>(180);
  const timerId = useRef<any>(null);
  const [state, setState] = useRecoilState<ITimerProps[]>(timerComponentCount);
  //   useEffect(() => {
  //     timerId.current = setInterval(() => {
  //       setMin(Math.floor(time.current / 60));
  //       setSec(time.current % 60);
  //       time.current -= 1;
  //     }, 1000);

  //     return () => clearInterval(timerId.current);
  //   }, []);

  //   useEffect(() => {
  //     // 만약 타임 아웃이 발생했을 경우
  //     if (time.current <= 0) {
  //       console.log("타임 아웃");
  //       clearInterval(timerId.current);
  //       // dispatch event
  //     }
  //   }, [sec]);
  return (
    <div>
      <input
        type="text"
        className="w-[300px] h-[50px] border-2 border-black p-[10px] rounded-[3px] outline-blue-600"
        value={state.filter((e) => e.id === id)[0].content}
        onChange={(e) => {
          setState(
            state.map((t: ITimerProps) =>
              t.id === id ? { ...t, content: e.target.value } : t
            )
          );
        }}
      />
      <button
        onClick={() => {
          setState(state.filter((e: ITimerProps) => e.id !== id));
        }}
      >
        삭제
      </button>
    </div>
  );
}
