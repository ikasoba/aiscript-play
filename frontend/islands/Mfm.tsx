import { JSX } from "preact/jsx-runtime";
import * as mfm from "mfm-js/";
import { createRef, FunctionComponent } from "preact";
import { useEffect, useMemo, useState } from "preact/hooks";
import localforage from "localforage";
import { useComputed, useSignal } from "@preact/signals";
import { Emojis } from "../utils/storage.ts";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { MonacoHighlight } from "./Monaco.tsx";
import { transform } from "https://deno.land/x/esbuild@v0.18.11/mod.js";
import { Storage } from "../storage/index.ts";

declare const localforage:
  (typeof import("../@types/localforage.ts"))["default"];

export interface MfmProps {
  text?: string;
  size?: number;
  bold?: boolean;
  color?: string;
  font?: string;
}

export const MfmTreeToPreactNode = (
  { tree, defaultHost, getFnComponent, emojisCache }: {
    tree: mfm.MfmNode;
    defaultHost: string;
    emojisCache: Emojis;
    getFnComponent: (
      name: string,
      defaultHost: string,
      emojis: Emojis,
    ) => FunctionComponent<{ fn: mfm.MfmFn }>;
  },
): JSX.Element => {
  switch (tree.type) {
    case "blockCode": {
      return (
        <MonacoHighlight
          lang={tree.props.lang ?? "javascript"}
          code={tree.props.code}
          background="#272822"
          option={{ theme: "monokai" }}
        />
      );
    }

    case "bold": {
      return (
        <b>
          {...tree.children.map((x) => (
            <MfmTreeToPreactNode
              tree={x}
              defaultHost={defaultHost}
              getFnComponent={getFnComponent}
              emojisCache={emojisCache}
            />
          ))}
        </b>
      );
    }

    case "center": {
      return (
        <div className="flex flex-col items-center">
          {...tree.children.map((x) => (
            <MfmTreeToPreactNode
              tree={x}
              defaultHost={defaultHost}
              getFnComponent={getFnComponent}
              emojisCache={emojisCache}
            />
          ))}
        </div>
      );
    }

    case "emojiCode": {
      const emojis = useSignal<Emojis>(emojisCache);
      const host = tree.props.name.split("@")[1] ?? defaultHost;
      const name = tree.props.name.split("@")[0];

      useEffect(() => {
        (async () => {
          let data = await localforage.getItem<Emojis>("emojis");

          if (data == null || data[host] == null) {
            const res = await fetch(
              new URL("./api/emojis", `https://${host}`),
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ i: null }),
              },
            );

            if (!res.ok) {
              console.error(res.status, res);
              return;
            }

            const emojiList: { emojis: [{ name: string; url: string }] } =
              await res.json();

            if (data == null) data = {};

            data[host] = emojiList.emojis.reduce(
              (p, c) => (p[c.name] = c.url, p),
              {} as Emojis[string],
            );

            localforage.setItem("emojis", data);
          }

          emojis.value = data;
        })();
      }, []);

      return (
        <img
          src={emojis.value[host]?.[name] ?? "/loading.svg"}
          className="w-6 inline-block"
        />
      );
    }

    case "fn": {
      const Component = getFnComponent(
        tree.props.name,
        defaultHost,
        emojisCache,
      );

      return <Component fn={tree} />;
    }

    case "hashtag": {
      const myInstance = useSignal<string | null>(null);

      useEffect(() => {
        (async () => {
          myInstance.value = await localforage.getItem<string>("myInstance");
        })();
      });

      return (
        <a
          href={new URL(
            `./tags/${encodeURIComponent(tree.props.hashtag)}`,
            myInstance.value || "https://misskey.io",
          ).toString()}
          className="text-orange-500"
        >
          #{tree.props.hashtag}
        </a>
      );
    }

    case "italic": {
      return (
        <i>
          {...tree.children.map((x) => (
            <MfmTreeToPreactNode
              tree={x}
              defaultHost={defaultHost}
              getFnComponent={getFnComponent}
              emojisCache={emojisCache}
            />
          ))}
        </i>
      );
    }

    case "link": {
      return (
        <a href={tree.props.url} className="text-cyan-500">
          {...tree.children.map((x) => (
            <MfmTreeToPreactNode
              tree={x}
              defaultHost={defaultHost}
              getFnComponent={getFnComponent}
              emojisCache={emojisCache}
            />
          ))}
        </a>
      );
    }

    case "url": {
      return (
        <a href={tree.props.url} className="text-cyan-500">
          {tree.props.url}
        </a>
      );
    }

    case "text": {
      return <>{tree.props.text}</>;
    }
  }

  console.log(tree);

  return <>Unknown</>;
};

export const getFnComponent =
  (name: string, defaultHost: string, emojis: Emojis) =>
  ({ fn }: { fn: mfm.MfmFn }) => {
    switch (fn.props.name) {
      case "scale": {
        console.log(fn.props);
        return (
          <span
            style={{
              display: "inline-block",
              transform: `scale(${fn.props.args.x}, ${fn.props.args.y})`,
            }}
          >
            {...fn.children.map((x) => (
              <MfmTreeToPreactNode
                tree={x as any}
                defaultHost={defaultHost}
                getFnComponent={getFnComponent}
                emojisCache={emojis}
              />
            ))}
          </span>
        );
      }

      case "position": {
        return (
          <span
            style={{
              display: "inline-block",
              transform:
                `translateX(${fn.props.args.x}em) translateY(${fn.props.args.y}em)`,
            }}
          >
            {...fn.children.map((x) => (
              <MfmTreeToPreactNode
                tree={x as any}
                defaultHost={defaultHost}
                getFnComponent={getFnComponent}
                emojisCache={emojis}
              />
            ))}
          </span>
        );
      }

      case "rotate": {
        return (
          <span
            style={{
              display: "inline-block",
              transform: `rotate(${fn.props.args.deg}deg)`,
            }}
          >
            {...fn.children.map((x) => (
              <MfmTreeToPreactNode
                tree={x as any}
                defaultHost={defaultHost}
                getFnComponent={getFnComponent}
                emojisCache={emojis}
              />
            ))}
          </span>
        );
      }

      case "bg": {
        return (
          <span
            style={{
              display: "inline-block",
              backgroundColor: `#${fn.props.args.color}`,
            }}
          >
            {...fn.children.map((x) => (
              <MfmTreeToPreactNode
                tree={x as any}
                defaultHost={defaultHost}
                getFnComponent={getFnComponent}
                emojisCache={emojis}
              />
            ))}
          </span>
        );
      }
    }
    return <>$[{fn.props.name}]</>;
  };

export function Mfm(
  { text = "", size, bold = false, color = "#000", font }: MfmProps,
) {
  const tree = useMemo(() => mfm.parse(text), [text]);
  const emojis = useSignal<Emojis>({});

  useEffect(() => {
    (async () => {
      emojis.value = await Storage.emojis() ?? {};
    })();
  }, []);

  return (
    <div
      className="text-sm whitespace-break-spaces"
      style={{
        fontSize: size ?? "14px",
        fontWeight: bold ? "700" : "",
        color,
        fontFamily: font,
      }}
    >
      {useMemo(() =>
        tree.map((x) => (
          <MfmTreeToPreactNode
            tree={x}
            defaultHost="misskey.io"
            getFnComponent={getFnComponent}
            emojisCache={emojis.value}
          />
        )), [text])}
    </div>
  );
}
