import React, { useEffect, useState } from "react";
import styled from "styled-components";

export default function OptionModal(props: any) {
  const [optionState, setOptionState] = useState(props.optionState);
  const [marketState, setMarketState] = useState(props.marketState);

  useEffect(() => {
    if (Number(optionState.width) > 100) {
      alert("길이는 100을 초과할 수 없습니다.");
      setOptionState({ ...optionState, width: "100" });
    }
    if (Number(optionState.height) > 100) {
      alert("높이는 100을 초과할 수 없습니다.");
      setOptionState({ ...optionState, height: "100" });
    }
  }, [optionState]);
  return (
    <Wrapper>
      <div id="background"></div>
      <div id="option-box">
        <div id="option-container">
          <div className="option-box">
            <span>가로길이: </span>
            <input
              placeholder={"길이"}
              type="number"
              value={optionState.width}
              max={100}
              min={10}
              onChange={(e) => {
                setOptionState({ ...optionState, width: e.target.value });
              }}
            />
          </div>
          <div className="option-box">
            <span>세로길이: </span>

            <input
              placeholder={"높이"}
              type="number"
              max={100}
              min={10}
              value={optionState.height}
              onChange={(e) => {
                setOptionState({ ...optionState, height: e.target.value });
              }}
            />
          </div>
          <div id="position-container">
            <div>화면정렬: </div>
            <div className="option-box">
              <input
                defaultChecked={props.optionState.position === "horizontal"}
                type="radio"
                id="horizontal"
                name="direction"
                value={"horizontal"}
                onChange={(e) => {
                  setOptionState({ ...optionState, position: e.target.value });
                }}
              />
              <label htmlFor="horizontal">가로</label>
            </div>
            <div className="option-box">
              <input
                defaultChecked={props.optionState.position === "vertical"}
                type="radio"
                id="vertical"
                value={"vertical"}
                name="direction"
                onChange={(e) => {
                  setOptionState({ ...optionState, position: e.target.value });
                }}
              />
              <label htmlFor="vertical">세로</label>
            </div>
          </div>
          <div id="market-container">
            <label htmlFor="naver">
              <input
                type="checkbox"
                id="naver"
                checked={marketState.naver}
                onChange={(e) => {
                  setMarketState({ ...marketState, naver: e.target.checked });
                }}
              />
              네이버
            </label>
            <label htmlFor="google">
              <input
                type="checkbox"
                id="google"
                checked={marketState.google}
                onChange={(e) => {
                  setMarketState({ ...marketState, google: e.target.checked });
                }}
              />
              구글
            </label>
            <label htmlFor="coupang">
              <input
                type="checkbox"
                id="coupang"
                checked={marketState.coupang}
                onChange={(e) => {
                  setMarketState({ ...marketState, coupang: e.target.checked });
                }}
              />
              쿠팡
            </label>
            <label htmlFor="gmarket">
              <input
                type="checkbox"
                id="gmarket"
                checked={marketState.gmarket}
                onChange={(e) => {
                  setMarketState({ ...marketState, gmarket: e.target.checked });
                }}
              />
              지마켓
            </label>
            <label htmlFor="auction">
              <input
                type="checkbox"
                id="auction"
                checked={marketState.auction}
                onChange={(e) => {
                  setMarketState({ ...marketState, auction: e.target.checked });
                }}
              />
              옥션
            </label>
            <label htmlFor="lotteon">
              <input
                type="checkbox"
                id="lotteon"
                checked={marketState.lotteon}
                onChange={(e) => {
                  setMarketState({ ...marketState, lotteon: e.target.checked });
                }}
              />
              롯데온
            </label>
            <label htmlFor="eleven">
              <input
                type="checkbox"
                id="eleven"
                checked={marketState.eleven}
                onChange={(e) => {
                  setMarketState({ ...marketState, eleven: e.target.checked });
                }}
              />
              11번가
            </label>
            <label htmlFor="homeplus">
              <input
                type="checkbox"
                id="homeplus"
                checked={marketState.homeplus}
                onChange={(e) => {
                  setMarketState({ ...marketState, homeplus: e.target.checked });
                }}
              />
              홈플러스
            </label>
            <label htmlFor="wmp">
              <input
                type="checkbox"
                id="wmp"
                checked={marketState.wmp}
                onChange={(e) => {
                  setMarketState({ ...marketState, wmp: e.target.checked });
                }}
              />
              위메프
            </label>
            <label htmlFor="shoppinghow">
              <input
                type="checkbox"
                id="shoppinghow"
                checked={marketState.shoppinghow}
                onChange={(e) => {
                  setMarketState({ ...marketState, shoppinghow: e.target.checked });
                }}
              />
              쇼핑하우
            </label>
          </div>

          <div className="save-box">
            <Button
              onClick={() => {
                props.setOptionState(optionState);
                props.setMarketState(marketState);
                localStorage.setItem("marketState", JSON.stringify(marketState));
                localStorage.setItem("optionState", JSON.stringify(optionState));
                alert("설정값이 적용되었습니다.");
                props.setOptionModalOpen(false);
              }}
            >
              저장
            </Button>
            <Button
              onClick={() => {
                props.setOptionModalOpen(false);
              }}
            >
              닫기
            </Button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
const Button = styled.button`
  border: 1px solid lightgray;
  padding: 5px;
  border-radius: 5px;
`;

const Wrapper = styled.main`
  [type="checkbox"] {
    vertical-align: middle;
  }
  #background {
    position: fixed;
    top: 0;
    left: 0;
    background-color: gray;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.5;
    z-index: 1;
  }
  #option-box {
    width: 100vw;
    height: 100vh;
    position: absolute;
  }
  #position-container {
    display: flex;
  }
  #option-container {
    padding: 10px;
    font-size: 13px;
    border-radius: 10px;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    min-width: 220px;
    min-height: 230px;
    width: 30%;
    height: 30%;
    opacity: 0.9;
    background-color: white;
    z-index: 100;
    display: flex;
    gap: 10px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .save-box {
      display: flex;
      gap: 5px;
      margin-top: 10px;
    }
  }
`;
