import React, { useEffect, useState } from "react";
import QuillEditor from "../shared/QuillEditor";
import { useRecoilValue } from "recoil";
import { userInfoState } from "../../recoil/states";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import Image from "next/image";

type QnAProps = {
  emailID: string;
  nickName: string;
  date: string;
  title: string;
  body: string;
};

function getDateFormat(): string {
  let date: any = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDay();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  month = month >= 10 ? month : "0" + month;
  day = day >= 10 ? day : "0" + day;
  hour = hour >= 10 ? hour : "0" + hour;
  minute = minute >= 10 ? minute : "0" + minute;
  second = second >= 10 ? second : "0" + second;

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

export default function QNA() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState(""); // Quill 에디터의 innerHTML을 담는 state
  const [mountBody, setMountBody] = useState(false); // 리렌더링 용도 state
  const [modalOpen, setModalOpen] = useState(false);
  const [canUpload, setCanUpload] = useState(false); // 건의사항 누르면 나오는 등록버튼 활성화 여부
  const [qnaList, setQnaList] = useState([]);
  const router = useRouter();
  const userInfo = useRecoilValue(userInfoState);
  const [imgError, setImgError] = useState(false);
  getDateFormat();

  async function postQNA() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_DB_URL}/qna`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _id: userInfo._id,
        nickName: userInfo.nickName,
        date: getDateFormat(),
        title: title,
        body: body,
      }),
    });
    if (res.status === 200) {
      toast.success("게시글이 등록되었습니다.", {
        autoClose: 1500,
        position: toast.POSITION.TOP_CENTER,
      });
      setModalOpen(false);
      const json = res.json();
    }
  }

  function onModalOpen() {
    if (userInfo.isLogin) {
      setModalOpen(true);
    } else {
      toast.error("로그인 상태에서 등록이 가능합니다.", {
        autoClose: 1500,
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }

  useEffect(() => {
    async function getQNA() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_DB_URL}/qna`);
      console.log(res);
      if (res.status === 200) {
        const json = await res.json();
        setQnaList(json);
      }
    }

    getQNA();
  }, [modalOpen]);

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
      <ToastContainer />
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
        <div className="grid grid-cols-1 gap-[20px] py-[20px] max-w-[700px] w-full mx-auto">
          {qnaList.map((e: QnAProps) => (
            <div className="w-full bg-[#E9E9E9] rounded-[10px] p-[16px] last:mb-[56px] cursor-pointer">
              <p className="font-bold">{e.title}</p>
              <div className="flex items-center mt-[16px] mb-[8px]">
                <div className="w-[24px] h-[24px] ">
                  <img
                    src={`${process.env.NEXT_PUBLIC_DB_URL}/image/${e.emailID}.png`}
                    className={"rounded-[100%] w-full h-full"}
                    onError={(e: any) => {
                      console.log("하한");
                      e.target.onerror = null;
                      e.target.src = "/default-profile.png";
                    }}
                  />
                </div>
                <span className="font-bold text-[14px] mx-[8px]">
                  {e.nickName}
                </span>
                <span className="text-[13px] text-gray-700">{e.date}</span>
              </div>
              <div className="whitespace-pre-line w-full py-[20px] outline-none bg-gray-200 text-[14px] cursor-pointer">
                <div
                  dangerouslySetInnerHTML={{ __html: e.body }}
                  className="w-full py-[20px] outline-none custom-editor"
                ></div>
              </div>
              <div></div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-700 mx-auto fixed left-0 right-0 bottom-[56px] w-full px-[20px] z-10 py-[12px] flex justify-center">
        <button
          onClick={() => {
            onModalOpen();
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
                onClick={() => {
                  postQNA();
                }}
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