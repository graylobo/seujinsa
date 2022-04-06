import Link from "next/link";
import React from "react";
export default function More() {
  return (
    <div>
      <Link href={"/left-control"}>
        <p className="cursor-pointer p-2.5 border-b border-gray-60">왼손생산</p>
      </Link>
      <p className="cursor-pointer p-2.5 border-b border-gray-60">빌드알리미</p>
      <p className="cursor-pointer p-2.5 border-b border-gray-60">계급표</p>
      <Link href={"/signin"}>
        <p className="cursor-pointer p-2.5 border-b border-gray-60">로그인</p>
      </Link>
    </div>
  );
}
