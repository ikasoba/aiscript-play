import { tw } from "twind";
import { JSX } from "preact/jsx-runtime";

export interface ContainerProps {
  children?: JSX.Element[] | JSX.Element;
  align?: string;
  bgColor?: string;
  fgColor?: string;
  font?: string;
  borderWidth?: number;
  borderColor?: string;
  padding?: number;
  rounded?: boolean;
  hidden?: boolean;
}
export function Container(
  {
    children,
    align,
    bgColor,
    fgColor,
    font,
    borderWidth,
    borderColor,
    padding,
    rounded = true,
    hidden,
  }: ContainerProps,
) {
  return (
    <div
      className={tw`${
        rounded ? "rounded-md" : "rounded-none"
      } flex flex-col gap-2`}
      style={{
        alignItems: align,

        backgroundColor: bgColor,
        color: fgColor,
        font,
        borderWidth,
        borderColor,
        padding: `${padding ?? 6}px`,
        visibility: hidden ? "hidden" : null,
      }}
    >
      {children}
    </div>
  );
}
