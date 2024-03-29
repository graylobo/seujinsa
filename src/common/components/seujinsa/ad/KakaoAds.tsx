import { isMobileState } from "common/recoil/states";
import React from "react";
import { useRecoilValue } from "recoil";
interface IProps {
  type?: "vertical" | "horizontal" | "basic";
}
function KakaoAds({ type = "basic" }: IProps) {
  const isMobile = useRecoilValue(isMobileState);

  switch (type) {
    case "horizontal":
      return (
        <ins
          className="kakao_ad_area"
          style={{ display: "none" }}
          data-ad-unit="DAN-orPlGTMAwqXbMtbn"
          data-ad-width={`${isMobile ? "320" : "728"}`}
          data-ad-height="90"
        ></ins>
      );

    case "basic":
      return (
        <ins className="kakao_ad_area" style={{ display: "none" }} data-ad-unit="DAN-GERqb0PPhs1jZcLi" data-ad-width="320" data-ad-height="100"></ins>
      );

    case "vertical":
      return (
        <ins className="kakao_ad_area" style={{ display: "none" }} data-ad-unit="DAN-EiFchUwN5gX30xaD" data-ad-width="160" data-ad-height="600"></ins>
      );
  }
}

export default KakaoAds;
