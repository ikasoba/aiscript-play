import { utils, values } from "@syuilo/aiscript";
import { Text, TextProps } from "../components/Text.tsx";
import { nanoid } from "nanoid/nanoid.ts";
import { ButtonProps } from "../islands/Button.tsx";
import { TextInputProps } from "../islands/TextInput.tsx";
import { NumberInputProps } from "../islands/NumberInput.tsx";
import { TextAreaProps } from "../islands/Textarea.tsx";
import { ContainerProps } from "../components/Container.tsx";
import { FolderProps } from "../islands/Folder.tsx";
import { SwitchProps } from "../islands/Switch.tsx";
import { PostFormButton } from "../islands/PostFormButton.tsx";
import { MfmProps } from "../islands/Mfm.tsx";

export const getTextOption = (
  opt: values.VObj,
): (AiScriptComponent & { type: "text" })["props"] => {
  const text = opt.value.get("text");
  const size = opt.value.get("size");
  const bold = opt.value.get("bold");
  const color = opt.value.get("color");
  const font = opt.value.get("font");

  if (text) utils.assertString(text);
  if (size) utils.assertNumber(size);
  if (bold) utils.assertBoolean(bold);
  if (color) utils.assertString(color);
  if (font) utils.assertString(font);

  return {
    text: text?.value,
    size: size?.value,
    bold: bold?.value,
    color: color?.value,
    font: font?.value,
  };
};

export const getRootOption = (
  opt: values.VObj,
): AiScriptComponents["root"]["props"] => {
  const children = opt.value.get("children");
  if (children) utils.assertArray(children);

  return {
    children: children?.value.map((x) => utils.valToJs(x)),
  };
};

export const getButtonOption = (
  opt: values.VObj,
): AiScriptComponents["button"]["props"] => {
  const text = opt.value.get("text");
  const onClick = opt.value.get("onClick");
  const primary = opt.value.get("primary");
  const rounded = opt.value.get("rounded");
  const disabled = opt.value.get("disabled");

  if (text) utils.assertString(text);
  if (onClick) utils.assertFunction(onClick);
  if (primary) utils.assertBoolean(primary);
  if (rounded) utils.assertBoolean(rounded);
  if (disabled) utils.assertBoolean(disabled);

  return {
    text: text?.value,
    onClick: onClick,
    primary: primary?.value,
    rounded: rounded?.value,
    disabled: disabled?.value,
  };
};

export const getPostFormButtonOption = (
  opt: values.VObj,
): AiScriptComponents["postFormButton"]["props"] => {
  const text = opt.value.get("text");
  const form = opt.value.get("form");
  const primary = opt.value.get("primary");
  const rounded = opt.value.get("rounded");
  const disabled = opt.value.get("disabled");

  let formText: undefined | string = void 0;

  if (text) utils.assertString(text);
  if (form) {
    utils.assertObject(form);
    const tmp = form.value.get("text");
    utils.assertString(tmp);

    formText = tmp.value;
  }
  if (primary) utils.assertBoolean(primary);
  if (rounded) utils.assertBoolean(rounded);
  if (disabled) utils.assertBoolean(disabled);

  return {
    text: text?.value,
    form: formText == null ? formText : {
      text: formText,
    },
    primary: primary?.value,
    rounded: rounded?.value,
  };
};

export const getTextInputOption = (
  opt: values.VObj,
): AiScriptComponents["textInput"]["props"] => {
  const onInput = opt.value.get("onInput");
  const defaultValue = opt.value.get("default");
  const label = opt.value.get("label");
  const caption = opt.value.get("caption");

  if (onInput) utils.assertFunction(onInput);
  if (defaultValue) utils.assertString(defaultValue);
  if (label) utils.assertString(label);
  if (caption) utils.assertString(caption);

  return {
    onInput,
    default: defaultValue?.value,
    label: label?.value,
    caption: caption?.value,
  };
};

export const getNumberInputOption = (
  opt: values.VObj,
): AiScriptComponents["textInput"]["props"] => {
  const onInput = opt.value.get("onInput");
  const defaultValue = opt.value.get("default");
  const label = opt.value.get("label");
  const caption = opt.value.get("caption");

  if (onInput) utils.assertFunction(onInput);
  if (defaultValue) utils.assertString(defaultValue);
  if (label) utils.assertString(label);
  if (caption) utils.assertString(caption);

  return {
    onInput,
    default: defaultValue?.value,
    label: label?.value,
    caption: caption?.value,
  };
};

