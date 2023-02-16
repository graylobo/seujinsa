import { NextSeo } from "next-seo";
import React from "react";
import Bag from "common/components/rank/royal/Bag";

export default function bag() {
  return (
    <>
      <NextSeo title="명품백 계급도" description="가방 계급,명품백 계급" />
      <Bag />
    </>
  );
}
