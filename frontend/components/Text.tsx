export interface TextProps {
  text?: string;
  size?: number;
  bold?: boolean;
  color?: string;
  font?: string;
}

export function Text(
  { text = "", size, bold = false, color = "#000", font }: TextProps,
) {
  return (
    <div
      style={{
        fontSize: size,
        fontWeight: bold ? "700" : "",
        color,
        fontFamily: font,
      }}
    >
      {text}
    </div>
  );
}
