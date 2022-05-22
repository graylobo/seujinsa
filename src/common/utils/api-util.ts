async function fetchAPI(method: string, url: string, body: object) {
  let res = null;
  if (method === "get") {
    res = await fetch(url);
  } else {
    res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  }

  return res;
}

async function getUserInfo(id?: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DB_URL}/user-info/${id}`);
  const json = await res.json();
  return json;
}

async function getGamerInfo(name?: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DB_URL}/gamer-info/${name}`
  );
  const json = await res.json();
  return json;
}
async function getWholeGamerInfo() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DB_URL}/gamer-list`);
  const json = await res.json();
  return json;
}

async function getRecord() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DB_URL}/record`);
  const json = await res.json();
  return json;
}

// 현재 티어가 적용된 게이머 리스트를 반환
function setGamerTierList() {
  return getWholeGamerInfo().then((gamerList) => {
    gamerList = gamerList.map((gamer: any) => {
      let totalPoint = 0;
      let sortable = [];

      for (const key in gamer.point) {
        sortable.push([key, gamer.point[key]]);
        totalPoint += gamer.point[key];
      }

      sortable.sort((a, b) => {
        if (a[1] === b[1]) {
          return -1;
        } else {
          return b[1] - a[1];
        }
      });
      // 해당 게이머의 계급포인트중에서 가장 높은 포인트를 가진 계급 찾기
      let currentTier = sortable[0][0];
      let tierPoint = -1; // 티어 순으로 정렬하기 위해 티어별 포인트 설정
      if (gamer.level) {
        currentTier = gamer.level;
      }

      switch (currentTier) {
        case "zero":
          currentTier = "주";
          tierPoint = 11;
          break;
        case "one":
          currentTier = "갑";
          tierPoint = 10;
          break;
        case "two":
          currentTier = "을";
          tierPoint = 9;
          break;
        case "three":
          currentTier = "병";
          tierPoint = 8;
          break;
        case "four":
          currentTier = "정";
          tierPoint = 7;
          break;
        case "five":
          currentTier = "무";
          tierPoint = 6;
          break;
        case "six":
          currentTier = "기";
          tierPoint = 5;
          break;
        case "seven":
          currentTier = "경";
          tierPoint = 4;
          break;
        case "eight":
          currentTier = "신";
          tierPoint = 3;
          break;
        case "nine":
          currentTier = "임";
          tierPoint = 2;
          break;
        case "ten":
          currentTier = "계";
          tierPoint = 1;
          break;
        case "eleven":
          currentTier = "배치";
          tierPoint = 0;
          break;
      }

      //#region totalPoint 조건별로 티어결정하는 로직
      // let index = 1;
      // let find = false;
      // while (!find) {
      //   switch (currentTier) {
      //     case "one":
      //       if (totalPoint <= 5) {
      //         currentTier = sortable[index++][0];
      //         continue;
      //       }
      //       find = true;
      //       break;
      //     case "two":
      //       if (totalPoint <= 3) {
      //         currentTier = sortable[index++][0];
      //         continue;
      //       }
      //       find = true;
      //       break;
      //     case "three":
      //       if (totalPoint <= 1) {
      //         currentTier = sortable[index++][0];
      //         continue;
      //       }
      //       find = true;
      //       break;
      //     default:
      //       find = true;
      //   }
      // }
      //#endregion
      return {
        _id: gamer._id,
        tier: currentTier,
        race: gamer.race,
        university: gamer.university,
        totalPoint,
        tierPoint,
        nickName: gamer.nickName,
        record: gamer.record,
      };
    });
    return gamerList;
  });
}

async function checkNickNameExist(nickName: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DB_URL}/member`);
  const userList = await res.json();

  for (const user of userList) {
    if (user.nickName === nickName) {
      return true;
    }
  }
  return false;
}
export {
  getUserInfo,
  getGamerInfo,
  checkNickNameExist,
  getWholeGamerInfo,
  setGamerTierList,
  getRecord,
  fetchAPI,
};
