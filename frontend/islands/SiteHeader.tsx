import { asset } from "$fresh/runtime.ts";
import { useEffect, useState } from "preact/hooks";
import { Storage } from "../storage/index.ts";

export function SiteHeader() {
  const [isLoginned, setIsLoginned] = useState(false);

  useEffect(() => {
    (async () => {
      const instance = await Storage.instance();
      const token = await Storage.token();

      if (instance && token) {
        setIsLoginned(true);
      }
    })();
  }, []);

  return (
    <header
      style={{ height: "4rem" }}
      className="py-2 px-4 mb-4 flex flex-row justify-between items-center bg-[rgba(255,255,255,0.25)] backdrop-blur-md shadow-md"
    >
      <img src={asset("logo.svg")} alt="MiPlay Hub" className="h-8" />
      {!isLoginned
        ? (
          <button className="flex flex-row items-center rounded-md shadow-black shadow-lg p-4 h-10">
            <a href="/login">
              ログイン
            </a>
          </button>
        )
        : (
          <button className="flex flex-row items-center rounded-md shadow-black shadow-lg p-4 h-10">
            <a href="/logout">
              ログアウト
            </a>
          </button>
        )}
    </header>
  );
}
