import React, { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { timerState, timerRunningState, buildAlertLanguage, isMobileState } from "../../recoil/states";
import TimerComponent from "./TimerComponent";
import { success } from "../../utils/toast";
import { ToastContainer } from "react-toastify";
import HeadMeta from "./shared/HeadMeta";
import GoogleAds from "./ad/GoogleAds";

export default function BuildAlert() {
  const [timer, setTimer] = useRecoilState(timerState);
  const [timerRunning, setTimerRunning] = useRecoilState(timerRunningState);
  const [lang, setLang] = useRecoilState(buildAlertLanguage);
  const [largestTime, setLargestTime] = useState(0);
  const [timerVal, setTimerVal] = useState();

  const isMobile = useRecoilValue(isMobileState);
  const nextId: number = timer.length > 0 ? timer[timer.length - 1].id + 1 : 0;
  const buttonCss = "border-2  h-[50px] min-w-[100px]  border-blue-700 rounded-[10px] inline-block absolute";

  function getMostLargeTimer(timer: any) {
    const result = timer.reduce((acc: any, cur: any) => {
      let accTime = Number(acc.second || 0) + Number(acc.minute || 0) * 60 + Number(acc.hour || 0) * 60 * 60;
      let curTime = Number(cur.second || 0) + Number(cur.minute || 0) * 60 + Number(cur.hour || 0) * 60 * 60;
      if (accTime > curTime) {
        return acc;
      }
      return cur;
    });
    const largestTime = Number(result.second || 0) + Number(result.minute || 0) * 60 + Number(result.hour || 0) * 60 * 60;
    setLargestTime(largestTime);
  }

  useEffect(() => {
    if (timerRunning) {
      let timers: any = setTimeout(() => {
        success("전체 타이머가 종료되었습니다.");
        setTimerRunning(false);
      }, largestTime * 1000 + 500);
      setTimerVal(timers);
    } else {
      if (timerVal) {
        clearTimeout(timerVal);
      }
    }
  }, [largestTime, timerRunning]);

  const props = {
    title: "빌드알리미",
    description: "스타크래프트,스타빌드,저그빌드,프로토스빌드,테란빌드",
    url: "https://seujinsa.com/build-alert",
  };
  return (
    <main className="mt-[76px] ">
      <HeadMeta {...props} />
      <ToastContainer />
      <aside className={`w-[${isMobile ? "320" : "728"}px] mx-auto`}>
        <ins className="kakao_ad_area" style={{ display: "none" }} data-ad-unit="DAN-GERqb0PPhs1jZcLi" data-ad-width="320" data-ad-height="100"></ins>
      </aside>
      <aside className={`w-[${isMobile ? "320" : "728"}px] mx-auto`}>
        <GoogleAds />
      </aside>
      <div className="mt-[50px]">
        <div className="mx-auto mb-[30px] w-full max-w-[580px]  relative h-[50px]">
          <button
            className={`${buttonCss} `}
            onClick={() => {
              setTimer([...timer, { id: nextId, content: "" }]);
            }}
          >
            타이머 추가
          </button>
          <button
            className={`${buttonCss} left-[120px]`}
            onClick={() => {
              if (timer.length <= 0) {
                alert("타이머를 추가해주세요.");
              } else {
                let checkContentEmpty = false;
                let checkTimerEmpty = false;
                let timeCheck = 0;
                timer.map((e) => {
                  if (!e.content) {
                    checkContentEmpty = true;
                  }
                  timeCheck = Number(e.hour || "0") + Number(e.minute || "0") + Number(e.second || "0");
                  if (timeCheck <= 0 || !timeCheck) {
                    checkTimerEmpty = true;
                  }
                });
                if (checkContentEmpty || checkTimerEmpty) {
                  checkContentEmpty && alert("알림내용이 설정되지 않은 타이머가 존재합니다.");
                  checkTimerEmpty && alert("시간이 설정되지 않은 타이머가 존재합니다.");
                } else {
                  getMostLargeTimer(timer);
                  setTimerRunning(!timerRunning);
                }
              }
            }}
          >
            {timerRunning ? "중지" : "시작"}
          </button>
          <select
            className="w-[70px] absolute right-0 top-[12px] text-black"
            id="select-lang"
            onChange={(e) => {
              setLang({ lang: e.target.value });
            }}
          >
            <option value="ko-KR">한국어</option>
            <option value="en-US">영어</option>
          </select>
        </div>

        {timer.map((e, i) => (
          <section className="timer-component mb-[10px] w-full h-[70px] text-black" key={i}>
            <TimerComponent id={e.id}></TimerComponent>
          </section>
        ))}
      </div>
      <style jsx>{`
        @media (max-width: 500px) {
          .timer-component {
            height: 130px;
          }
        }
      `}</style>
    </main>
  );
}
