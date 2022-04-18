import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userInfoState } from "../../../recoil/states";
export default function ProfileManagement() {
  const [userState, setUserState] = useRecoilState(userInfoState);
  const [image, setImage] = useState<any>(null);
  const [profile, setProfile] = useState("");
  const onChange = (e: any) => {
    setImage(e.target.files[0]);
  };
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
  return (
    <div className="relative h-full w-full ">
      <label htmlFor="file-input" className="">
        <img
          src={profile ? profile + "?" + Date.now() : "./default-profile.png"}
          className={`w-[100px] h-[100px] rounded-full cursor-pointer`}
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
      <div>{userState._id}</div>
    </div>
  );
}
