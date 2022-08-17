export function sleep(ms: number) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

export function debounce(callback: (...args: any) => any, delay: number) {
  let timer: any = null;

  return (...args: any) => {
    return new Promise((resolve, reject) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        resolve(callback(...args))
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