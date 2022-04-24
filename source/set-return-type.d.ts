export type IsAny<T> = 0 extends (1 & T) ? true : false;
export type IsNever<T> = [T] extends [never] ? true : false;
export type IsUnknown<T> = IsNever<T> extends false ? T extends unknown ? unknown extends T ? IsAny<T> extends false ? true : false : false : false : false;

type A = IsNever<never>

export type SetReturnType<Fn extends (...args: any[]) => any, TypeToReturn> = Fn extends (this: infer ThisArg, ...args: infer Arguments) => any ?
   (IsUnknown<ThisArg> extends true ? (...args: Arguments) => TypeToReturn : (this: ThisArg, ...args: Arguments) => TypeToReturn)
    : (...args: Parameters<Fn>) => TypeToReturn
    