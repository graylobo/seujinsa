import React from "react";
import { createObject, ITemplateProps } from "lib/createObject";
import DefaultTemplate from "../DefaultTemplate";

export default function Bag() {
  const data: ITemplateProps = {
    hermes: {
      level: 0,
      link: "https://www.hermes.com/kr/ko/",
      brandName: "HERMES(에르메스)",
      logo: "https://adaptimage.cafe24.com/Colorful%20sunday/brands/royal/bag/hermes.svg",
      tierName: "하위",
    },
    louis: {
      level: 1,
      link: "https://kr.louisvuitton.com/kor-kr/homepage",
      brandName: "LOUIS VUITTON(루이비통)",
      logo: "https://adaptimage.cafe24.com/Colorful%20sunday/brands/royal/bag/louis.svg",
    },
    chanel: {
      level: 1,
      link: "https://www.chanel.com/kr",
      brandName: "CHANEL(샤넬)",
      logo: "https://adaptimage.cafe24.com/Colorful%20sunday/brands/royal/bag/chanel.svg",
    },

    goyard: {
      level: 1,
      link: "https://www.goyard.com/kr_ko/",
      brandName: "GOYARD(고야드)",
      logo: "https://adaptimage.cafe24.com/Colorful%20sunday/brands/royal/bag/goyard.svg",
    },
    dior: {
      level: 2,
      link: "https://www.dior.com/ko_kr/fashion/%EA%B0%80%EB%B0%A9/%EA%B0%80%EB%B0%A9",
      brandName: "DIOR(디올)",
      logo: "https://adaptimage.cafe24.com/Colorful%20sunday/brands/royal/bag/dior.svg",
    },
    fendi: {
      level: 2,
      link: "https://www.fendi.com/kr-ko/",
      brandName: "FENDI(펜디)",
      logo: "https://adaptimage.cafe24.com/Colorful%20sunday/brands/royal/bag/fendi.svg",
    },
    bottega: {
      level: 2,
      link: "https://www.bottegaveneta.com/ko-kr",
      brandName: "BOTTEGA VENETA(보테가 베네타)",
      logo: "https://adaptimage.cafe24.com/Colorful%20sunday/brands/royal/bag/bottega.svg",
    },
    celine: {
      level: 2,
      link: "https://www.celine.com/ko-kr",
      brandName: "CELINE(셀린느)",
      logo: "https://adaptimage.cafe24.com/Colorful%20sunday/brands/royal/bag/celine.svg",
    },
    prada: {
      level: 3,
      link: "https://www.prada.com/kr/ko.html",
      brandName: "PRADA(프라다)",
      logo: "https://adaptimage.cafe24.com/Colorful%20sunday/brands/royal/bag/prada.svg",
    },
    gucci: {
      level: 3,
      link: "https://www.gucci.com/kr/ko/",
      brandName: "GUCCI(구찌)",
      logo: "https://adaptimage.cafe24.com/Colorful%20sunday/brands/royal/bag/gucci.svg",
    },
    saint: {
      level: 3,
      link: "https://www.ysl.com/ko-kr",
      brandName: "YSL",
      logo: "https://adaptimage.cafe24.com/Colorful%20sunday/brands/royal/bag/saint.svg",
    },
    burberry: {
      level: 3,
      link: "https://kr.burberry.com/?selected=Y",
      brandName: "BURBERRY(버버리)",
      logo: "https://adaptimage.cafe24.com/Colorful%20sunday/brands/royal/bag/burberry.svg",
    },
    loewe: {
      level: 3,
      link: "https://www.loewe.com/int/ko/home",
      brandName: "LOEWE(로에베)",
      logo: "https://adaptimage.cafe24.com/Colorful%20sunday/brands/royal/bag/loewe.svg",
    },
    valentino: {
      level: 4,
      link: "https://www.valentino.com/ko-kr",
      brandName: "VALENTINO(발렌티노)",
      logo: "https://adaptimage.cafe24.com/Colorful%20sunday/brands/royal/bag/valentino.svg",
    },
    alexander: {
      level: 4,
      link: "https://www.alexandermcqueen.com/en-nl",
      brandName: "ALEXANDER MCQUEEN(알렉산더 맥퀸)",
      logo: "https://adaptimage.cafe24.com/Colorful%20sunday/brands/royal/bag/alexander.svg",
    },
    ferragamo: {
      level: 4,
      link: "https://www.ferragamo.com/shop/kor/ko",
      brandName: "FERRAGAMO(페레가모)",
      logo: "https://adaptimage.cafe24.com/Colorful%20sunday/brands/royal/bag/ferragamo.svg",
    },
    chloe: {
      level: 4,
      link: "https://www.chloe.com/kr",
      brandName: "CHLOE(끌로에)",
      logo: "https://adaptimage.cafe24.com/Colorful%20sunday/brands/royal/bag/chloe.svg",
    },
    mulberry: {
      level: 4,
      link: "https://www.mulberry.com/kr/",
      brandName: "MULBERRY(멀버리)",
      logo: "https://adaptimage.cafe24.com/Colorful%20sunday/brands/royal/bag/mulberry.svg",
    },
    mmm: {
      level: 5,
      link: "https://www.maisonmargiela.com/ko-kr/",
      brandName: "MAISON MARTIN MARGIELA(메종 마르지엘라)",
      logo: "https://adaptimage.cafe24.com/Colorful%20sunday/brands/royal/bag/mmm.svg",
    },
    balenciaga: {
      level: 5,
      link: "https://www.balenciaga.com/ko-kr",
      brandName: "BALENCIAGA(발렌시아가)",
      logo: "https://adaptimage.cafe24.com/Colorful%20sunday/brands/royal/bag/balenciaga.svg",
    },
    miumiu: {
      level: 5,
      link: "https://www.miumiu.com/kr/ko.html",
      brandName: "MIUMIU(미우미우)",
      logo: "https://adaptimage.cafe24.com/Colorful%20sunday/brands/royal/bag/miumiu.svg",
    },
    thombrowne: {
      level: 5,
      link: "https://www.thombrowne.com/kr",
      brandName: "THOM BROWNE(톰브라운)",
      logo: "https://adaptimage.cafe24.com/Colorful%20sunday/brands/royal/bag/thombrowne.svg",
    },
    jilsander: {
      level: 5,
      link: "https://www.jilsander.com/it-it/home",
      brandName: "JIL SANDER(질 샌더)",
      logo: "https://adaptimage.cafe24.com/Colorful%20sunday/brands/royal/bag/jilsander.svg",
    },
    lemaire: {
      level: 5,
      link: "https://eu.lemaire.fr/",
      brandName: "LEMAIRE(르메르)",
      logo: "https://adaptimage.cafe24.com/Colorful%20sunday/brands/royal/bag/lemaire.svg",
    },
    coach: {
      level: 6,
      link: "https://korea.coach.com/",
      brandName: "COACH(코치)",
      logo: "https://adaptimage.cafe24.com/Colorful%20sunday/brands/royal/bag/coach.svg",
    },
    toryburch: {
      level: 6,
      link: "https://www.toryburch.co.kr/public/display/main/view",
      brandName: "TORY BURCH(토리 버치)",
      logo: "https://adaptimage.cafe24.com/Colorful%20sunday/brands/royal/bag/toryburch.svg",
    },
    michaelkors: {
      level: 6,
      link: "https://www.michaelkors.com/",
      brandName: "MICHAEL KORS(마이클 코어스)",
      logo: "https://adaptimage.cafe24.com/Colorful%20sunday/brands/royal/bag/michaelkors.svg",
    },
    marni: {
      level: 6,
      link: "https://www.marni.com/ko-kr",
      brandName: "MARNI(마르니)",
      logo: "https://adaptimage.cafe24.com/Colorful%20sunday/brands/royal/bag/marni.svg",
    },
  };

  return <DefaultTemplate rankList={createObject(data)} width={180} height={60} />;
}
