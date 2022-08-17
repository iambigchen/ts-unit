// 递归复用
// TypeScript 类型系统不支持循环，但支持递归。当处理数量（个数、长度、层数）不固定的类型的时候，可以只处理一个类型，然后递归的调用自身处理下一个类型，直到结束条件也就是所有的类型都处理完了，就完成了不确定数量的类型编程，达到循环的效果。

// 翻转数组
type ReverseArr<Arr extends unknown[]> = Arr extends [infer A, ...infer B] ? [...ReverseArr<B>, A] : Arr
type ReverseArrRes = ReverseArr<[1,2,3,4,5,6]>

// 判断数组中是否有该类型
type Includes<Arr extends unknown[], T> = Arr extends [infer A, ...infer B] ? 
    IsEqual<A, T> extends true ?  true : Includes<B, T> : false
type IncludesRes = Includes<[string, number], number>

type IsEqual<A, B> = (A extends B ? true : false) & (B extends A ? true : false);

// 删除数组中某一项，返回新数组
type RemoveItem<Arr extends unknown[], T> = Arr extends [infer A, ...infer B] ? 
    IsEqual<A, T> extends true ? RemoveItem<B, T> : [A, ...RemoveItem<B, T>] : Arr
type RemoveItemRes = RemoveItem<[1,2,3,4,2], 2>

// 构建某个长度的数组类型
type BuildArray<Length extends number, T = unknown, Arr extends unknown[] = []> = Arr['length'] extends Length ? Arr : BuildArray<Length, T, [T, ...Arr]>
type BuildArrayRes = BuildArray<2, string>

// 字符串改成联合类型
type StringToUnion<Str extends string> = Str extends `${infer A}${infer Other}` ? A | StringToUnion<Other> : never
type StringToUnionRes = StringToUnion<'abc'>

// 反转字符串
type ReverseStr<Str extends string> = Str extends `${infer A}${infer B}` ? `${ReverseStr<B>}${A}` : Str
type ReverseStrRes = ReverseStr<'abc'>

// 深度readonly
type DeepReadonly<T> =  T extends any ? {
    readonly[K in keyof T]: T[K] extends object ? 
        T[K] extends Function ? T[K] :
        DeepReadonly<T[K]> : T[K]
} : never
type DeepReadonlyRes = DeepReadonly<{a: {b: string}}>