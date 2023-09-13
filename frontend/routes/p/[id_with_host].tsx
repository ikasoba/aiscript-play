import { Handlers, PageProps } from "$fresh/server.ts";
import { useComputed, useSignal } from "@preact/signals";
import { Play } from "../../islands/Play.tsx";
import { RemotePlay } from "../../islands/RemotePlay.tsx";
import { Head } from "$fresh/runtime.ts";

const service_host = Deno.env.get("host") ?? "http://localhost:8000";

export default function PlayPage(props: PageProps) {
  const id_with_host = props.params.id_with_host.split("@", 2);
  const id = id_with_host[0];
  const host = id_with_host[1].replace(/^(?<!https?:\/\/)/, "https://");

  return (
    <>
      <Head>
        <title>
          MiPlay Hub
        </title>
        <meta
          http-equiv="Content-Security-Policy"
          content="frame-src https://*"
        />
        <meta name="twitter:card" content="player" />
        <meta name="twitter:site" content="@ikasoba000" />
        <meta name="twitter:title" content="MiPlay Hub" />
        <meta
          name="twitter:description"
          content="どもでもMisskey Playを"
        />
        <meta
          name="twitter:player"
          content={new URL(`/p/${props.params.id_with_host}`, service_host)
            .toString()}
        />
        <meta name="twitter:player:width" content="640" />
        <meta name="twitter:player:height" content="480" />
      </Head>
      <div className="p-2">
        <RemotePlay id={id} host={host} />
      </div>
    </>
  );
}
