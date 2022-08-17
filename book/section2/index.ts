// 重新构造

// TypeScript 的 type、infer、类型参数声明的变量都不能修改，想对类型做各种变换产生新的类型就需要重新构造。

// 添加数据类型
type Push<Arr extends unknown[], T> = [...Arr, T]
type PushRes = Push<[1,2,3], 4>

// 类型混合
type Zip<A extends unknown[], B extends unknown[]> = A extends [infer A1, infer A2] ?
    B extends [infer B1, infer B2] ? [[A1, B1], [A2, B2]] : [] : []
type ZipRes = Zip<[1,2], ['A','B']>

type Zip2<A extends unknown[], B extends unknown[]> = A extends [infer A1, ...infer A2] ?
    B extends [infer B1, ...infer B2] ? [[A1, B1], ...Zip2<A2, B2>] : [] : []
type ZipRes2 = Zip2<[1,2,3], ['A','B','C']>

// 首字母大写
type CapitalizeStr<S extends string> = S extends `${infer First}${infer Other}` ? `${Uppercase<First>}${Other}` : S
type CapitalizeStrRes = CapitalizeStr<'abc'>

// 下划线改成驼峰
type CamelCase<S extends string> = S extends `${infer First}_${infer Other}${infer Other2}` ? `${First}${Uppercase<Other>}${CamelCase<Other2>}` : S
type CamelCaseRes = CamelCase<'a_bc_def'>

// 删除某个字符串
type DropSubStr<S extends string, Sub extends string> = S extends `${infer First}${Sub}${infer Last}` ? `${DropSubStr<First, Sub>}${DropSubStr<Last, Sub>}` : S
type DropSubStrRes = DropSubStr<'abcbc', 'bc'>

// 函数参数添加类型
type AppendArgument<Func extends Function, NewArg extends unknown[]> = Func extends (...args: infer Arg) => any ? (...args: [...Arg, ...NewArg]) => any : never
type AppendArgumentRes = AppendArgument<(a: string, b: number) => any, [c: string, d: number]>

// key变为大写
type UppercaseKey<T extends object> = {
    [Key in keyof T as Uppercase<Key & string>]: T[Key]
}
type UppercaseKeyRes = UppercaseKey<{a: string}>

// 指定key和value的类型
type Record2<K extends string | symbol | number, T extends any> = {[P in K]: T}
type Record2Res = Record2<number, string>
let record2: Record2Res = {1: 'a'}

// 根据值的类型过滤key
type FilterByValueType<T extends object, V> = {
    [K in keyof T as T[K] extends V ? never : K]: T[K]
}
type FilterByValueTypeRes = FilterByValueType<{a: string, b: number}, number>