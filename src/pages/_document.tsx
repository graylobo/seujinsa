import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <title>스진사</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta
            name="naver-site-verification"
            content="fce13107c51b22bb838ea06ae37d5531c60ed48a"
          />
          <meta
            name="google-site-verification"
            content="CHA780ClBXdq8NB9A7TUy6iISn-kvimrkWCcyZ1f4y8"
          />
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
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1544015487048934"
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
}

export default MyDocument;
