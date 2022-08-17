import "../../styles/globals.css";
import "../../styles/pc.scss";
import "../../styles/mobile.scss";
import Navigation from "../common/components/Navigation";
import Head from "next/head";
import { RecoilRoot, useRecoilValue } from "recoil";
import More from "../common/components/More";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import FooterBar from "../common/components/FooterBar";
import Script from "next/script";
import Loading from "../common/components/shared/Loading";
import { loadingState } from "../common/recoil/states";
import Popup from "../common/components/popup/base/Popup";

function MyApp({ Component, pageProps }) {
  const [menu, setMenu] = useState(false);
  const router = useRouter();
  useEffect(() => {
    var ads = document.getElementsByClassName("adsbygoogle").length;
    for (var i = 0; i < ads; i++) {
      try {
        (adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {}
    }
  }, []);
  useEffect(() => {
    if (window.adfit) {
      window.adfit() && window.adfit().render();
    }
    setMenu(false);
  }, [router]);
  return (
    <div className="">
      <Head>
        <title>스진사 스타티어표</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link rel="icon" href="/staricon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
          crossOrigin="anonymous"
        />
        <link
          href="//cdn.jsdelivr.net/npm/katex@0.13.3/dist/katex.min.css"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.7.2/build/styles/default.min.css"
        />
        <link rel="stylesheet" href="//cdn.quilljs.com/1.3.6/quill.snow.css" />
      </Head>

      {/* <Script src="../path/to/flowbite/dist/flowbite.bundle.js"></Script> */}
      
      <Script
        type="text/javascript"
        onError={(e) => {
          console.error("Daum Script failed to load", e);
        }}
        src="//t1.daumcdn.net/kas/static/ba.min.js"
        async
      ></Script>
      <Script src="//cdn.jsdelivr.net/npm/katex@0.13.3/dist/katex.min.js"></Script>
      <Script src="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.7.2/build/highlight.min.js"></Script>
      <Script src="//cdn.quilljs.com/1.3.6/quill.min.js"></Script>
      <RecoilRoot>
        <div className="flex flex-col ">
          <Navigation setMenu={setMenu} />
          <div className=" w-full  min-w-[300px] ">
            <Loading/>
            {!menu ? <Component {...pageProps} /> : <More />}
            <Popup/>
          </div>
          <FooterBar />
        </div>
      </RecoilRoot>
    </div>
  );
}

export default MyApp;
