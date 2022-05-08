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
      if (gamer.level) {
        currentTier = gamer.level;
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
        nickName: gamer.nickName,
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
  getRecord
};
