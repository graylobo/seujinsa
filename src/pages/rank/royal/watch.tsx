import { NextSeo } from "next-seo";
import Head from "next/head";
import React from "react";
import Watch from "../../../components/ranking/royal/Watch";

export default function watch() {
  return (
    <>
      <NextSeo title="시계 계급도" description="시계 계급표" />
      <Watch />
    </>
  );
}
