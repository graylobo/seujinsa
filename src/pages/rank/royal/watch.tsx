import Watch from "common/components/rank/royal/Watch";
import { NextSeo } from "next-seo";

export default function watch() {
  return (
    <>
      <NextSeo title="시계 계급도" description="시계 계급표" />
      <Watch />
    </>
  );
}
