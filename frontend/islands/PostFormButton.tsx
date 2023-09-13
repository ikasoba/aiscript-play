import { useEffect } from "preact/hooks";
import { Button } from "./Button.tsx";
import { useSignal } from "@preact/signals";
import localforage from "localforage";

declare const localforage:
  (typeof import("../@types/localforage.ts"))["default"];

export interface PostFormButton {
  text?: string;
  primary?: boolean;
  rounded?: boolean;
  form?: { text: string };
}
export function PostFormButton(
  { text, primary = false, rounded, form }: PostFormButton,
) {
  const myInstance = useSignal<string | null>(null);

  useEffect(() => {
    (async () => {
      myInstance.value = await localforage.getItem<string>("myInstance");
    })();
  });

  return (
    <Button
      primary={primary}
      rounded={rounded}
      text={text}
      onClick={() => {
        if (!(myInstance.value && form)) return;
        const url = new URL("/share", myInstance.value);

        url.searchParams.set("text", form.text);

        window.open(url, "_blank");
      }}
    />
  );
}
