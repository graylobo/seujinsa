import { Html, Head, Main, NextScript } from "next/document";
import { useEffect } from "react";

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="keyword"
          content="티어표,스진사,스타크래프트,스타티어표,스타티어,티어"
        ></meta>
        <meta name="description" content="스타에 진심인 사이트"></meta>
        <meta
          name="naver-site-verification"
          content="fce13107c51b22bb838ea06ae37d5531c60ed48a"
        />
        <meta
          name="google-site-verification"
          content="CHA780ClBXdq8NB9A7TUy6iISn-kvimrkWCcyZ1f4y8"
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1544015487048934"
          onError={(e) => {
            console.error("Google Script failed to load", e);
          }}
          crossOrigin="anonymous"
        ></script>
        <body>
          <Main />
          <NextScript />
        </body>
      </Head>
    </Html>
  );
}
