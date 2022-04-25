import React from "react";
import { success, fail } from "../../utils/toast";
export default function ConfirmModal({ qnaInfo, setQnaClick }: any) {
  async function deleteQnaPost() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_DB_URL}/qna/${qnaInfo._id}`,
      {
        method: "delete",
      }
    );

    return res;
  }
  return (
    <div className="fixed w-screen h-device inset-0 z-50 flex items-center justify-center bg-gray-700 bg-opacity-[90%] p-[20px]">
      <div className="bg-gray-100 rounded-[10px] p-[16px] max-w-[460px] w-full z-50">
        <p className="text-[16px] font-bold mb-[8px]">알림</p>
        <div>
          <p>의견 제안을 삭제하시겠습니까?</p>
        </div>
        <div className="grid-cols-2 grid gap-[8px] mt-[16px]">
          <button
            onClick={() => {
              setQnaClick(false);
            }}
            className=" h-[48px] w-full py-[12px] rounded-[8px] outline-none transition-colors hover:border-0 bg-gray-100 hover:bg-red-100 border border-red-600 text-red-600"
          >
            아니오
          </button>
          <button
            onClick={async () => {
              const res = await deleteQnaPost();
              if (res.status === 200) {
                success("게시글이 삭제되었습니다.");
              } else {
                fail(await res.text());
              }
              setQnaClick(false);
            }}
            className=" h-[48px] w-full py-[12px] rounded-[8px] outline-none transition-colors bg-red-600 hover:bg-red-800 disabled:bg-gray-500 text-gray-100"
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
}
