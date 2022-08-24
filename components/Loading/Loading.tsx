// Next
import { NextComponentType } from "next"

// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export const Loading: NextComponentType = () => {
  return (
    <div className="block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-transparent p-0 m-0">
      <FontAwesomeIcon icon={faSpinner} size={"3x"} className={"dark:text-loading-dark text-loading-light"} spinPulse />
    </div>
  )
}
