import React, { useEffect, useState } from "react";
import { useQuill } from "react-quilljs";
import QuillEditor from "../shared/QuillEditor";
export default function QNA() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState(""); // Quill 에디터의 innerHTML을 담는 state
  const [mountBody, setMountBody] = useState(false); // 리렌더링 용도 state
  const [modalOpen, setModalOpen] = useState(false);
  const [canUpload, setCanUpload] = useState(false);

  useEffect(() => {
    if (!modalOpen) {
      setBody("");
    }
  }, [modalOpen]);

  useEffect(() => {
    if (title.trim().length !== 0 && body.trim().length !== 0) {
      setCanUpload(true);
    } else if (title.trim().length === 0 || body.trim() === "<p><br></p>") {
      setCanUpload(false);
    }
  }, [title, body]);
  return (
    <section>
      <div className={modalOpen ? "modal-background" : ""}></div>
      <div className="px-[20px] pt-[24px] h-full flex flex-col">
        <div className="max-w-[700px] w-full mx-auto">
          <h1 className="font-bold text-[22px] mb-[8px]">건의 사항</h1>
          <p className="text-[14px] text-gray-600">
            서비스를 이용하면서 궁금하신 점이나 건의사항 등에 대한
          </p>
          <p className="text-[14px] text-gray-600">
            여러분들의 의견을 자유롭게 남겨주세요.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-20 py-20 max-w-700 w-full mx-auto"></div>
      </div>

      <div className="max-w-700 mx-auto fixed left-0 right-0 bottom-[56px] w-full px-[20px] z-10 py-[12px] flex justify-center">
        <button
          onClick={() => {
            setModalOpen(true);
          }}
          className=" h-[48px] w-full max-w-[500px] py-[12px] rounded-[8px] outline-none transition-colors bg-red-600 hover:bg-red-800 disabled:bg-gray-50 text-gray-100"
        >
          건의 등록
        </button>

        {/* 모달시작 */}
        {modalOpen && (
          <div className="modal-box">
            <div
              className="cursor-pointer absolute right-[16px] top-[16px]"
              onClick={() => {
                setModalOpen(false);
              }}
            >
              x
            </div>
            <div className="mb-[16px]">
              <label htmlFor="" className="text-[14px] mb-[8px] inline-block">
                제목
              </label>
              <input
                type="text"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                className=" outline-none w-full rounded-[10px] bg-gray-200 h-[48px] border border-gray-400 px-[12px] focus:bg-gray-100 focus:border-gray-700 focus:border-[2px] focus:outline-none focus:text-gray-700 appearance-none"
              />
            </div>
            <p className="text-[14px]">내용</p>
            <div className="w-full rounded-[10px] resize-none pb-[40px] h-[300px] text-gray-800 my-[16px] outline-none">
              <QuillEditor
                body={body}
                handleQuillChange={setBody}
                mountBody={mountBody}
              />
            </div>
            <div className="grid grid-cols-2 gap-8">
              <button
                onClick={() => {
                  setModalOpen(false);
                }}
                className=" h-[48px] w-full py-[12px] rounded-[8px] outline-none transition-colors hover:border-0 bg-gray-100 hover:bg-red-100 border border-red-600 text-red-600"
              >
                취소
              </button>
              <button
                disabled={!canUpload}
                className=" h-[48px] w-full py-[12px] rounded-[8px] outline-none transition-colors bg-red-600 hover:bg-red-800 disabled:bg-gray-500 text-gray-100"
              >
                등록
              </button>
            </div>
          </div>
        )}

        {/* 모달종료 */}
      </div>

      <style jsx>{`
        .modal-background {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          background: rgba(0, 0, 0, 0.8);
        }
        .modal-box {
          padding: 20px;
          position: fixed;
          top: 50%;
          left: 50%;
          /* bring your own prefixes */
          transform: translate(-50%, -50%);
          background-color: white;
          display: flex;
          border-radius: 10px;
          width: 100%;
          max-width: 700px;
          max-height: 90%
          min-height: 400px;
          flex-direction: column;
        }
      `}</style>
    </section>
  );
}
