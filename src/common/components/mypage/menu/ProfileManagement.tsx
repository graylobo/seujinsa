import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userInfoState } from "../../../recoil/states";
import { IProps } from "../../../hooks/utils";
import ConfirmButton from "../../shared/ConfirmButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function ProfileManagement() {
  const [userState, setUserState] = useRecoilState(userInfoState);
  const [image, setImage] = useState<any>(null);
  const [profile, setProfile] = useState("");
  const [nickName, setNickName] = useState<any>("");
  const [introduction, setIntroduction] = useState<any>("");
  const onChange = (e: any) => {
    setImage(e.target.files[0]);
  };
  const inputCSS =
    "outline-none w-full rounded-[10px] bg-gray-100  border border-gray-40 px-[12px] focus:bg-gray-10 focus:border-gray-70 focus:border-2 focus:outline-none focus:text-gray-70 appearance-none";
  useEffect(() => {
    const onClick = async () => {
      if (userState._id) {
        if (image) {
          const formData = new FormData();
          formData.append("profile", image, `${userState._id}.png`);
          await fetch(`${process.env.NEXT_PUBLIC_DB_URL}/profile-image`, {
            method: "post",
            body: formData,
          });
        }
        let res = await fetch(
          `${process.env.NEXT_PUBLIC_DB_URL}/image/${userState._id}.png`
        );
        if (res.status !== 500) {
          setProfile(
            `${process.env.NEXT_PUBLIC_DB_URL}/image/${userState._id}.png`
          );
        }
      }
    };
    onClick();
  }, [image]);

  useEffect(() => {
    if (!userState.nickName) {
      setNickName(userState._id);
    } else {
      setNickName(userState.nickName);
    }
    setIntroduction(userState.introduction);
    console.log(userState);
  }, []);

  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  async function updateUserInfo(obj: IProps) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_DB_URL}/user-info`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _id: obj._id,
        nickName: obj.nickName,
        introduction: obj.introduction,
      }),
    });
    if (res.status === 200) {
      setUserInfo({
        ...userInfo,
        nickName: obj.nickName,
        introduction: obj.introduction,
      });
      toast.success("정보가 수정되었습니다.", {
        autoClose: 1500,
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }

  return (
    <div className="relative h-full w-full max-w-[428px] self-center flex flex-col">
      <ToastContainer />
      <div>프로필 이미지</div>
      <div className="relative mb-[30px] w-[100px]">
        <label htmlFor="file-input" className="">
          <img
            src={profile ? profile + "?" + Date.now() : "./default-profile.png"}
            className={`w-[100px] h-[100px] rounded-full cursor-pointer object-contain`}
            alt={"./default-profile.png"}
          />
          <img
            src="./edit-profile.svg"
            className="absolute bottom-0 left-[70px] cursor-pointer"
          />
          <input
            id="file-input"
            type="file"
            onChange={onChange}
            className="hidden"
            accept=".png,.jpg,.jpeg"
          />
        </label>
      </div>
      <div>닉네임</div>
      <input
        type="text"
        className={`${inputCSS} h-[48px] mb-[30px]`}
        value={nickName}
        onChange={(e) => {
          setNickName(e.target.value);
        }}
      />
      <div>소개글</div>
      <input
        type="text"
        className={`${inputCSS} h-[90px] mb-[30px]`}
        value={introduction}
        onChange={(e) => {
          setIntroduction(e.target.value);
        }}
      />

      <ConfirmButton
        text="수정"
        onClick={() => {
          updateUserInfo({
            _id: userState._id,
            nickName: nickName,
            introduction: introduction,
          });
        }}
      />
    </div>
  );
}