export const getTextareaOption = (
  opt: values.VObj,
): AiScriptComponents["textInput"]["props"] => {
  const onInput = opt.value.get("onInput");
  const defaultValue = opt.value.get("default");
  const label = opt.value.get("label");
  const caption = opt.value.get("caption");

  if (onInput) utils.assertFunction(onInput);
  if (defaultValue) utils.assertString(defaultValue);
  if (label) utils.assertString(label);
  if (caption) utils.assertString(caption);

  return {
    onInput,
    default: defaultValue?.value,
    label: label?.value,
    caption: caption?.value,
  };
};

export const getContainerOption = (
  opt: values.VObj,
  components: { [k: string]: AiScriptComponent },
): AiScriptComponents["container"]["props"] => {
  const children = opt.value.get("children");
  const align = opt.value.get("align");
  const bgColor = opt.value.get("bgColor");
  const fgColor = opt.value.get("fgColor");
  const font = opt.value.get("font");
  const borderWidth = opt.value.get("borderWidth");
  const borderColor = opt.value.get("borderColor");
  const padding = opt.value.get("padding");
  const rounded = opt.value.get("rounded");
  const hidden = opt.value.get("hidden");

  if (children) utils.assertArray(children);
  if (align) utils.assertString(align);
  if (bgColor) utils.assertString(bgColor);
  if (fgColor) utils.assertString(fgColor);
  if (font) utils.assertString(font);
  if (borderWidth) utils.assertNumber(borderWidth);
  if (borderColor) utils.assertString(borderColor);
  if (padding) utils.assertNumber(padding);
  if (rounded) utils.assertBoolean(rounded);
  if (hidden) utils.assertBoolean(hidden);

  return {
    children: children?.value.map((x) => {
      utils.assertObject(x);
      const id = x.value.get("id");
      utils.assertString(id);
      return components[id.value];
    }),
    align: align?.value,
    bgColor: bgColor?.value,
    fgColor: fgColor?.value,
    font: font?.value,
    borderWidth: borderWidth?.value,
    borderColor: borderColor?.value,
    padding: padding?.value,
    rounded: rounded?.value,
    hidden: hidden?.value,
  };
};

export const getFolderOption = (
  opt: values.VObj,
  components: { [k: string]: AiScriptComponent },
): AiScriptComponents["folder"]["props"] => {
  const children = opt.value.get("children");
  const title = opt.value.get("title");
  const opened = opt.value.get("opened");

  if (children) utils.assertArray(children);
  if (title) utils.assertString(title);
  if (opened) utils.assertBoolean(opened);

  return {
    children: children?.value.map((x) => {
      utils.assertObject(x);
      const id = x.value.get("id");
      utils.assertString(id);
      return components[id.value];
    }),
    title: title?.value,
    opened: opened?.value,
  };
};

export const getSwitchOption = (
  opt: values.VObj,
): AiScriptComponents["switch"]["props"] => {
  const onChange = opt.value.get("onChange");
  const checked = opt.value.get("checked");
  const label = opt.value.get("label");
  const caption = opt.value.get("caption");

  if (onChange) utils.assertFunction(onChange);
  if (checked) utils.assertBoolean(checked);
  if (label) utils.assertString(label);
  if (caption) utils.assertString(caption);

  return {
    onChange,
    checked: checked?.value,
    label: label?.value,
    caption: caption?.value,
  };
};

export const getMfmOption = (
  opt: values.VObj,
): (AiScriptComponent & { type: "mfm" })["props"] => {
  const text = opt.value.get("text");
  const size = opt.value.get("size");
  const bold = opt.value.get("bold");
  const color = opt.value.get("color");
  const font = opt.value.get("font");

  if (text) utils.assertString(text);
  if (size) utils.assertNumber(size);
  if (bold) utils.assertBoolean(bold);
  if (color) utils.assertString(color);
  if (font) utils.assertString(font);

  return {
    text: text?.value,
    size: size?.value,
    bold: bold?.value,
    color: color?.value,
    font: font?.value,
  };
};

