import "../../styles/globals.css";
import type { AppProps } from "next/app";
import Navigation from "../common/components/Navigation";
import Head from "next/head";
import { RecoilRoot } from "recoil";
import More from "../common/components/More";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import FooterBar from "../common/components/FooterBar";
import Script from "next/script";

function MyApp({ Component, pageProps }: AppProps) {
  const [menu, setMenu] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMenu(false);
  }, [router]);
  return (
    <div>
      <Head>
        <title>스진사</title>
      </Head>
      <Script src="//cdn.jsdelivr.net/npm/katex@0.13.3/dist/katex.min.js"></Script>
      <Script src="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.7.2/build/highlight.min.js"></Script>
      <Script src="//cdn.quilljs.com/1.3.6/quill.min.js"></Script>
      <RecoilRoot>
        <div className="flex flex-col ">
          <div className=" w-full px-[30px] max-w-[700px] min-w-[300px] min-h-[50px] self-center">
            <Navigation setMenu={setMenu} />
          </div>
          <div className="self-center w-full max-w-[700px] min-w-[300px]">
            {!menu ? <Component {...pageProps} /> : <More />}
          </div>
          <FooterBar />
        </div>
      </RecoilRoot>
    </div>
  );
}

export default MyApp;
