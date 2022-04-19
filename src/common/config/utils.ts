type CheckType = ("영어" | "수학")[];
function checkTextValid(str: string, some: CheckType) {
  console.log(some);
  const pattern_spc = /[~!@#$%^&*()_+|<>?:{}]/; // 특수문자 체크
  if (!pattern_spc.test(str)) {
    return true;
  } else {
    return false;
  }
}

checkTextValid("", ["영어", "수학"]);

export {};
