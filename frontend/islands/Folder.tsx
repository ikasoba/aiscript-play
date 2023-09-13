import { JSX } from "preact/jsx-runtime";
import { useSignal } from "@preact/signals";
import { ComponentChildren } from "preact";
import { useComputed } from "@preact/signals";
import { useState } from "preact/hooks";
import { tw } from "twind";

export interface FolderProps {
  children?: ComponentChildren | ComponentChildren[];
  title?: string;
  opened?: boolean;
}
export function Folder(
  {
    children,
    title,
    opened = true,
  }: FolderProps,
) {
  const isOpened = useSignal(opened);

  const close = () => {
    console.log("close");
    isOpened.value = false;
  };

  const open = () => {
    console.log("open");
    isOpened.value = true;
  };

  return (
    <div className="rounded-md flex flex-col bg-white overflow-hidden w-full border border-gray-50">
      <button
        className="bg-gray-50 p-2 focus:outline-none select-none flex justify-between items-center"
        onClick={() => isOpened.value ? close() : open()}
      >
        {title} {
          <div
            className={useComputed(() =>
              tw`${isOpened.value ? "rotate-180" : ""}`
            )}
          >
            <img src="/arrow-up.svg" className={"w-4"} />
          </div>
        }
      </button>
      <div
        className={useComputed(() =>
          tw`p-2 flex-col gap-2 ${isOpened.value ? "hidden" : "flex"}`
        )}
      >
        {children}
      </div>
    </div>
  );
}
