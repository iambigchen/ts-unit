type arr = [1, 2, 3]

// 获取数组第一个类型
type GetFirst<T extends Array<unknown>> = T extends [infer K, ...unknown[]] ? K : never
type First = GetFirst<arr>

// 获取数组最后一个类型
type GetLast<T extends unknown[]> = T extends [...unknown[], infer K] ? K : never
type Last = GetLast<arr>

// 获取除了数组最后一个的其余类型
type PopArr<T extends unknown[]> = T extends [] ? [] : 
    T extends [...infer K, unknown] ? K : never
type Pop = PopArr<arr>
type Pop1 = PopArr<[]>

// 获取除了数组第一个的其余类型
type ShiftArr<T extends unknown[]> = T extends [] ? [] : 
    T extends [unknown, ...infer K] ? K : never
type Shift = ShiftArr<arr>
type Shift1 = ShiftArr<[]>

type s = 'abc'

// 字符串是否已某个字段开头
type StartWith<S extends string, Pre extends string> = S extends `${Pre}${string}` ? true : false
type IsStartWithA = StartWith<s, 'a'>
type IsStartWithB = StartWith<s, 'b'>

// 字符串替换某个字符串组成新类型
type ReplaceStr<S extends string, From extends string, To extends string> = S extends `${infer Pre}${From}${infer Suf}` ? `${Pre}${To}${Suf}` : S
type ReplaceB2X = ReplaceStr<s, 'b', 'x'>

type s1 = ' abc '
// 去除首尾空格
type TrimStrRight<S extends string> = S extends `${infer Pre}${' ' | '\t' | '\n'}` ? TrimStrRight<Pre> : S
type TrimStrRightResult = TrimStrRight<s1>

type TrimStrLeft<S extends string> = S extends `${' ' | '\s' | '\n'}${infer Suffix}` ? TrimStrLeft<Suffix> : S
type TrimStrLeftResult = TrimStrLeft<s1>

type TrimStr<S extends string> = TrimStrRight<TrimStrLeft<S>>
type TrimStrResult = TrimStr<s1>

// 提取函数参数类型
type GetParameters<T extends (...arg: any[]) => any> = T extends (...arg: infer P) => any ? P : never
type FunParams = GetParameters<(a: string, b: number) => any>

// 获取函数返回值类型
type GetReturn<T extends (...arg: any[]) => any> = T extends (...arg: any[]) => infer P ? P : never
type FunctionReturn = GetReturn<(a: string, b: number) => string>

// 获取props中ref属性值
type GetRefProps<P> = 'ref' extends keyof P ? 
    P extends {ref?: infer Value | undefined} ? Value : never
    : never

type GetRefPropsRes = GetRefProps<{ref: 1, name: 'dog'}>

