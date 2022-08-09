import React, { useState } from "react";
import styled from "@emotion/styled";
import { SetterOrUpdater, useRecoilState, useSetRecoilState } from "recoil";
import { PopupProps, popupState } from "../../recoil/states";

const Wrapper = styled.main`
  display: flex;
  justify-content: center;

  .container {
    width: 90vw;
    height: 90vw;
    max-width:500px;
    max-height:200px;
    border-radius: 10px;
    border:1px solid white;
    background-color:black;
    opacity:0.9;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
   
    .title {
      font-size: 25px;
      margin-top: 20px;
      margin-bottom: 20px;
    }
    .content{
      display:flex;
      flex-direction:column;
      align-items:center;
    }
    .close{
      position:absolute;
      top:17px;
      right:0;
    }
  }
`;
export default function TierInfoPopup() {
  const [popup, setPopup] = useRecoilState(popupState);

  return (
    <Wrapper>
      <div className="container">
        <div className="title">티어표 정보</div>
        <div className="content">
          <div>
            티어표 상대전적 데이터 출처: <a href="http://eloboard.com" target="_blank"> http://eloboard.com </a>
          </div>
          <div>아프리카 정보 1~2분 주기 갱신</div>
          <div>상대전적데이터 1일 주기 갱신</div>
        </div>
        <div>
            
        </div>

        <div
          className="close"
          onClick={() => {
            setPopup({ ...popup, show: false });
          }}
        >
         X
        </div>
      </div>
    </Wrapper>
  );
}
