import { useComputed, useSignal, useSignalEffect } from "@preact/signals";
import { TextInput } from "./TextInput.tsx";
import { Play } from "./Play.tsx";
import { Button } from "./Button.tsx";

export function PlayDebugger() {
  const host = useSignal("https://misskey.io/");
  const flashId = useSignal("");
  const script = useSignal("");

  const fetchScript = async () => {
    if (flashId.value == "") return;

    const res = await fetch(new URL("/api/flash/show", host.value), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        i: null,
        flashId: flashId.value,
      }),
    });

    if (!res.ok) return;

    const flash = await res.json();

    script.value = flash.script;
  };

  return (
    <div>
      <TextInput
        label="misskey host"
        onInput={(value) => {
          host.value = value;
        }}
      />
      <TextInput
        label="flash id"
        onInput={(value) => {
          flashId.value = value;
        }}
      />
      <Button
        text="取得"
        onClick={() => {
          fetchScript();
        }}
      />

      <Play
        script={script.value}
      />
    </div>
  );
}
