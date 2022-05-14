import React, { useEffect, useMemo, useState } from "react";
import RecordModal from "./modal/RecordModal";
import styled from "@emotion/styled";
import { useRecoilValue } from "recoil";
import { userInfoState } from "../recoil/states";
import ConfirmModal from "./modal/ConfirmModal";
import { getRecord } from "../utils/api-util";
const header = [
  { 날짜: "date" },
  { 승자: "winner" },
  { 패자: "loser" },
  { 맵: "map" },
  { 경기방식: "wayOfPlay" },
  { 스폰서: "sponser" },
  { 스폰비: "sponCost" },
  { 내용: "content" },
  { 작성자: "writer" },
];
const Wrapper = styled.div`
  .gamer-info {
    height: 200px;
    overflow-y: scroll;
    margin-bottom: 30px;
  }
  .record-background {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 8;
  }
`;

export default function Record() {
  const [recordModalOpen, setRecordModalOpen] = useState(false);
  const [record, setRecord] = useState<any>([]);
  const userInfo = useRecoilValue(userInfoState);

  async function deleteRecord(_id: string) {
    let res = await fetch(`${process.env.NEXT_PUBLIC_DB_URL}/record`, {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _id,
      }),
    });
    if (res.status === 200) {
      res = await fetch(`${process.env.NEXT_PUBLIC_DB_URL}/record`);
      const json = await res.json();
      setRecord(json);
    }
  }

  useEffect(() => {
    getRecord().then((e) => {
      setRecord(e);
    });
  }, [recordModalOpen]);
  return (
    <Wrapper className="absolute left-0 w-full mt-[86px]">
      {recordModalOpen && (
        <div>
          <RecordModal
            setRecordModalOpen={setRecordModalOpen}
            userInfo={userInfo}
          />
        </div>
      )}
      <div className="flex justify-center min-w-[1000px]">
        <div className="grid grid-cols-9 self-center  w-[90%]">
          {header.map((h: any, i: number) => (
            <div className="">
              <p className="border-[1px] border-b-gray-300 text-center font-bold">
                {Object.keys(h)[0]}
              </p>
              {record?.map((e: any) => (
                <div
                  className={`border-[1px] border-b-gray-300 h-[30px]  relative text-center ${
                    Object.keys(h)[0] === "내용" && "overflow-auto"
                  }`}
                >
                  {e[Object.values(h) as unknown as string] || " "}
                  {Object.keys(h)[0] === "작성자" &&
                    e[Object.values(h) as unknown as string] ===
                      userInfo.nickName && (
                      <button
                        onClick={() => {
                          if (confirm("게시글을 삭제하시겠습니까?")) {
                            deleteRecord(e._id);
                          }
                        }}
                        className="outline-none transition-colors bg-red-600 hover:bg-red-800 disabled:bg-gray-500 text-gray-100 rounded-[5px] text-[13px] ml-[10px] px-[3px] py-[1px] absolute right-[-40px] "
                      >
                        삭제
                      </button>
                    )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div>
        <button
          className="fixed right-[50%] bottom-[150px] h-[48px]  p-[12px] rounded-[8px] outline-none transition-colors bg-blue-600 hover:bg-blue-800 disabled:bg-gray-500 text-gray-100"
          onClick={() => {
            if (!userInfo.isLogin) {
              alert("로그인 후 등록가능합니다.");
              return;
            }
            setRecordModalOpen(true);
          }}
        >
          등록
        </button>
      </div>
    </Wrapper>
  );
}
