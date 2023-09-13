import { JSX } from "preact";
import { tw } from "twind";

export interface ButtonProps {
  text?: string;
  onClick?: () => void;
  primary?: boolean;
  rounded?: boolean;
  disabled?: boolean;
}

export function Button(
  { text, onClick, primary = false, rounded = false, disabled = false }:
    ButtonProps,
) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={tw`${
        primary
          ? "bg-accent text-white font-bold"
          : (disabled ? "bg-gray-50 text-gray-400" : "bg-gray-100")
      } ${
        rounded ? "rounded-full" : "rounded-md"
      } disabled:!filter-none p-2 disabled:cursor-default
        hover:filter active:filter
        hover:brightness-95 active:brightness-75
        transition focus:outline-none select-none
        text-sm
        z-[1]
      `}
      style={{
        minWidth: "100px",
      }}
    >
      {text}
    </button>
  );
}
