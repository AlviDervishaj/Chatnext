import { NextComponentType } from "next";
import { MouseEvent, TouchEvent } from "react";

export const ToggleTheme: NextComponentType = () => {
  const handleThemeChange = (event: any): void => {
    event.preventDefault();
    const theme: string | null = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };
  return (
    <button
      onClick={(event: TouchEvent | MouseEvent) => handleThemeChange(event)}
      className="text-center md:text-2xl md:font-bold font-normal text-xl text-toggleTheme-light dark:text-toggleTheme-dark"
    >Chatnext</button>
  )
}
