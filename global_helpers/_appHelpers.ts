
// Next & React
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";


export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

type MethodsAllowed = {
  methodsAllowed: ["GET" | "POST"] | "NOT ALLOWED",
}

interface ProtectedRoutes {
  route: string,
  type: "auth" | "admin"
}

export const protectedRoutes: Array<MethodsAllowed & ProtectedRoutes> = [
  {
    route: "/create",
    type: "auth",
    methodsAllowed: ["GET"]
  },
  {
    route: "/join",
    type: "auth",
    methodsAllowed: ["GET"]
  },
  {
    route: "/room",
    type: "auth",
    methodsAllowed: ["GET"]
  }
];

export const checkRoute = (path: string) => {
  let result: boolean = false;
  protectedRoutes.forEach((route) => {
    if (route.route === path) return result = true;
  });
  return result;
}
