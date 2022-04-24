export type Primitive = | string | number | bigint | boolean | symbol | null | undefined

export type Falsy = false | '' | 0 | null | undefined

export const isPrimitive = (val: unknown): val is Primitive => {
    if (val === null || val === undefined) {
        return true;
    }
    switch (typeof val) {
        case 'string':
        case 'number':
        case 'bigint':
        case 'boolean':
        case 'symbol': {
            return true;
        }
        default:
            return false;
        }
}

export type SetIntersection<A, B> = A extends B ? A : never

export type SetDifference<A, B> = A extends B ? never : A

export type SetComplement<A ,A1 extends A> = A extends A1 ? never : A

export type SymmetricDifference<A, B> = SetDifference<A | B, A & B>

export type FunctionKeys<T extends object> = {
    [K in keyof T]: T[K] extends Function ? K : never
}

type AB<T> = 'x' | 'y' extends 'x' ? 'a' : 'b';

type C = 'x' | 'y'

type All = AB<'x' | 'y'>; // 非确定条件，可能是 'x' 或 'y'
type All2 = AB<C>; // 非确定条件，可能是 'x' 或 'y'

