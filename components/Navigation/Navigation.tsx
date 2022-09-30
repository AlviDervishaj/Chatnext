// Next
import { NextComponentType } from "next";
import Image from "next/image";

// Firebase
import { getAuth, Auth, signOut } from "firebase/auth";

// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faBars, faCommentSlash } from "@fortawesome/free-solid-svg-icons";

// Components
import { ToggleTheme } from "../ToggleTheme";
import { useEffect, useState } from "react";

export const Navigation: NextComponentType = () => {
  const auth: Auth = getAuth();
  const [code, setCode] = useState<string | null>(null);

  const handleLogOut = async () => {
    try {
      localStorage.removeItem("code");
      await signOut(auth);
    } catch (error: any) {
      console.log({ error });
    }
  }

  const handleLeaveChat = () => {
    localStorage.removeItem("code");
  }

  useEffect(() => {
    const _code: string | null = localStorage.getItem("code");
    setCode(_code);
  }, [])

  return (
    <>
      <nav className="flex flex-row items-center relative content-center justify-between">
        <ToggleTheme />
        <div className="group w-fit h-auto py-2 px-3 self-center cursor-pointer">
          <button className="w-full h-full">
            <FontAwesomeIcon icon={faBars} size={"1x"} className={"dark:text-signOut-dark text-signOut-light"} />
          </button>
          <span className={"dropdown-parent"}>
            <button className="w-full flex flex-row md:gap-2 justify-center items-center content-center dropdown-child" onClick={() => handleLogOut()}>
              <FontAwesomeIcon icon={faArrowRightFromBracket} className={"dark:text-signOut-dark text-signOut-light"} />
              <p className="md:text-lg text-base text-signOut-light dark:text-signOut-dark">Log Out</p>
            </button>
            {code && <button
              className="w-full flex flex-row md:gap-2 justify-center items-center content-center dropdown-child"
              onClick={() => handleLeaveChat()}>
              <FontAwesomeIcon icon={faCommentSlash} className={"dark:text-signOut-dark text-signOut-light"} />
              <p className="md:text-lg text-base text-signOut-light dark:text-signOut-dark">Leave Chat</p>
            </button>}
          </span>
        </div>
      </nav>
    </>
  );
}
