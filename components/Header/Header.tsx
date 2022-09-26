import { NextComponentType } from "next";

// Components
import { ToggleTheme } from "../ToggleTheme";

export const Header: NextComponentType = () => {

  return (
    <div className="w-full h-auto py-4 px-0 flex flex-col gap-3">
      {/* Chatnext header */}
      <div className="w-full h-auto flex flex-row gap-2 items-center content-center justify-center">
        <h2 className="md:text-2xl text-xl text-slate-800 dark:text-slate-200">Welcome to</h2>
        <ToggleTheme />
      </div>
      {/* Description */}
      <small className="text-base font-medium tracking-wider text-slate-800 dark:text-gray-200 font-sans text-center">Reliable and secure messaging website.</small>
    </div>
  )
}
