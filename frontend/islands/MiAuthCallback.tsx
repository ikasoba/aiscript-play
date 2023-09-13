import { useEffect } from "preact/hooks";
import { Storage } from "../storage/index.ts";

export function MiAuthCallback() {
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const session = params.get("session");
    console.log(session);
    if (typeof session != "string") return;

    (async () => {
      const instance = await Storage.instance();
      console.log(instance);
      if (typeof instance != "string") return;

      const res = await fetch(
        new URL(`/api/miauth/${session}/check`, instance),
        {
          method: "POST",
        },
      );

      if (!res.ok) return;

      const token = (await res.json()).token;

      await Storage.setToken(token);

      location.href = "/";
    })();
  }, []);

  return <></>;
}
