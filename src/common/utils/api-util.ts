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
export { getUserInfo, getGamerInfo, checkNickNameExist, getWholeGamerInfo };
