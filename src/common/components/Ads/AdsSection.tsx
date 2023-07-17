import React from "react";
import KakaoAds from "../seujinsa/ad/KakaoAds";
import GoogleAds from "../seujinsa/ad/GoogleAds";
import styled from "styled-components";

const AdsSection = () => {
  return (
    <Wrapper>
      <KakaoAds type="horizontal" />
      <GoogleAds type="horizontal" />
    </Wrapper>
  );
};

export default AdsSection;

const Wrapper = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
