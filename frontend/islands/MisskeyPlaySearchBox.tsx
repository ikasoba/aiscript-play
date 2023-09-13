import { useEffect, useState } from "preact/hooks";
import { Storage } from "../storage/index.ts";
import { TextInput } from "./TextInput.tsx";
import { Container } from "../components/Container.tsx";
import { Button } from "./Button.tsx";

interface Flash {
  id: string;
  title: string;
  summary: string;
}

export function MisskeyPlaySearchBox() {
  useEffect(() => {
    (async () => {
      const instance = await Storage.instance();
      const token = await Storage.token();

      console.log(instance, token);

      if (instance == null || token == null) {
        location.href = "/login";
      }
    })();
  });

  const [flash, setFlash] = useState<Flash>();
  const [flashUrl, setFlashUrl] = useState<URL>();

  useEffect(() => {
    (async () => {
      if (flashUrl == null) return;

      const host = flashUrl.hostname;
      const id = flashUrl.href.split("/").at(-1);
      if (id == null) return;

      const body = await fetch(`https://${host}/api/flash/show`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          flashId: id,
        }),
      }).then((x) => x.json());

      setFlash(body);
    })();
  }, [flashUrl]);

  return (
    <div className="p-2 flex flex-col justify-center items-center gap-8">
      <h2 className="text-2xl font-bold">
        misskey playのURLを入力してください
      </h2>
      <TextInput
        onInput={(value) => {
          setFlashUrl(new URL(value));
        }}
      />
      {flash && (
        <Container>
          <h3 className="font-bold text-xl">{flash?.title}</h3>
          <p>{flash?.summary}</p>
          <Button
            text="遊ぶ"
            onClick={() => {
              if (flashUrl == null) return;

              const host = flashUrl.hostname;
              location.href = `/p/${flash.id}@${host}`;
            }}
          />
        </Container>
      )}
    </div>
  );
}
