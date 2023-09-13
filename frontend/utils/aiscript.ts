import { Interpreter, values } from "@syuilo/aiscript";

export function installLibrary(
  interpreter: Interpreter,
  lib: { [k: string]: values.Value },
) {
  for (const k in lib) {
    interpreter.scope.add(k, lib[k]);
  }
}
