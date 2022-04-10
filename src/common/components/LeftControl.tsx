import React, { useEffect, useRef, useState } from "react";

function highLight(word: string, className: string): string {
  let innerHTML = "";
  innerHTML += `<span class='${className}'>${word}</span>`;
  return innerHTML;
}

let combo = 0;
export default function LeftControl() {
  const [keyword, setKeyword] = useState("");
  const [savedWord, setSavedWord] = useState("");
  const [inputWord, setInputWord] = useState("");
  const [checkBox, setCheckBox] = useState(true);
  const [comboUp, setComboUp] = useState(false);
  const keywordValue = useRef<any>();
  const inputValue = useRef<any>();
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
      }
    }
  }, [inputWord]);
  return (
    <div className="mt-[100px] flex justify-center  ">
      <div className="relative border-2 border-black-600 rounded-[30px]  p-[30px] h-[350px] w-[700px] flex justify-center flex-col items-center">
        <div className="relative">
          <div className="">키워드 입력 (30/{keyword.length}자)</div>
          <input
            type="text"
            className=" w-[300px] h-[50px] border-2 border-black p-[10px] rounded-[3px] outline-blue-600"
            placeholder="왼손 생산할 키워드 입력"
            ref={keywordValue}
            onChange={(e) => {
              if (e.target.value.length > 30) {
                alert("30자 이내로 설정해야 합니다.");
                keywordValue.current.value = "";
                setKeyword("");
              } else {
                setKeyword(e.target.value);
              }
            }}
          />
          <button
            className="absolute right-[-45px] bottom-[15px]"
            onClick={() => {
              if (
                keywordValue.current.value.length < 6 ||
                keywordValue.current.value.length > 30
              ) {
                alert("키워드는 6자이상 30자 이하로 설정해야 합니다.");
                keywordValue.current.value = "";
              } else {
                setSavedWord(keywordValue.current.value);
              }
            }}
          >
            저장
          </button>
        </div>
        <div className="text-[30px] h-[100px]">
          {savedWord}
          <div>
            {inputWord.split("").map((e, i) => {
              if (e === savedWord[i]) {
                return <span className="text-blue-600 text-[30px]">{e}</span>;
              } else {
                if (savedWord.length > i && savedWord[i] !== undefined) {
                  if (checkBox) {
                    inputValue.current.value = "";
                  }
                  combo = 0;
                }
                return <span className="text-red-600 text-[30px]">{e}</span>;
              }
            })}
          </div>
        </div>
        <div className="relative ">
          <input
            type="text"
            className="w-[300px] h-[50px] rounded-[3px] border-2 border-black  p-[10px]   outline-blue-600"
            ref={inputValue}
            onChange={(e) => {
              if (savedWord.length === 0) {
                alert("입력할 키워드를 설정해야 합니다.");
                inputValue.current.value = "";
              } else {
                setInputWord(e.target.value);
              }
            }}
          />
          <div className="absolute right-[-120px] bottom-[10px]">
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
        <div
          className={` absolute bottom-[15px] ${
            comboUp
              ? " transition-text duration-[0.1s] text-[20px]"
              : "transition-text duration-[0.1s] text-[17px] "
          }`}
        >
          {combo} Combos
        </div>
      </div>

      <style jsx>{`
      .active{
        transition:0.05s all
      }
        }
      `}</style>
    </div>
  );
}
