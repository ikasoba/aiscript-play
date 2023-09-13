import { Interpreter } from "@syuilo/aiscript";
import { useMemo } from "preact/hooks";

export function useInterpreter() {
  return useMemo(() => {
    console.time("init interpreter");
    const i = new Interpreter({}, {});
    console.timeEnd("init interpreter");

    return i;
  }, []);
}
