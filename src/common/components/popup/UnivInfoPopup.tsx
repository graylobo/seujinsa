import React, { useState } from "react";
import styled from "@emotion/styled";
import { useRecoilState, useRecoilValue } from "recoil";
import { popupState, themeState } from "../../recoil/states";

const Wrapper = styled.aside`
  .popup-container {
    width: 400px;
    height: 450px;
    border: 1px solid white;
    background-color: white;
    &.dark{
      background-color: black;
    }
    &.light{
      border :1px solid black;
      font-weight:500;
    }
    opacity: 0.9;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    .univ-name {
      position: absolute;
      top: 20px;
      font-size: 30px;
      &.dark{
        text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #0fa, 0 0 82px #0fa, 0 0 92px #0fa, 0 0 102px #0fa, 0 0 151px #0fa;
      }
    }
    .total {
      position: absolute;
      top: 70px;
    }
    .statistics-info {
      display: flex;
      gap: 50px;
      position: absolute;
      top: 120px;
    }
    .close-button {
      position: absolute;
      cursor: pointer;
      right: 20px;
      top: 20px;
    }
  }
`;

export default function UnivInfoPopup() {
  const [popup, setPopup] = useRecoilState(popupState);
  const theme = useRecoilValue(themeState);

  const content = popup.content[Object.keys(popup.content)[0]];
  console.log(content);
  return (
    <Wrapper>
      <div className={`popup-container ${theme === "dark" ? "dark" : "light"}`}>
        <div className={`univ-name ${theme === "dark" ? "dark" : "light"}`}>{Object.keys(popup.content)}</div>
        <div className="total">총원: {content.total}</div>
        <div className="statistics-info">
          <div className="race-info">
            <div>저그:{content["race"]["zerg"]}</div>
            <div>테란:{content["race"]["terran"]}</div>
            <div>프로토스:{content["race"]["protoss"]}</div>
          </div>

          <div className="tier-info">
            {content["tier"]["갓"] !== 0 && <div>갓: {content["tier"]["갓"]}</div>}
            {content["tier"]["킹"] !== 0 && <div>킹: {content["tier"]["킹"]}</div>}
            {content["tier"]["잭"] !== 0 && <div>잭: {content["tier"]["잭"]}</div>}
            {content["tier"]["조커"] !== 0 && <div>조커: {content["tier"]["조커"]}</div>}
            {content["tier"]["0"] !== 0 && <div>0티어: {content["tier"]["0"]}</div>}
            {content["tier"]["1"] !== 0 && <div>1티어: {content["tier"]["1"]}</div>}
            {content["tier"]["2"] !== 0 && <div>2티어: {content["tier"]["2"]}</div>}
            {content["tier"]["3"] !== 0 && <div>3티어: {content["tier"]["3"]}</div>}
            {content["tier"]["4"] !== 0 && <div>4티어: {content["tier"]["4"]}</div>}
            {content["tier"]["5"] !== 0 && <div>5티어: {content["tier"]["5"]}</div>}
            {content["tier"]["6"] !== 0 && <div>6티어: {content["tier"]["6"]}</div>}
            {content["tier"]["7"] !== 0 && <div>7티어: {content["tier"]["7"]}</div>}
            {content["tier"]["8"] !== 0 && <div>8티어: {content["tier"]["8"]}</div>}
            {content["tier"]["아기"] !== 0 && <div>벌레: {content["tier"]["아기"]}</div>}
          </div>
          <div className="position-info">
            {Object.keys(content.position).map((e) => (
              <div>
                {e}:{content.position[e]}
              </div>
            ))}
          </div>
        </div>

        <div
          className="close-button"
          onClick={() => {
            setPopup({ show: false });
          }}
        >
          X
        </div>
      </div>
    </Wrapper>
  );
}
