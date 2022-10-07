// Next & React
import type { NextPage } from "next";
import { useRouter, NextRouter } from "next/router";
import { useEffect, useState } from "react";

// Firebase
import {
  onAuthStateChanged,
  Auth,
  getAuth,
  User,
  Unsubscribe,
} from "firebase/auth";

// Components
import { Authenticate } from "../components/Authenticate";
import { Loading } from "../components/Loading";

const Home: NextPage = () => {
  const auth: Auth = getAuth();
  const router: NextRouter = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe: Unsubscribe = onAuthStateChanged(
      auth,
      (_user: User | null) => {
        if (_user === null) return setIsLoading(false);
        else router.push("/create");
      }
    );
    return () => unsubscribe();
  }, [router, auth]);
  return (
    <>
      <main className="w-full h-full relative">
        {
          isLoading ? <Loading />
            : <Authenticate />
        }
      </main>
    </>
  );
};
export default Home;

