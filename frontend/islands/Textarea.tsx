import { useSignal } from "@preact/signals";

export interface TextAreaProps {
  onInput?: (value: string) => void;
  default?: string;
  label?: string;
  caption?: string;
}

export function TextArea(
  { onInput, default: defaultValue, label, caption }: TextAreaProps,
) {
  const value = useSignal(defaultValue ?? "");

  return (
    <div className="w-full">
      <label>
        {label ? <div className="select-none text-sm">{label}</div> : ""}
        <textarea
          onInput={(e) => value.value = (e.target as HTMLInputElement).value}
          value={value}
          className="w-full p-1 rounded-md focus:outline-none border hover:border-gray-400 focus:border-accent bg-white border-gray-300"
          style={{ transition: "border 0.125s" }}
        />
      </label>
      {caption ? <div className="text-sm">{caption}</div> : ""}
    </div>
  );
}
