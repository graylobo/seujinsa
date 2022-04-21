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
          <title>스진s사z</title>
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
