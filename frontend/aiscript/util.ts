import { values } from "@syuilo/aiscript";

declare const DummySymbol: unique symbol;
interface _TypedMap<O>
  extends Omit<Map<keyof O, O[keyof O]>, "get" | "set" | "has"> {
  [DummySymbol]: O;

  get<K extends keyof this[typeof DummySymbol]>(
    key: K,
  ): this[typeof DummySymbol][K];

  set<K extends keyof this[typeof DummySymbol]>(
    key: K,
    value: this[typeof DummySymbol][K],
  ): this;

  has<K extends keyof this[typeof DummySymbol]>(
    key: K,
  ): this is _TypedMap<{ [_ in K]: {} }>;
}

export type TypedMap<O> = _TypedMap<Partial<O>>;

type ExtractValueFromAssertFunc<F> = F extends
  (value: any) => asserts value is infer T ? T : never;
type SchemaToObj<
  Schema extends {
    [k: string]: (value: values.Value) => asserts value is values.Value;
  },
> = {
  [K in keyof Schema]: ExtractValueFromAssertFunc<Schema[K]>;
};
