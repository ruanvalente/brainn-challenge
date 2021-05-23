import React from "react";
import { useWindowSize } from "../hooks/useWindowSize";

export function SVGSidebar(props: React.SVGProps<SVGSVGElement>) {
  const size = useWindowSize();

  if (size.width <= 762) {
    return (
      <svg
        width="100vw"
        height="100vh"
        viewBox="0 0 524 570"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M871.477 569.828C871.477 569.828 306.227 281.609 -347 569.828V-132L871.477 -132V569.828Z"
          fill={props.fill}
        />
      </svg>
    );
  }
  return (
    <svg
      {...props}
      viewBox="0 0 613 1080"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M613 0C613 0 361.26 501.011 613 1080H0V0H613Z"
        fill={props.fill}
      />
    </svg>
  );
}
