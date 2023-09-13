import { useSignal } from "@preact/signals";

export interface NumberInputProps {
  onInput?: (value: string) => void;
  default?: string;
  label?: string;
  caption?: string;
}

export function NumberInput(
  { onInput, default: defaultValue, label, caption }: NumberInputProps,
) {
  const value = useSignal(defaultValue ?? "");

  return (
    <div className="w-full">
      <label>
        {label ? <div className="select-none text-sm">{label}</div> : ""}
        <input
          type="number"
          onInput={(e) => value.value = (e.target as HTMLInputElement).value}
          value={value}
          className="text-sm w-full p-1 rounded-md focus:outline-none border hover:border-gray-400 focus:border-accent bg-white border-gray-300"
          style={{ transition: "border 0.125s" }}
        />
      </label>
      {caption ? <div className="text-sm">{caption}</div> : ""}
    </div>
  );
}
