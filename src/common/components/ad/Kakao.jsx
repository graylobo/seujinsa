import React, { useEffect } from "react";

export default function Kakao() {
  useEffect(() => {
    if (window.adfit) {
      window.adfit() && window.adfit().render();
    }
  }, []);

  return (
    <div className="w-full max-w-[700px] flex mx-auto">
      <ins
        className="kakao_ad_area"
        style={{ display: "none" }}
        data-ad-unit="DAN-aKNS1zqwgWC4KTTv"
        data-ad-width="320"
        data-ad-height="100"
      ></ins>
    </div>
  );
}
