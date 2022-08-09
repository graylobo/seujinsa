import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { popupState } from "../../../recoil/states";
import styled from "@emotion/styled";

const Wrapper = styled.main`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  z-index: 1000;
  .popup {
    &.active {
      display: "";
    }
    &.deactive {
      display: none;
      transition: opacity 0.2s ease-in-out;
    }
  }
`;
export default function Popup() {
  const popup = useRecoilValue(popupState);

  return (
    <Wrapper>
      <div className={`popup ${popup.show ? "active" : "deactive"}`}>{popup.component ? <popup.component /> : <></>}</div>
    </Wrapper>
  );
}
