import { asset, Head } from "$fresh/runtime.ts";
import { useEffect } from "preact/hooks";
import { SiteHeader } from "../islands/SiteHeader.tsx";
import { Storage } from "../storage/index.ts";
import { MiAuthCallback } from "../islands/MiAuthCallback.tsx";
import { tw } from "twind";

export default function CallBack() {
  return (
    <>
      <Head>
        <title>MiPlay Hub</title>
      </Head>
      <div>
        <SiteHeader />
        <main className={tw`flex justify-center items-center`}>
          <img src={asset("/loading.svg")} alt="少し待ってね" className="w-8" />
        </main>
        <MiAuthCallback />
      </div>
    </>
  );
}
