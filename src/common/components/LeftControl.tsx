import React, { useEffect, useRef, useState } from "react";

let combo = 0;
export default function LeftControl() {
  const [keyword, setKeyword] = useState("");
  const [savedWord, setSavedWord] = useState("");
  const [inputWord, setInputWord] = useState("");
  const [checkBox, setCheckBox] = useState(true);
  const [comboUp, setComboUp] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
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

  return (
    <div className="mt-[100px] border-2 border-black-600 rounded-[30px] h-[350px] min-w-[600px] flex flex-col">
      <div className="relative p-[30px] self-center  flex flex-col ">
        <div className="relative self-center mb-[10px]">
          <div className="">키워드 입력 (30/{keyword.length}자)</div>
          <input
            type="text"
            className={`w-[300px] h-[50px] border-2 border-black p-[10px] rounded-[3px] outline-blue-600 ${
              isSaved ? " bg-gray-400" : ""
            }`}
            placeholder="왼손 생산할 키워드 입력"
            readOnly={isSaved}
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
                setIsSaved(!isSaved);
              }
            }}
          >
            {isSaved ? "수정" : "저장"}
          </button>
        </div>
        <div className="relative self-center ">
          <input
            type="text"
            className={`w-[300px] h-[50px] rounded-[3px] border-2 border-black  p-[10px] outline-blue-600 ${
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
        <div className="text-[24px] h-[80px] self-center ">
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
            comboUp
              ? " transition-text duration-[0.1s] text-[20px] text-red-600 font-bold"
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
