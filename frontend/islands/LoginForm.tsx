import { useEffect, useState } from "preact/hooks";
import { Button } from "./Button.tsx";
import { TextInput } from "./TextInput.tsx";
import { asset } from "$fresh/runtime.ts";
import { Storage } from "../storage/index.ts";

export function LoginForm() {
  const [instance, setInstance] = useState<string>("");
  const [iconUrl, setIconUrl] = useState<string>(asset("loading.svg"));

  useEffect(() => {
    (async () => {
      Storage.setInstance(instance);

      let res = await fetch(new URL("/api/meta", instance));
      if (res.status == 405) {
        res = await fetch(new URL("/api/meta", instance), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}),
        });
      }

      const data = await res.json();

      setIconUrl(data.iconUrl);
    })();
  }, [instance]);

  return (
    <main className="flex flex-col justify-center items-center w-full p-16 gap-4">
      <h1 className="text-2xl font-bold">ログインするインスタンスを入力</h1>
      <img src={iconUrl} className="aspect-square w-32 rounded-lg" />
      <TextInput
        onInput={(value) => {
          setInstance(
            value
              .replace(/^https?:\/*/, "https://")
              .replace(/^(?<!https?:\/\/)/, "https://"),
          );
        }}
      />
      <Button
        onClick={() => {
          const session = crypto.randomUUID();
          const url = new URL(
            `./miauth/${session}`,
            instance,
          );

          url.searchParams.set(
            "icon",
            asset("favicon.svg"),
          );
          url.searchParams.set(
            "name",
            "MiPlay Hub",
          );
          url.searchParams.set(
            "permission",
            "read:account",
          );
          url.searchParams.set(
            "callback",
            new URL("/callback", location.href).toString(),
          );

          location.href = url.toString();
        }}
        text="ログイン"
      />
    </main>
  );
}
