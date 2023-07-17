import { useRouter } from "next/router";
import React, { useEffect } from "react";
import styled from "styled-components";

interface IProps {
  type?: "vertical" | "horizontal";
}

function GoogleAds({ type = "horizontal" }: IProps) {
  const router = useRouter();
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.log("구글애드-error", error);
    }
  }, []);

  return (
    <>
      {type === "vertical" ? (
        <AdsContainer
          className="adsbygoogle"
          data-ad-client="ca-pub-1544015487048934"
          data-ad-slot="6577096579"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></AdsContainer>
      ) : (
        <AdsContainer
          className="adsbygoogle"
          data-ad-client="ca-pub-1544015487048934"
          data-ad-slot="3225843573"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></AdsContainer>
      )}
    </>
  );
}

export default GoogleAds;
const AdsSection = styled.section`
  display: flex;
  justify-content: center;
`;

const AdsContainer = styled.ins`
  width: 100%;
  display: flex;
  justify-content: center;
`;