export const getOption = <T extends keyof AiScriptComponents>(
  type: T,
  opt: values.VObj,
  components: { [k: string]: AiScriptComponent },
): Partial<AiScriptComponents[T]["props"]> => {
  if (type == "text") {
    return getTextOption(opt);
  } else if (type == "root") {
    return getRootOption(opt);
  } else if (type == "button") {
    return getButtonOption(opt);
  } else if (type == "textInput") {
    return getTextInputOption(opt);
  } else if (type == "numberInput") {
    return getNumberInputOption(opt);
  } else if (type == "textarea") {
    return getTextareaOption(opt);
  } else if (type == "container") {
    return getContainerOption(opt, components);
  } else if (type == "folder") {
    return getFolderOption(opt, components);
  } else if (type == "switch") {
    return getSwitchOption(opt);
  } else if (type == "postFormButton") {
    return getPostFormButtonOption(opt);
  } else if (type == "mfm") {
    return getMfmOption(opt);
  } else {
    let _: never = type;
    return type;
  }
};

export type AiScriptComponents = {
  "root": {
    type: "root";
    props: {
      children?: AiScriptComponent[];
    };
  };
  "text": {
    type: "text";
    props: TextProps;
  };
  "button": {
    type: "button";
    props: Omit<ButtonProps, "onClick"> & { onClick?: values.VFn };
  };
  "textInput": {
    type: "textInput";
    props: Omit<TextInputProps, "onInput"> & { onInput?: values.VFn };
  };
  "numberInput": {
    type: "numberInput";
    props: Omit<NumberInputProps, "onInput"> & { onInput?: values.VFn };
  };
  "textarea": {
    type: "textarea";
    props: Omit<TextAreaProps, "onInput"> & { onInput?: values.VFn };
  };
  "container": {
    type: "container";
    props: Omit<ContainerProps, "children"> & {
      children?: AiScriptComponent[];
    };
  };
  "folder": {
    type: "folder";
    props: Omit<FolderProps, "children"> & {
      children?: AiScriptComponent[];
    };
  };
  "switch": {
    type: "switch";
    props: Omit<SwitchProps, "onChange"> & {
      onChange?: values.VFn;
    };
  };
  "postFormButton": {
    type: "postFormButton";
    props: PostFormButton;
  };
  "mfm": {
    type: "mfm";
    props: MfmProps;
  };
};

export type AiScriptComponent = AiScriptComponents[keyof AiScriptComponents];

export const createComponentInstance = <T extends AiScriptComponent["type"]>(
  _id: string | null,
  type: T,
  props: (AiScriptComponent & { type: T })["props"],
  components: { [k: string]: AiScriptComponent },
  componentsMap: { [k: string]: values.VObj },
  onRedraw: () => void,
) => {
  const id = _id ?? nanoid();

  const component = {
    type,
    props,
  } as AiScriptComponent & { type: T };

  components[id] = component;

  const res = values.OBJ(
    new Map(Object.entries({
      "id": values.STR(id),
      "update": values.FN_NATIVE((args) => {
        utils.assertObject(args[0]);

        const tmp = getOption(type, args[0], components);
        const c = components[id] as AiScriptComponent & { type: T };
        const props = c.props;

        for (const k in tmp) {
          const value = tmp[k];
          if (value == null) continue;

          (props as any)[k] = value;
        }

        c.props = props;

        onRedraw();
      }),
    })),
  );

  componentsMap[id] = res;

  return [component, res] as const;
};

