// Next
import { NextComponentType } from "next";

// Firebase
import { getAuth, Auth, signOut } from "firebase/auth";

// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

// Components
import { ToggleTheme } from "../ToggleTheme";

export const Navigation: NextComponentType = () => {
  const auth: Auth = getAuth();
  const handleLogOut = async () => {
    try {
      await signOut(auth);
    } catch (error: any) {
      console.log({ error });
    }
  }
  return (
    <>
      <nav className="flex flex-row items-center content-center justify-between ">
        <ToggleTheme />
        <button className="py-2 px-3 flex flex-row gap-2 justify-center items-center content-center" onClick={() => handleLogOut()}>
          <FontAwesomeIcon icon={faArrowRightFromBracket} className={"dark:text-slate-200 text-slate-800"} />
          <p className="md:text-lg text-base dark:text-slate-200">Log Out</p>
        </button>
      </nav>
    </>
  );
}
