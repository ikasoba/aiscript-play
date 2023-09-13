import loader, { Monaco } from "@monaco-editor/loader";
import { useEffect, useRef, useState } from "preact/hooks";
import Monokai from "monaco-themes/themes/Monokai.json" assert { type: "json" };

let defineThemeQueue: [
  name: string,
  value: import("monaco-editor").editor.IStandaloneThemeData,
][] = [];

let monaco_cache: Monaco | null = null;

export function defineTheme(...args: (typeof defineThemeQueue)[0]) {
  const [name, value] = args;

  if (monaco_cache) return monaco_cache.editor.defineTheme(name, value);

  defineThemeQueue.push([name, value]);
}

defineTheme("monokai", Monokai as any);

export function useMonaco() {
  const [_monaco, set_monaco] = useState<Monaco>();

  useEffect(() => {
    if (monaco_cache != null) {
      set_monaco(monaco_cache);
    } else {
      loader.init().then((monaco) => {
        monaco_cache = monaco;

        for (const [name, value] of defineThemeQueue) {
          monaco.editor.defineTheme(name, value);
        }

        console.log("aaaa", monaco);

        set_monaco(monaco);
      });
    }
  }, []);

  return _monaco;
}

export function MonacoHighlight(
  { code, lang, monacoInstance, option, background }: {
    code: string;
    lang: string;
    monacoInstance?: Monaco;
    option?: import("monaco-editor").editor.IColorizerElementOptions;
    background?: string;
  },
) {
  const monaco = monacoInstance ?? useMonaco();
  const codeRef = useRef<HTMLElement>(null);

  console.log(monaco);

  useEffect(() => {
    if (!(monaco && codeRef.current)) return;

    monaco.editor.colorizeElement(codeRef.current, option ?? {});
  }, [monaco, codeRef]);

  return (
    <pre style={{ backgroundColor: background }} className="p-2 rounded-md">
      <code data-lang={lang} ref={codeRef}>
        {code}
      </code>
    </pre>
  );
}
