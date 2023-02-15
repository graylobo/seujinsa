import React from "react";
import DefaultTemplate from "../DefaultTemplate";

const rankList = {
  0: {
    hermes: {
      link: "https://www.hermes.com/kr/ko/",
      name: "HERMES(에르메스)",
      logo: "/images/royal/bag/hermes.svg",
    },
  },
  1: {
    louis: {
      link: "https://kr.louisvuitton.com/kor-kr/homepage",
      name: "LOUIS VUITTON(루이비통)",
      logo: "/images/royal/bag/louis.svg",
    },
    chanel: {
      link: "https://www.chanel.com/kr",
      name: "CHANEL(샤넬)",
      logo: "/images/royal/bag/chanel.svg",
    },

    goyard: {
      link: "https://www.goyard.com/kr_ko/",
      name: "GOYARD(고야드)",
      logo: "/images/royal/bag/goyard.svg",
    },
  },
  2: {
    dior: {
      link: "https://www.dior.com/ko_kr/fashion/%EA%B0%80%EB%B0%A9/%EA%B0%80%EB%B0%A9",
      name: "DIOR(디올)",
      logo: "/images/royal/bag/dior.svg",
    },
    fendi: {
      link: "https://www.fendi.com/kr-ko/",
      name: "FENDI(펜디)",
      logo: "/images/royal/bag/fendi.svg",
    },
    bottega: {
      link: "https://www.bottegaveneta.com/ko-kr",
      name: "BOTTEGA VENETA(보테가 베네타)",
      logo: "/images/royal/bag/bottega.svg",
    },
    celine: {
      link: "https://www.celine.com/ko-kr",
      name: "CELINE(셀린느)",
      logo: "/images/royal/bag/celine.svg",
    },
  },
  3: {
    prada: {
      link: "https://www.prada.com/kr/ko.html",
      name: "PRADA(프라다)",
      logo: "/images/royal/bag/prada.svg",
    },
    gucci: {
      link: "https://www.gucci.com/kr/ko/",
      name: "GUCCI(구찌)",
      logo: "/images/royal/bag/gucci.svg",
    },
    saint: {
      link: "https://www.ysl.com/ko-kr",
      name: "YSL",
      logo: "/images/royal/bag/saint.svg",
    },
    burberry: {
      link: "https://kr.burberry.com/?selected=Y",
      name: "BURBERRY(버버리)",
      logo: "/images/royal/bag/burberry.svg",
    },
    loewe: {
      link: "https://www.loewe.com/int/ko/home",
      name: "LOEWE(로에베)",
      logo: "/images/royal/bag/loewe.svg",
    },
  },
  4: {
    valentino: {
      link: "https://www.valentino.com/ko-kr",
      name: "VALENTINO(발렌티노)",
      logo: "/images/royal/bag/valentino.svg",
    },
    alexander: {
      link: "https://www.alexandermcqueen.com/en-nl",
      name: "ALEXANDER MCQUEEN(알렉산더 맥퀸)",
      logo: "/images/royal/bag/alexander.svg",
    },
    ferragamo: {
      link: "https://www.ferragamo.com/shop/kor/ko",
      name: "FERRAGAMO(페레가모)",
      logo: "/images/royal/bag/ferragamo.svg",
    },
    chloe: {
      link: "https://www.chloe.com/kr",
      name: "CHLOE(끌로에)",
      logo: "/images/royal/bag/chloe.svg",
    },
    mulberry: {
      link: "https://www.mulberry.com/kr/",
      name: "MULBERRY(멀버리)",
      logo: "/images/royal/bag/mulberry.svg",
    },
  },
  5: {
    mmm: {
      link: "https://www.maisonmargiela.com/ko-kr/",
      name: "MAISON MARTIN MARGIELA(메종 마르지엘라)",
      logo: "/images/royal/bag/mmm.svg",
    },
    balenciaga: {
      link: "https://www.balenciaga.com/ko-kr",
      name: "BALENCIAGA(발렌시아가)",
      logo: "/images/royal/bag/balenciaga.svg",
    },
    miumiu: {
      link: "https://www.miumiu.com/kr/ko.html",
      name: "MIUMIU(미우미우)",
      logo: "/images/royal/bag/miumiu.svg",
    },
    thombrowne: {
      link: "https://www.thombrowne.com/kr",
      name: "THOM BROWNE(톰브라운)",
      logo: "/images/royal/bag/thombrowne.svg",
    },
    jilsander: {
      link: "https://www.jilsander.com/it-it/home",
      name: "JIL SANDER(질 샌더)",
      logo: "/images/royal/bag/jilsander.svg",
    },
    lemaire: {
      link: "https://eu.lemaire.fr/",
      name: "LEMAIRE(르메르)",
      logo: "/images/royal/bag/lemaire.svg",
    },
  },
  6: {
    coach: {
      link: "https://korea.coach.com/",
      name: "COACH(코치)",
      logo: "/images/royal/bag/coach.svg",
    },
    toryburch: {
      link: "https://www.toryburch.co.kr/public/display/main/view",
      name: "TORY BURCH(토리 버치)",
      logo: "/images/royal/bag/toryburch.svg",
    },
    michaelkors: {
      link: "https://www.michaelkors.com/",
      name: "MICHAEL KORS(마이클 코어스)",
      logo: "/images/royal/bag/michaelkors.svg",
    },
    marni: {
      link: "https://www.marni.com/ko-kr",
      name: "MARNI(마르니)",
      logo: "/images/royal/bag/marni.svg",
    },
  },
};

function Afreeca() {
  return <DefaultTemplate rankList={rankList} width={180} height={60} />;
}

export default Afreeca;
