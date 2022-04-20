type TrimLeft<V extends string> = V extends ` ${infer P}` ? TrimLeft<P> : V
type TrimRight<V extends string> = V extends `${infer P} ` ? TrimRight<P> : V

export type Trim<V extends string> = TrimLeft<TrimRight<V>>