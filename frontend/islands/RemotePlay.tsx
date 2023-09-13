import { useComputed } from "@preact/signals";
import { Play } from "./Play.tsx";
import { useEffect, useState } from "preact/hooks";
import { Container } from "../components/Container.tsx";
import { Text } from "../components/Text.tsx";
import { useUserCredential } from "../hooks/credential.ts";
import { useInterpreter } from "../hooks/interpreter.ts";
import { installLibrary } from "../utils/aiscript.ts";
import { createPlayStdLib } from "../aiscript/std.ts";
import { Parser } from "@syuilo/aiscript";

export function RemotePlay({ id, host }: { id: string; host: string }) {
  const [script, setScript] = useState("");

  const [token, instance] = useUserCredential();
  const interpreter = useInterpreter();

  useEffect(() => {
    (async () => {
      installLibrary(interpreter, await createPlayStdLib(token, instance));
      console.log(interpreter.exec(Parser.parse("USER_NAME")));

      const res = await fetch(new URL("/api/flash/show", host), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          i: token,
          flashId: id,
        }),
      });

      if (!res.ok) return;

      const flash = await res.json();

      setScript(flash.script);
    })();
  }, [token, instance]);

  console.log(interpreter);

  return (
    <div>
      {!(id && host)
        ? (
          <Container>
            <Text text="Invalid flashId or Host" />
          </Container>
        )
        : <Play interpreter={interpreter} script={script} />}
    </div>
  );
}
