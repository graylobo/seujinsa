import cloneDeep from "lodash/cloneDeep";

export function sleep(ms: number) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

export function debounce(callback: (value:string) => any, delay: number) {
  let timer: any = null;

  return (value:string) => {
    return new Promise((resolve, reject) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        resolve(callback(value))
      }, delay);
    });
  };
}
export const switchData: any = {
  "박상현(짭제)": "박상현",
  "윤찬희(몽군)": "윤찬희",
  "손경훈(브신)": "손경훈",
  "이예준(철구)": "철구",
  "박현재(기뉴다)": "기뉴다",
  "오진식(짭뉴다)": "짭뉴다",
  "박정일(짭호)": "짭호",
  "유규민(초난강)": "초난강",
  "박종승(빡죠스)": "박종승",
  "장영근(난수)": "난수",
  "박지호(라박이)": "라박이",
  "김동민(액션구드론)": "김동민",
  "윤호준(고도준)": "고도준",
  "박준영(미동미동)": "박준영",
  "박성용(소룡)": "박성용",
  "이광용(프발)": "프발",
  "임홍규(홍구)": "임홍규",
  "김승현(오메킴)": "오메킴",
  "송호영(도브)": "도브",
  "이성은(흑운장)": "흑운장",
};
export function nickNameSwitch(gamer: string) {
  return switchData[gamer];
}

export function setPriority(arr: any) {
  let copy = cloneDeep(arr);
  const priority: any = { 저그: 1, 테란: 2, 프로토스: 3 };
  for (const key in copy) {
    copy[key] = copy[key].sort((a: any, b: any) => {
      return priority[a.race] - priority[b.race];
    });
  }
  return copy;
}
export const initTierValue = {
  갓: [],
  킹: [],
  잭: [],
  조커: [],
  "0": [],
  "1": [],
  "2": [],
  "3": [],
  "4": [],
  "5": [],
  "6": [],
  "7": [],
  "8": [],
  아기: [],
  미지정: [],
};