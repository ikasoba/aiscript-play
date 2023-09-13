import { Interpreter, Parser, values } from "@syuilo/aiscript";
import { AiScriptComponent, createUiLib } from "../aiscript/Ui.tsx";
import {
  computed,
  Signal,
  signal,
  useComputed,
  useSignal,
} from "@preact/signals";
import { JSX } from "preact/jsx-runtime";
import { useEffect, useMemo, useState } from "preact/hooks";
import { Text } from "../components/Text.tsx";
import { Button } from "./Button.tsx";
import { Container } from "../components/Container.tsx";
import { Folder } from "./Folder.tsx";
import { Switch } from "./Switch.tsx";
import { NumberInput } from "./NumberInput.tsx";
import { TextInput } from "./TextInput.tsx";
import { TextArea } from "./Textarea.tsx";
import { PostFormButton } from "./PostFormButton.tsx";
import { Mfm } from "./Mfm.tsx";

export interface PlayProp {
  script: string;
  interpreter: Interpreter;
  parser?: Parser;
}

const drawComponent = (
  x: AiScriptComponent,
  runtime: Interpreter,
): JSX.Element => {
  if (x.type == "text") {
    return <Text {...x.props} />;
  } else if (x.type == "root") {
    return (
      <>
        {...x.props.children?.map((x) => (
          <div>{drawComponent(x, runtime)}</div>
        )) ?? []}
      </>
    );
  } else if (x.type == "button") {
    const props = {
      ...x.props,
      onClick() {
        if (x.props.onClick) runtime.execFn(x.props.onClick, []);
      },
    };
    return <Button {...props} />;
  } else if (x.type == "container") {
    return (
      <Container {...{ ...x.props, children: void 0 }}>
        {...x.props.children?.map((x) => drawComponent(x, runtime)) ?? []}
      </Container>
    );
  } else if (x.type == "folder") {
    return (
      <Folder {...{ ...x.props, children: void 0 }}>
        {...x.props.children?.map((x) => drawComponent(x, runtime)) ?? []}
      </Folder>
    );
  } else if (x.type == "switch") {
    const props = {
      ...x.props,
      onChange(value: boolean) {
        if (x.props.onChange) {
          runtime.execFn(x.props.onChange, [values.BOOL(value)]);
        }
      },
    };
    return <Switch {...props} />;
  } else if (x.type == "numberInput") {
    const props = {
      ...x.props,
      onInput(value: string) {
        if (x.props.onInput) {
          runtime.execFn(x.props.onInput, [values.STR(value)]);
        }
      },
    };

    return <NumberInput {...props} />;
  } else if (x.type == "textInput") {
    const props = {
      ...x.props,
      onInput(value: string) {
        if (x.props.onInput) {
          runtime.execFn(x.props.onInput, [values.STR(value)]);
        }
      },
    };

    return <TextInput {...props} />;
  } else if (x.type == "textarea") {
    const props = {
      ...x.props,
      onInput(value: string) {
        if (x.props.onInput) {
          runtime.execFn(x.props.onInput, [values.STR(value)]);
        }
      },
    };

    return <TextArea {...props} />;
  } else if (x.type == "postFormButton") {
    return <PostFormButton {...x.props} />;
  } else if (x.type == "mfm") {
    return <Mfm {...x.props} />;
  }

  return x;
};

export function Play(
  { script, interpreter, parser = new Parser() }: PlayProp,
) {
  const [rendered, setRendered] = useState<JSX.Element>();

  const onRedraw = () => {
    console.log(1234, root);
    setRendered(drawComponent(root, interpreter));
  };

  const [root, lib] = useMemo(() => createUiLib(onRedraw), []);

  // サーバーサイドでaiscriptが動いて大変なことになるので
  useEffect(() => {
    for (const k in lib) {
      interpreter.scope.add(k, lib[k as keyof typeof lib]);
    }
  }, []);

  useEffect(() => {
    console.log("run");
    interpreter.exec(parser.parse(script));
  }, [script]);

  return (
    <div className="p-2 flex flex-col gap-2">
      {rendered}
    </div>
  );
}
