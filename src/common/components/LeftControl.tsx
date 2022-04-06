import React, { useEffect, useRef, useState } from "react";

function highLight(word: string, className: string): string {
  let innerHTML = "";
  innerHTML += `<span class='${className}'>${word}</span>`;
  return innerHTML;
}

let combo = 0;
export default function LeftControl() {
  const [keyword, setKeyword] = useState("");
  const [inputWord, setInputWord] = useState("");
  const keywordValue = useRef<any>();
  const inputValue = useRef<any>();
  if (keyword.length < inputWord.length && keyword.length !== 0) {
    inputValue.current.value = inputWord[inputWord.length - 1];
    setInputWord(inputValue.current.value);
  }
  useEffect(() => {
    if (keyword.length !== 0 && keyword.length === inputWord.length) {
      if (keyword === inputWord) {
        combo += 1;
      }
    }
  }, [inputWord]);
  console.log("sadasd");

  return (
    <div className="mt-[100px] flex justify-center  ">
      <div className="border-2 border-black-600 rounded-[30px] p-[30px] w-[700px] flex justify-center flex-col items-center">
        <div>
          <div className="">
            왼손 생산할 키워드 입력 (30/{keyword.length}자)
          </div>
          <input
            type="text"
            className=" w-[300px] h-[50px] border-2 border-black p-[10px] mr-3 outline-blue-600"
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
        </div>
        <div className="text-[30px]">
          {keyword}
          <div>
            {inputWord.split("").map((e, i) => {
              if (e === keyword[i]) {
                return <span className="text-blue-600 text-[30px]">{e}</span>;
              } else {
                if (keyword.length > i && keyword[i] !== undefined) {
                  combo = 0;
                  console.log("11");
                }
                return <span className="text-red-600 text-[30px]">{e}</span>;
              }
            })}
          </div>
        </div>

        <div>
          <input
            type="text"
            className="w-[300px] h-[50px] border-2  p-[10px] mr-3 outline-blue-600"
            ref={inputValue}
            onChange={(e) => {
              setInputWord(e.target.value);
            }}
          />
          <div className="">{combo} Combo</div>
        </div>
      </div>
    </div>
  );
}
