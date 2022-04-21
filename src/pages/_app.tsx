import "../../styles/globals.css";
import type { AppProps } from "next/app";
import Navigation from "../common/components/Navigation";
import Head from "next/head";
import { RecoilRoot } from "recoil";
import More from "../common/components/More";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import FooterBar from "../common/components/FooterBar";

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
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/staricon.ico" />
        <link
          href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp"
          rel="stylesheet"
        ></link>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
        />
      </Head>
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
