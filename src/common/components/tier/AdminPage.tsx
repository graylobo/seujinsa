import React, { useEffect, useState } from "react";
import { getWholeGamerInfo } from "../../utils/api-util";
import { GamerInfoType } from "../../recoil/states";

const race = ["", "저그", "프로토스", "테란"];
const university = [
    "무소속",
    "철와대",
    "바스포드",
    "염석대",
    "무친대",
    "우끼끼즈",
    "캄성여대",
    "CP대",
    "JSA",
    "NSU",
];
const tierList=["미지정","갓","킹","잭","조커","0",'1','2','3','4','5','6','7','8','애기']
export default function AdminPage() {
    const [gamerList, setGamerList] = useState([]);

    async function updateGamer() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_DB_URL}/all-gamer`, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(gamerList),
        });
        if (res.status === 200) {
            alert("수정 완료");
        }
    }

    useEffect(() => {
        async function getGamerInfo() {
            let some = await getWholeGamerInfo();
            some = some.sort(function (a: GamerInfoType, b: GamerInfoType) {
                // 한글 오름차순
                return a._id < b._id ? -1 : a._id > b._id ? 1 : 0;
            });

            console.log("some", some);
            setGamerList(some);
        }

        getGamerInfo();
    }, []);
    function updateGamerInfo(val: string, i: number, type: string) {
        const copyGamerList: any = [...gamerList];
        switch (type) {
            case "university":
                copyGamerList[i].university = val;
                break;
            case "race":
                copyGamerList[i].race = val;
                break;
            case "position":
                copyGamerList[i].position = val;
                break;
            case "nickName":
                copyGamerList[i].nickName = val;
                break;
            case "standardTier":
                console.log('val',val)
                copyGamerList[i].standardTier = val;
                break;
        }
        setGamerList(copyGamerList);
    }
    return (
        <div className="absolute left-0 w-full pb-[80px] pt-[130px]">
            {gamerList.map((e: GamerInfoType, i: number) => (
                <div key={e._id} className="grid grid-cols-6">
                    <span>
                        이름:<span className="ml-[10px]">{e._id}</span>
                    </span>

                    <span>
                        종족:
                        <select
                            value={e.race}
                            onChange={(e) => {
                                updateGamerInfo(e.target.value, i, "race");
                            }}
                        >
                            {race.map((e) => (
                                <option key={e} value={e}>
                                    {e}
                                </option>
                            ))}
                        </select>
                    </span>
                    <span>
                        대학:
                        <select
                            value={e.university}
                            onChange={(e) => {
                                updateGamerInfo(
                                    e.target.value,
                                    i,
                                    "university"
                                );
                            }}
                        >
                            {university.map((e) => (
                                <option key={e} value={e}>
                                    {e}
                                </option>
                            ))}
                        </select>
                    </span>
                    <span>
                        직급:
                        <input
                            value={e.position}
                            onChange={(e) => {
                                updateGamerInfo(e.target.value, i, "position");
                            }}
                        ></input>
                    </span>
                    <span>
                        별명:
                        <input
                            className="w-[100px] ml-[10px]"
                            value={e.nickName}
                            onChange={(e) => {
                                updateGamerInfo(e.target.value, i, "nickName");
                            }}
                        ></input>
                    </span>
                    <span>
                        티어:
                        <select
                            value={e.standardTier}
                            onChange={(e) => {
                                updateGamerInfo(
                                    e.target.value,
                                    i,
                                    "standardTier"
                                );
                            }}
                        >
                            {tierList.map((e) => (
                                <option key={e} value={e}>
                                    {e}
                                </option>
                            ))}
                        </select>
                    </span>
                </div>
            ))}
            <button
                className="fixed left-[45%] top-[10%] border-[2px] rounded-[10px] p-[10px] border-red-600"
                onClick={() => {
                    updateGamer();
                }}
            >
                수정
            </button>
        </div>
    );
}
