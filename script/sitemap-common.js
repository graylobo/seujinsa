// sitemap-common.js

// 패키지 설치
// const fs = require("fs");
// const globby = require("globby");
// const prettier = require("prettier");

import fs from "fs";
import {globby} from "globby";
import prettier from "prettier";

// 오늘 날짜 가져오기 & 도메인 설정
const getDate = new Date().toISOString();
const SEUJINSA_DOMAIN = "https://www.seujinsa.com";

//
const formatted = (sitemap) => prettier.format(sitemap, { parser: "html" });

(async () => {
  const pages = await globby([
   "./src/pages/**/*.tsx",
   "./src/pages/*.tsx",
   "!./src/pages/tier-admin.tsx"
  ]);

  const pagesSitemap = `
  ${pages
    .map((page) => {
      const path = page
        .replace("./src/pages/", "")
        .replace(".tsx", "")
        .replace(/\/index/g, "");
      const routePath = path === "index" ? "" : path;
      return `
    <url>
      <loc>${SEUJINSA_DOMAIN}/${routePath}</loc>
      <lastmod>${getDate}</lastmod>
    </url>
  `;
    })
    .join("")}
  `;

  const generatedSitemap = `
  <?xml version="1.0" encoding="UTF-8"?>
    <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
     xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
      ${pagesSitemap}
    </urlset>`;

  const formattedSitemap = [formatted(generatedSitemap)];

  fs.writeFileSync("./public/sitemap/sitemap-common.xml", formattedSitemap.toString(), "utf8");
})();
