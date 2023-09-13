import { useEffect, useState } from "preact/hooks";
import { Storage } from "../storage/index.ts";

export function LogoutLogic() {
  useEffect(() => {
    (async () => {
      const instance = await Storage.instance();
      const token = await Storage.token();

      console.log(instance, token);

      if (instance == null || token == null) {
        location.href = "/";
      }

      await Storage.setInstance(null);
      await Storage.setToken(null);

      location.href = "/";
    })();
  });

  return <></>;
}
