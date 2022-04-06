import "../../styles/globals.css";
import type { AppProps } from "next/app";
import Navigation from "../common/components/Navigation";
import Head from "next/head";
import { RecoilRoot } from "recoil";
import More from "../common/components/More";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const [menu, setMenu] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setMenu(false);
  }, [router]);
  return (
    <div className="flex justify-center  ">
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
      <div className="flex justify-center w-[800px]  ">
        <div>
          <RecoilRoot>
            <Navigation setMenu={setMenu} />
            {!menu ? <Component {...pageProps} /> : <More />}
          </RecoilRoot>
        </div>
      </div>
    </div>
  );
}

export default MyApp;
