import { Html, Head, Main, NextScript } from "next/document";
import { GA_TRACKING_ID } from "../lib/gtag";

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="keywords" content="계급도,계급표, 티어표, 브랜드 계급"></meta>
        <meta name="description" content="계급도,계급표, 티어표, 브랜드 계급"></meta>
        <meta property="og:title" content="계급도" />
        <meta property="og:description" content="계급표, 티어표, 브랜드 계급" />
        <meta property="og:url" content="https://seujinsa.com" />
        <meta property="og:image" content="https://downloadwap.com/thumbs2/wallpapers/p2ls/2019/misc/45/s9lop99613103199.jpg" />
        <meta name="naver-site-verification" content="547764876549458d441fe09377c3fd122d74e96b" />
        <meta name="msapplication-TileColor" content="#FF98BA"></meta>
        <meta name="google-site-verification" content="4q1tSg31U51-TgnZXjup14H9acNB7TuV-yHWC9g5X4s" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192x192.png"></link>
        <meta name="theme-color" content="#fff" />
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
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
