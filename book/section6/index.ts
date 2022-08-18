// 特殊类型的特性

// IsAny
// any 类型与任何类型的交叉都是 any，也就是 1 & any 结果是 any。
type IsAny<T> = 1 extends (T & 0) ? true : false
type IsAnyRes = IsAny<1>
type IsAnyRe2 = IsAny<any>

// IsEqual
// type IsEqual<A, B> = (A extends B ? true : false) & (B extends A ? true : false) 写法没有办法判断出any
type IsEqual2<A, B> = (<T>() => T extends A ? 1 : 0) extends (<T>() => T extends B ? 1 : 0) ? true : false
type IsEqual2Res = IsEqual2<string, string>
type IsEqual2Res2 = IsEqual2<string, any>
type IsEqual2Res3 = IsEqual2<Function, object>

// IsUnion
type IsUnion2<A, B> = A extends A ? 
    [B] extends [A] ? false : true
    : never

// IsNever
// 如果条件类型左边是类型参数，并且传入的是 never，那么直接返回 never
type TestNever<T> = T extends number ? 1 : 2
type TestNeverRes = TestNever<never>

// any 在条件类型中也比较特殊，如果类型参数为 any，会直接返回 trueType 和 falseType 的合并
type TestAny<T> = T extends number ? 1 : 2
type TestAnyRes = TestAny<any>

type IsNever<A> = [A] extends [never] ? true : false
type IsNeverRes = IsNever<never>

// IsTuple
// 元组类型也是数组类型，但每个元素都是只读的，并且 length 是数字字面量，而数组的 length 是 number。
type IsTuple<T> = T extends readonly [...infer A] ?
    NotEqual<A['length'], number>
    : false
type NotEqual<A, B> = (<T>()=> T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? false : true
type IsTupleRes = IsTuple<[1,2,3]>
type IsTupleRes2 = IsTuple<number[]>

// UnionToIntersection
// 在 TypeScript 中有函数参数是有逆变的性质的，也就是如果参数可能是多个类型，参数类型会变成它们的交叉类型。
type UnionToIntersection<T> = 
    (T extends T ? (a: T) => unknown : never) extends (a: infer R) => unknown 
        ? R 
        : never
type UnionToIntersectionRes = UnionToIntersection<{a: 1} | {b: 2}>

// GetOptional
// 可选索引的值为 undefined 和值类型的联合类型
type GetOptional<T> = {
    [K in keyof T as 
        {} extends Pick<T,K> ? K : never
    ]: T[K]
}
type GetOptionalRes = GetOptional<{a: 1, b?: 2}>

// GetRequired
type GetRequired<T> = {
    [K in keyof T as 
        {} extends Pick<T,K> ? never : K
    ]: T[K]
}
type GetRequiredRes = GetRequired<{a: 1, b?: 2}>

// RemoveIndexSignature
// 索引签名不能构造成字符串字面量类型，因为它没有名字，而其他索引可以。
type RemoveIndexSignature<T> = {
    [K in keyof T as
        K extends `${infer Str}` ? Str : never
    ]: T[K]
}
type RemoveIndexSignatureRes = RemoveIndexSignature<{
    [key: string]: any;
    sleep(): void;
}>

// ClassPublicProps
// keyof 只能拿到 class 的 public 索引，private 和 protected 的索引会被忽略。
type ClassPublicProps<T> = {
    [K in keyof T]: T[K]
}
class Dog2 {
    private a: string
    protected b:  string
    public c: string
    constructor () {
    }
}
type ClassPublicPropsRes = ClassPublicProps<Dog2>

// as const
// TypeScript 默认推导出来的类型并不是字面量类型。但是类型编程很多时候是需要推导出字面量类型的，这时候就需要用 as const
const obj1 = {
    a: 1,
    b: 2
} as const

type Obj1 = typeof obj1