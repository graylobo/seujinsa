
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
export { getUserInfo, getGamerInfo };
