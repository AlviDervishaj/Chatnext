// Next
import { NextComponentType } from "next";

// Components
import { SignIn } from "../SignIn";
import { Header } from "../Header";

export const Authenticate: NextComponentType = () => {
  return (
    <div className={"w-full h-full grid place-items-center"}>
      <Header />
      <SignIn />
    </div>
  )
}
