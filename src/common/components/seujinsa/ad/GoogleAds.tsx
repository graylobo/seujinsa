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
      window.onload = function () {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
      };
    } catch (error) {
      console.log("구글애드-error", error);
    }
  }, [router]);

  switch (type) {
    case "vertical":
      return (
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-1544015487048934"
          data-ad-slot="6577096579"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      );

    case "horizontal":
      return (
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-1544015487048934"
          data-ad-slot="3225843573"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      );
  }
}

export default GoogleAds;
const AdsSection = styled.section`
  width: 100%;
`;
