interface MarketOption {
  [key: string]: {
    name: string;
    link: string;
    show: boolean;
    hihi?: string;
    [propName: string]: any;
  };
}

export const marketOption: MarketOption = {
  google: {
    name: "구글",
    link: `https://www.google.com/search?igu=1&query=\${query}`,
    show: true,
  },
  naver: {
    name: "네이버",
    link: `https://search.shopping.naver.com/search/all?query=\${query}`,
    show: true,
  },

  coupang: {
    name: "쿠팡",
    link: `https://www.coupang.com/np/search?q=\${query}`,
    show: true,
  },
  gmarket: {
    name: "지마켓",
    link: `https://browse.gmarket.co.kr/search?keyword=\${query}`,
    show: true,
  },
  auction: {
    name: "옥션",
    link: `https://browse.auction.co.kr/search?keyword=\${query}`,
    show: true,
  },
  lotteon: {
    name: "롯데온",
    link: `https://www.lotteon.com/search/search/search.ecn?render=search&platform=pc&q=\${query}&mallId=1`,
    show: true,
  },
  eleven: {
    name: "11번가",
    link: `https://search.11st.co.kr/Search.tmall?kwd=\${query}`,
    show: true,
  },
  homeplus: {
    name: "홈플러스",
    link: `https://front.homeplus.co.kr/search?entry=direct&keyword=\${query}`,
    show: true,
  },
  wmp: {
    name: "위메이크프라이스",
    link: `https://search.wemakeprice.com/search?search_cate=top&keyword=\${query}`,
    show: true,
  },
  shoppinghow: {
    name: "다음",
    link: `https://shoppinghow.kakao.com/search/\${query}`,
    show: true,
  },
};
