import React from "react";
import { NextSeo } from "next-seo";
import OneSearch from "common/components/one-search/OneSearch";

function index() {
  return (
    <>
      <NextSeo title="원서치" description="오픈마켓 원서치 검색" />
      <OneSearch />
    </>
  );
}

export default index;
