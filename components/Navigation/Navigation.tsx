// Next
import { FC } from "react";

// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faBars, faCommentSlash, faShare } from "@fortawesome/free-solid-svg-icons";

// Components
import { ToggleTheme } from "../ToggleTheme";
import { useEffect, useState } from "react";
import { NextRouter, useRouter } from "next/router";

// Helpers
import { NavigationProps, ShareRoomCodeStruct } from "./NavigationHelpers";

export const Navigation: FC<NavigationProps> = ({ handleLogOut }) => {
  const router: NextRouter = useRouter();
  const [code, setCode] = useState<string | null>(null);
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleLeaveChat = () => {
    localStorage.removeItem("code");
    // navigate away from chat room
    router.push("/join");
  }

  const displayError = (_error: string) => {
    setError(_error);
    setTimeout(() => {
      setError("")
    }, 2500)
  }

  const displayMessage = (_message: string) => {
    setMessage(_message);
    setTimeout(() => {
      setMessage("");
    }, 2500)
  }

  const handleShareCode = async (): Promise<any> => {
    if (code === null) return;
    if (!navigator) return displayError("Could not find navigator API.")
    // code in localStorage
    const data: ShareRoomCodeStruct = {
      title: "Follow this link to join my ChatNext room.",
      url: location.href,
      text: "This is text area.",
    };
    if (navigator.share) {
      await navigator.share(data);
      return displayMessage("Shared chat room successfully.")
    }
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`Follow this link to join my ChatNext room: ${location.href}`);
      return displayMessage("Link copied successfully. ");
    }
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
            <button className="navigation-quick-link" onClick={() => handleLogOut()}>
              <FontAwesomeIcon icon={faArrowRightFromBracket} className={"dark:text-signOut-dark text-signOut-light"} />
              <p className="md:text-lg text-base text-signOut-light dark:text-signOut-dark">Log Out</p>
            </button>
            {code && <>
              <button
                className="navigation-quick-link"
                onClick={() => handleLeaveChat()}>
                <FontAwesomeIcon icon={faCommentSlash} className={"dark:text-signOut-dark text-signOut-light"} />
                <p className="md:text-lg text-base text-signOut-light dark:text-signOut-dark">Leave Chat</p>
              </button>
              <button
                className="navigation-quick-link"
                onClick={() => handleShareCode()}>
                <FontAwesomeIcon icon={faShare} className={"dark:text-signOut-dark text-signOut-light"} />
                <p className="md:text-lg text-base text-signOut-light dark:text-signOut-dark">Invite via link</p>
              </button>

            </>}
          </span>
        </div>
      </nav>
      {error && <div className="absolute bottom-20 left-1/2 text-center -translate-x-1/2 rounded-lg bg-red-400 w-11/12 md:w-1/2">
        <p className="text-slate-100 text-base md:text-lg tracking-wide">{error}</p>
      </div>}
      {message && <div className="absolute bottom-20 left-1/2 text-center -translate-x-1/2 rounded-lg bg-green-400 w-11/12 md:w-1/2">
        <p className="text-slate-900 text-base md:text-lg tracking-wide">{message}</p>
      </div>}
    </>
  );
}
