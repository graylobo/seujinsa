import React, { useEffect } from "react";
import { css, Global, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 10px;
`;
export default function ZeroTier({ gamerList }: any) {
  return (
    <Wrapper>
      {gamerList.map((e: string) => {
        return (
          <div>
            <img src={`/images/gamer/${e}.png`} alt="" />
            <span>{e}</span>
          </div>
        );
      })}
    </Wrapper>
  );
}
