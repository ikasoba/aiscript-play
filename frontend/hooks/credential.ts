import { useEffect, useState } from "preact/hooks";
import { Storage } from "../storage/index.ts";

export function useUserCredential() {
  const [token, setToken] = useState<string | null>();
  const [instance, setInstance] = useState<string | null>();

  useEffect(() => {
    (async () => {
      const instance = await Storage.instance();
      const token = await Storage.token();

      console.log(instance, token);

      setToken(token);
      setInstance(instance);
    })();
  }, []);

  return [token, instance] as [token: string | null, instance: string | null];
}
