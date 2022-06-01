import Head from "next/head";
import React from "react";

export default function HeadMeta({ title, description, url, image }: any) {
  console.log("zz", title);
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description}></meta>
      <meta property="og:title" content={title || "스진사"} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url || "https://seujinsa.com"} />
      <meta property="og:image" content={image} />
      <meta property="og:article:author" content="스타에진심인사이트" />
    </Head>
  );
}
