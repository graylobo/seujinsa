import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { popupState, themeState } from "../../../recoil/states";
import styled from "@emotion/styled";

const Wrapper = styled.main`
  display: flex;
  justify-content: center;
  .popup {
    opacity: 0;
    z-index: 1000;
    transition: opacity 0.2s ease-in-out;
    &.active {
      transition: opacity 0.5s ease-in-out;
      opacity: 1;
    }
  }
`;
export default function Popup() {
  const [popup, setPopup] = useRecoilState(popupState);
  
  return (
    <Wrapper>
      <div className={`popup ${popup.show && "active"}`}>{popup.component ? <popup.component/> : <></>}</div>
    </Wrapper>
  );
}
