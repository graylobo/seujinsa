import React from "react";
import { createObject, ITemplateProps } from "../../lib/createObject";
import DefaultTemplate from "../DefaultTemplate";

export default function Watch() {
  const data: ITemplateProps = {
    patekPhlippe: {
      level: 0,
      link: "https://www.patek.com/en/home",
      brandName: "Patek Phlippe(파텍필립)",
      logo: "/images/royal/watch/patek-philippe.svg"
    },
    breguet: {
      level: 1,
      link: "https://www.breguet.com/kr",
      brandName: "Breguet(브레게)",
      logo: "/images/royal/watch/breguet.svg"
    },
    audemars: {
      level: 1,
      link: "https://www.audemarspiguet.com/com/en/home.html",
      brandName: "Audemars Piguet(오데마 피게)",
      logo: "/images/royal/watch/audemars-piguet.svg"
    },
    vacheron: {
      level: 1,
      link: "https://www.vacheron-constantin.com/kr/ko/home.html",
      brandName: "Vacheron Constantin(바쉐론 콘스탄틴)",
      logo: "/images/royal/watch/vacheron.svg"
    },
    alange: {
      level: 1,
      link: "https://www.alange-soehne.com/kr-en",
      brandName: "Alange&Soehne(아 랑에 운트 죄네)",
      logo: "/images/royal/watch/a-lange-sohne.svg"
    },
    glashuette: {
      level: 2,
      link: "https://www.glashuette-original.com/en/",
      brandName: "Glashütte(글라슈테)",
      logo: "/images/royal/watch/glashuette.svg"
    },
    piaget: {
      level: 2,
      link: "https://www.piaget.com/kr-ko",
      brandName: "piaget(피아제)",
      logo: "/images/royal/watch/piaget.svg"
    },
    jaegerLecoultre: {
      level: 2,
      link: "https://www.jaeger-lecoultre.com/kr-ko",
      brandName: "jaeger-lecoultre(예거-리쿨트르)",
      logo: "/images/royal/watch/jaeger-lecoultre.svg"
    },
    blancpain: {
      level: 2,
      link: "https://www.blancpain.com/ko",
      brandName: "blancpain(블랑팡)",
      logo: "/images/royal/watch/blancpain.svg"
    },
    richardmille: {
      level: 2,
      link: "https://www.richardmille.com/",
      brandName: "richardmille(리차드 밀)",
      logo: "/images/royal/watch/richardmille.svg",
      scaleX: 1,
      scaleY: 0.35
    },
    rogerdubuis: {
      level: 2,
      link: "https://www.rogerdubuis.com/kr-ko",
      brandName: "rogerdubuis(로저 드뷔)",
      logo: "/images/royal/watch/rogerdubuis.svg"
    },
    rolex: {
      level: 3,
      link: "https://www.rolex.com/ko",
      brandName: "rolex(롤렉스)",
      logo: "/images/royal/watch/rolex.svg"
    },
    breitling: {
      level: 3,
      link: "https://www.breitling.com/kr-ko/",
      brandName: "breitling(브라이틀링)",
      logo: "/images/royal/watch/breitling.svg"
    },
    panerai: {
      level: 3,
      link: "https://www.panerai.com/kr/ko/home.html",
      brandName: "panerai(파네라이)",
      logo: "/images/royal/watch/panerai.svg"
    },
    iwc: {
      level: 3,
      link: "https://www.iwc.com/kr/ko/home.html",
      brandName: "International Watch Company(IWC)",
      logo: "/images/royal/watch/iwc.svg"
    },
    omega: {
      level: 3,
      link: "https://www.omegawatches.co.kr/",
      brandName: "omega(오메가)",
      logo: "/images/royal/watch/omega.svg"
    },
    hublot: {
      level: 3,
      link: "https://www.hublot.com/en-us",
      brandName: "hublot(위블로)",
      logo: "/images/royal/watch/hublot.svg"
    },
    rado: {
      level: 4,
      link: "https://www.rado.com/ko_kr/art-of-ceramic.html",
      brandName: "Rado(라도)",
      logo: "/images/royal/watch/rado.svg"
    },
    tagheuer: {
      level: 4,
      link: "https://www.tagheuer.com/kr/ko",
      brandName: "Tagheuer(태그 호이어)",
      logo: "/images/royal/watch/tagheuer.svg"
    },
    longines: {
      level: 4,
      link: "https://www.longines.com/kr",
      brandName: "Longines(론진)",
      logo: "/images/royal/watch/longines.svg"
    },
    tudor: {
      level: 4,
      link: "https://www.tudorwatch.com/ko",
      brandName: "Tudor(튜더)",
      logo: "/images/royal/watch/tudor.svg"
    },
    grandseiko: {
      level: 4,
      link: "https://www.grand-seiko.com/kr-ko",
      brandName: "Grand Seiko(그랜드 세이코)",
      logo: "/images/royal/watch/grandseiko.svg"
    },
    cartier: {
      level: 4,
      link: "https://www.cartier.com/ko-kr/%EC%8B%9C%EA%B3%84",
      brandName: "Cartier(까르띠에)",
      logo: "/images/royal/watch/cartier.svg"
    },
    frederiqueconstant: {
      level: 5,
      link: "https://frederiqueconstant.com/",
      brandName: "Frederique Constant(프레드릭 콘스탄트)",
      logo: "/images/royal/watch/frederiqueconstant.svg"
    },
    mido: {
      level: 5,
      link: "https://www.midowatches.com/kr/",
      brandName: "Mido(미도)",
      logo: "/images/royal/watch/mido.svg"
    },
    oris: {
      level: 5,
      link: "https://oris.ch/ko",
      brandName: "Oris(오리스)",
      logo: "/images/royal/watch/oris.svg"
    },
    casio: {
      level: 5,
      link: "https://www.casio.com/kr/watches/gshock/",
      brandName: "Casio(카시오)",
      logo: "/images/royal/watch/casio.svg"
    },
    citizen: {
      level: 5,
      link: "https://www.citizenwatch.com/",
      brandName: "Citizen(시티즌)",
      logo: "/images/royal/watch/citizen.svg"
    },
    tissot: {
      level: 5,
      link: "https://www.tissotwatches.com/ko-kr",
      brandName: "Tissot(티소)",
      logo: "/images/royal/watch/tissot.svg"
    },
    seiko: {
      level: 5,
      link: "https://www.seikowatches.com/kr-ko",
      brandName: "Seiko(세이코)",
      logo: "/images/royal/watch/seiko.svg"
    },
    hamilton: {
      level: 5,
      link: "https://www.hamiltonwatch.com/ko-kr/",
      brandName: "Hamilton(해밀턴)",
      logo: "/images/royal/watch/hamilton.svg"
    }
  };
  return <DefaultTemplate rankList={createObject(data)} width={220} height={100} />;
}
