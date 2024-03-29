import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect, useState } from "react";
import { RecoilRoot } from "recoil";
import "../../public/static/fonts/style.css";
import "../../styles/globals.css";
import "../../styles/mobile.scss";
import "../../styles/pc.scss";
import FooterBar from "../common/components/seujinsa/FooterBar";
import More from "../common/components/seujinsa/More";
import Navigation from "../common/components/seujinsa/Navigation";
import Popup from "../common/components/seujinsa/popup/base/Popup";
import Loading from "../common/components/seujinsa/shared/Loading";
import * as gtag from "../lib/gtag";
import { ProSidebarProvider } from "react-pro-sidebar";
import SideBar from "common/components/navigation/SideBar";
import { QueryClient, QueryClientProvider } from "react-query";

function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient();
  const [menu, setMenu] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (window.adfit) {
      window.adfit() && window.adfit().render();
    }
    setMenu(false);
  }, [router]);

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <div className="">
      <Head>
        <title>서치원</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" />
        <link rel="icon" href="/staricon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
        {/* <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
          crossOrigin="anonymous"
        /> */}
        <link href="//cdn.jsdelivr.net/npm/katex@0.13.3/dist/katex.min.css" rel="stylesheet" />
        <link rel="stylesheet" href="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.7.2/build/styles/default.min.css" />
        <link rel="stylesheet" href="//cdn.quilljs.com/1.3.6/quill.snow.css" />
      </Head>

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
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1544015487048934"
        crossOrigin="anonymous"
        onError={(e) => {
          console.error("AdSence Script failed to load!", e);
        }}
      ></Script>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <ProSidebarProvider>
            <div className="flex flex-col ">
              <Navigation setMenu={setMenu} />
              <div className=" w-[full]  min-w-[300px] ">
                <Loading />
                <SideBar menu={menu} setMenu={setMenu} />
                <Component {...pageProps} />
                <Popup />
              </div>
              {/* <FooterBar /> */}
            </div>
          </ProSidebarProvider>
        </RecoilRoot>
      </QueryClientProvider>
    </div>
  );
}

export default MyApp;
