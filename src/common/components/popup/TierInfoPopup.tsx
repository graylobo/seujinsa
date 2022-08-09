import React, { useState } from "react";
import styled from "@emotion/styled";
import { SetterOrUpdater, useRecoilState, useSetRecoilState } from "recoil";
import { PopupProps, popupState } from "../../recoil/states";

const Wrapper = styled.main`
  display: flex;
  justify-content: center;

  .container {
    width: 500px;
    height: 500px;
    background-color: darkred;
    border-radius: 10px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    h2 {
      font-size: 20px;
      text-align: center;
    }
    .title {
      font-size: 20px;
      margin-top: 20px;
      margin-bottom: 30px;
    }
  }
`;
export default function TierInfoPopup() {
  const [popup, setPopup] = useRecoilState(popupState);

  return (
    <Wrapper>
      <div className="container">
        <div className="title">티어표 정보</div>
        <div>
          <div>
            * 티어표 상대전적 데이터 출처: <a href="http://eloboard.com"> http://eloboard.com </a>
          </div>
          <div>* 상대전적데이터는 하루주기로 갱신됩니다.</div>
        </div>
        <div>
            
        </div>

        <div
          className=""
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
