import React, { useEffect, useRef, useState } from "react";
import { isMobileState } from "../../recoil/states";
import { useRecoilValue } from "recoil";
import HeadMeta from "./shared/HeadMeta";
import GoogleAds from "./ad/GoogleAds";

let combo = 0;
export default function LeftControl() {
  const [keyword, setKeyword] = useState("");
  const [savedWord, setSavedWord] = useState("");
  const [inputWord, setInputWord] = useState("");
  const [checkBox, setCheckBox] = useState(true);
  const [comboUp, setComboUp] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const isMobile = useRecoilValue(isMobileState);
  const keywordValue = useRef<any>();
  const inputValue = useRef<any>();

  // 키워드 입력 전부 일치시 input 초기화 후 마지막 단어 설정
  if (savedWord.length < inputWord.length && savedWord.length !== 0) {
    inputValue.current.value = inputWord[inputWord.length - 1];
    setInputWord(inputValue.current.value);
  }
  useEffect(() => {
    setComboUp(false);

    if (savedWord.length !== 0 && savedWord.length === inputWord.length) {
      if (savedWord === inputWord) {
        combo += 1;
        setComboUp(true);
        setTimeout(() => {
          setComboUp(false);
        }, 100);
      }
    }
  }, [inputWord]);

  useEffect(() => {
    inputValue.current.value = "";
    setInputWord("");
    combo = 0;
  }, [isSaved]);

  function checkInput(e: any): boolean {
    if (/^([a-zA-Z0-9]+)$/.test(e.target.value)) {
      return true;
    }
    return false;
  }

  const props = {
    title: "왼손생산",
    description: "스타크래프트,왼손생산,스타컨트롤",
    url: "https://seujinsa.com/left-control",
  };

  return (
    <main className="mt-[96px]  h-[350px]  flex flex-col relative">
      <HeadMeta {...props} />
      <aside className={`w-[${isMobile ? "320" : "728"}px] mx-auto`}>
        <ins className="kakao_ad_area" style={{ display: "none" }} data-ad-unit="DAN-aKNS1zqwgWC4KTTv" data-ad-width="320" data-ad-height="100"></ins>
      </aside>

      <aside className={`w-[${isMobile ? "320" : "728"}px] mx-auto`}>
        <GoogleAds />
      </aside>

      <div className="relative p-[30px] self-center  flex flex-col w-full max-w-[550px] ">
        <div className="relative self-center  w-full ">
          <div className="">키워드 입력 (30/{keyword.length}자)</div>
          <input
            type="text"
            className={` h-[50px] border-2 border-black p-[10px] w-full max-w-[500px] text-black rounded-[3px] outline-blue-600 ${
              isSaved ? " bg-gray-400" : ""
            }`}
            placeholder="키워드 입력 (영문/숫자만 가능)"
            readOnly={isSaved}
            ref={keywordValue}
            value={keyword}
            onChange={(e) => {
              if (!checkInput(e)) {
                setKeyword("");
                return;
              }

              if (e.target.value.length > 30) {
                alert("30자 이내로 설정해야 합니다.");
                keywordValue.current.value = "";
                setKeyword("");
              } else {
                setKeyword(e.target.value);
              }
            }}
          />
        </div>
        <div className="mb-[10px]">
          <button
            className="float-right"
            onClick={() => {
              if (keywordValue.current.value.length < 6 || keywordValue.current.value.length > 30) {
                alert("키워드는 6자이상 30자 이하로 설정해야 합니다.");
                keywordValue.current.value = "";
              } else {
                setSavedWord(keywordValue.current.value);
                setIsSaved(!isSaved);
              }
            }}
          >
            {isSaved ? "수정" : "저장"}
          </button>
        </div>
        <div className="relative self-center w-full ">
          <input
            type="text"
            className={` h-[50px] rounded-[3px] border-2 border-black w-full max-w-[500px]  p-[10px] outline-blue-600 ${
              !isSaved ? "bg-gray-400" : ""
            }`}
            ref={inputValue}
            readOnly={!isSaved}
            onPaste={(e) => {
              e.preventDefault();
            }}
            onChange={(e) => {
              if (savedWord.length === 0) {
                alert("입력할 키워드를 설정해야 합니다.");
                inputValue.current.value = "";
              } else {
                setInputWord(e.target.value);
              }
            }}
          />
        </div>
        <div>
          <div className="float-right">
            <input
              type="checkbox"
              id="checkbox"
              checked={checkBox}
              onChange={() => {
                setCheckBox(!checkBox);
              }}
            />
            <label htmlFor="checkbox" className="ml-1">
              틀리면 초기화
            </label>
          </div>
        </div>
        <div className="text-[24px] h-[80px] self-center mt-[30px]">
          {savedWord}
          <div>
            {inputWord.split("").map((e, i) => {
              if (e === savedWord[i]) {
                return <span className="text-blue-600 text-[24px]">{e}</span>;
              } else {
                if (savedWord.length > i && savedWord[i] !== undefined) {
                  if (checkBox) {
                    inputValue.current.value = "";
                  }
                  combo = 0;
                }
                return <span className="text-red-600 text-[24px]">{e}</span>;
              }
            })}
          </div>
        </div>

        <div
          className={`bottom-[15px] self-center  ${
            comboUp ? " transition-text duration-[0.1s] text-[20px] text-red-600 font-bold" : "transition-text duration-[0.1s] text-[17px] "
          }`}
        >
          {combo} Combos
        </div>
      </div>

      <style jsx>{`
      
        }
      `}</style>
    </main>
  );
}
