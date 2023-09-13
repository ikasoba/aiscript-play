import { asset, Head, IS_BROWSER } from "$fresh/runtime.ts";
import { useComputed, useSignal, useSignalEffect } from "@preact/signals";
import Counter from "../islands/Counter.tsx";
import { Switch } from "../islands/Switch.tsx";
import { Button } from "../islands/Button.tsx";
import { TextInput } from "../islands/TextInput.tsx";
import { TextArea } from "../islands/Textarea.tsx";
import { Play } from "../islands/Play.tsx";
import { Mfm } from "../islands/Mfm.tsx";
import { Folder } from "../islands/Folder.tsx";
import { PlayDebugger } from "../islands/PlayDebugger.tsx";
import { SiteHeader } from "../components/SiteHeader.tsx";
import { Storage } from "../storage/index.ts";
import { MisskeyPlaySearchBox } from "../islands/MisskeyPlaySearchBox.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>MiPlay Hub</title>
      </Head>
      <div>
        <SiteHeader />
        <MisskeyPlaySearchBox />
      </div>
    </>
  );
}
