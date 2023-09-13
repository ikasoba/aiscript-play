import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { Signal, useComputed, useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import { tw } from "twind";
import { aspectRatio } from "@twind/aspect-ratio/";

export interface SwitchProps {
  checked?: boolean | Signal<boolean>;
  label?: string;
  caption?: string;
  onChange?: (v: boolean) => void;
}

export function Switch(
  { checked = false, label, caption, onChange }: SwitchProps,
) {
  const isChecked = typeof checked == "boolean" ? useSignal(checked) : checked;

  return (
    <label className="flex items-start gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={isChecked}
        className="hidden"
        onClick={() => (isChecked.value = !isChecked.value,
          onChange?.(isChecked.value))}
      />
      <div
        className={tw`p-1 text-sm ${
          isChecked.value ? "bg-accent" : "bg-gray-300"
        } rounded-xl`}
      >
        <div
          className={tw`rounded-lg w-4 h-4 bg-white ${
            isChecked.value ? "ml-3" : "mr-3"
          }`}
          style={{ aspectRatio: "1/1", transition: "margin 0.125s" }}
        >
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <span className="select-none">{label}</span>
        <span className="select-none text-xs">{caption}</span>
      </div>
    </label>
  );
}