export const createUiLib = (
  onRedraw: () => void,
) => {
  const components: { [k: string]: AiScriptComponent } = {};
  const componentsMap: { [k: string]: values.VObj } = {};

  const rootComponent: AiScriptComponent = {
    type: "root",
    props: {
      children: [],
    },
  };

  return [
    rootComponent,
    {
      "Ui:render": values.FN_NATIVE((args) => {
        utils.assertArray(args[0]);

        rootComponent.props.children = args[0].value.map((x) => {
          utils.assertObject(x);
          const id = x.value.get("id");
          utils.assertString(id);

          console.log(components[id.value]);

          return components[id.value];
        });

        onRedraw();
      }),
      "Ui:get": values.FN_NATIVE((args) => {
        utils.assertString(args[0]);

        return componentsMap[args[0].value];
      }),
      "Ui:C:text": values.FN_NATIVE((args) => {
        utils.assertObject(args[0]);
        if (args[1]) utils.assertString(args[1]);

        const props = getTextOption(args[0]);

        const [_, res] = createComponentInstance(
          args[1]?.value ?? null,
          "text",
          props,
          components,
          componentsMap,
          onRedraw,
        );

        return res;
      }),
      "Ui:C:mfm": values.FN_NATIVE((args) => {
        utils.assertObject(args[0]);
        if (args[1]) utils.assertString(args[1]);

        const props = getMfmOption(args[0]);

        const [_, res] = createComponentInstance(
          args[1]?.value ?? null,
          "mfm",
          props,
          components,
          componentsMap,
          onRedraw,
        );

        return res;
      }),
      "Ui:C:button": values.FN_NATIVE((args) => {
        utils.assertObject(args[0]);
        if (args[1]) utils.assertString(args[1]);

        const props = getButtonOption(args[0]);

        const [_, res] = createComponentInstance(
          args[1]?.value ?? null,
          "button",
          props,
          components,
          componentsMap,
          onRedraw,
        );

        return res;
      }),
      "Ui:C:switch": values.FN_NATIVE((args) => {
        utils.assertObject(args[0]);
        if (args[1]) utils.assertString(args[1]);

        const props = getSwitchOption(args[0]);

        const [_, res] = createComponentInstance(
          args[1]?.value ?? null,
          "switch",
          props,
          components,
          componentsMap,
          onRedraw,
        );

        return res;
      }),
      "Ui:C:textInput": values.FN_NATIVE((args) => {
        utils.assertObject(args[0]);
        if (args[1]) utils.assertString(args[1]);

        const props = getTextInputOption(args[0]);

        const [_, res] = createComponentInstance(
          args[1]?.value ?? null,
          "textInput",
          props,
          components,
          componentsMap,
          onRedraw,
        );

        return res;
      }),
      "Ui:C:numberInput": values.FN_NATIVE((args) => {
        utils.assertObject(args[0]);
        if (args[1]) utils.assertString(args[1]);

        const props = getNumberInputOption(args[0]);

        const [_, res] = createComponentInstance(
          args[1]?.value ?? null,
          "numberInput",
          props,
          components,
          componentsMap,
          onRedraw,
        );

        return res;
      }),
      "Ui:C:textarea": values.FN_NATIVE((args) => {
        utils.assertObject(args[0]);
        if (args[1]) utils.assertString(args[1]);

        const props = getTextInputOption(args[0]);

        const [_, res] = createComponentInstance(
          args[1]?.value ?? null,
          "textInput",
          props,
          components,
          componentsMap,
          onRedraw,
        );

        return res;
      }),
      "Ui:C:container": values.FN_NATIVE((args) => {
        utils.assertObject(args[0]);
        if (args[1]) utils.assertString(args[1]);

        const props = getContainerOption(args[0], components);

        const [_, res] = createComponentInstance(
          args[1]?.value ?? null,
          "container",
          props,
          components,
          componentsMap,
          onRedraw,
        );

        return res;
      }),
      "Ui:C:folder": values.FN_NATIVE((args) => {
        utils.assertObject(args[0]);
        if (args[1]) utils.assertString(args[1]);

        const props = getFolderOption(args[0], components);

        const [_, res] = createComponentInstance(
          args[1]?.value ?? null,
          "folder",
          props,
          components,
          componentsMap,
          onRedraw,
        );

        return res;
      }),
      "Ui:C:postFormButton": values.FN_NATIVE((args) => {
        utils.assertObject(args[0]);
        if (args[1]) utils.assertString(args[1]);

        const props = getPostFormButtonOption(args[0]);

        const [_, res] = createComponentInstance(
          args[1]?.value ?? null,
          "postFormButton",
          props,
          components,
          componentsMap,
          onRedraw,
        );

        return res;
      }),
    } satisfies { [k: string]: values.Value },
  ] as const;
};
