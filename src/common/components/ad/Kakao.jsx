import React, { useEffect } from "react";

export default function Kakao() {
  useEffect(() => {
    window.adfit && window.adfit();
  }, []);

  return (
    <div className="w-full max-w-[700px] flex mx-auto">
      <ins
        className="kakao_ad_area"
        style={{ display: "none" }}
        data-ad-unit="DAN-LX59cjGc51obvUKD"
        data-ad-width="320"
        data-ad-height="100"
      ></ins>
    </div>
  );
}
