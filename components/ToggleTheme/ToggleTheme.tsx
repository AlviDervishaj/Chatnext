import { useState } from "react";

import { NextComponentType } from "next";

export const ToggleTheme: NextComponentType = () => {
  const [theme, setTheme] = useState<string | null>(localStorage.getItem("theme"));

  const handleThemeChange = (event: any): void => {
    event.preventDefault();
    if (theme === "dark") {
      setTheme("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    else {
      setTheme("dark");
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };
  return (
    <button className="text-center md:text-2xl md:font-bold font-normal text-xl text-sky-600 dark:text-sky-300"
      onClick={(event: any) => handleThemeChange(event)}>Chatnext</button>
  )
}
