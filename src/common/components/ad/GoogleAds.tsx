import { useRouter } from "next/router";
import React, { useEffect } from "react";

function GoogleAds() {
  const router = useRouter();
  useEffect(() => {
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch (error) {
        console.log('googleAd-error',error)
    }
  }, [router]);
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

export default GoogleAds;
