import { AppProps } from "$fresh/server.ts";
import { asset, Head } from "$fresh/runtime.ts";

export default function App({ Component }: AppProps) {
  return (
    <>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="icon"
          href={asset("/favicon.svg")}
          type="image/svg+xml"
        />
        <link
          rel="icon"
          href={asset("/favicon.png")}
          type="image/png"
        />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1.0,maximum-scale=1.0"
        />
      </Head>
      <Component />
    </>
  );
}
