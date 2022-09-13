import { Html, Head, Main, NextScript } from "next/document";
import { GA_TRACKING_ID } from "../lib/gtag";

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="keywords" content="티어표, 스진사, 스타크래프트, 스타티어표, 스타티어, 티어, 스타대학, 스타대학교"></meta>
        <meta name="description" content="티어표, 스진사, 스타크래프트, 스타티어표, 스타티어, 티어, 스타대학, 스타대학교"></meta>

        <meta property="og:title" content="스진사" />
        <meta property="og:description" content="티어표, 스진사, 스타크래프트, 스타티어표, 스타티어, 티어, 스타대학, 스타대학교" />
        <meta property="og:url" content="https://seujinsa.com" />
        <meta property="og:image" content="https://downloadwap.com/thumbs2/wallpapers/p2ls/2019/misc/45/s9lop99613103199.jpg" />
        <meta name="naver-site-verification" content="547764876549458d441fe09377c3fd122d74e96b" />

        <meta name="google-site-verification" content="4q1tSg31U51-TgnZXjup14H9acNB7TuV-yHWC9g5X4s" />
        <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
        <body>
          <Main />
          <NextScript />
        </body>
      </Head>
    </Html>
  );
}
