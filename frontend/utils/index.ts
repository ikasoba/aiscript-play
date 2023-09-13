export const getObjectKeys = <O extends {}>(o: O): ((keyof O) & string)[] =>
  Object.keys(o) as any[];
