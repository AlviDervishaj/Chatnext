// Next & React
import { NextComponentType } from "next";
import { useRouter, NextRouter } from "next/router";
import { useEffect, useState } from "react";

// Firebase
import { Auth, getAuth, onAuthStateChanged, User } from "firebase/auth";

// Components
import { Loading } from "../../components/Loading";

// Helpers
import { checkIfRoomExists } from "../../firebase-helpers";
import { ReturnType } from "../../firebase-helpers/helpers";

const Share: NextComponentType = () => {
  const router: NextRouter = useRouter();
  const auth: Auth = getAuth();
  const [status, setStatus] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // check code in slug
  useEffect((): any => {
    const checkCodeAndUser = async (): Promise<any> => {

      setIsLoading(true);
      setStatus("Checking for Google Account.");
      onAuthStateChanged(auth, (_user: User | null) => {
        if (_user === null) return router.push("/");
        return;
      })
      setStatus("Checking room code.");

      const { slug } = router.query;

      if (slug === undefined) return;
      if (slug.length !== 4) return;
      if (typeof slug !== "string") return;

      // slug is in router query
      // check if room exists
      setStatus("Checking if room exists.")
      const response: ReturnType = await checkIfRoomExists(slug)
      if (response.code === 400 && response.error === "Room does not exist.") {
        setStatus("Room does not exist. Redirecting to home page.")
        return await router.push("/join");
      }
      // room exists
      // join this room
      localStorage.setItem("code", slug);
      return await router.push('/room');

    }
    checkCodeAndUser();

  }, [auth, router]);

  return (
    <>
      {
        isLoading && (
          <div className={"text-center"} >
            <Loading />
            <p className={"loading-helper"}>{status}</p>
          </div >)
      }    </>

  )

}

export default Share;
