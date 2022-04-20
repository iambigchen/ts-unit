export type PromiseValue<PromiseType> = PromiseType extends PromiseLike<infer Value> ? PromiseValue<Value> : PromiseType;
