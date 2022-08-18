// 分布式条件类型

// 当类型参数为联合类型，并且在条件类型左边直接引用该类型参数的时候，TypeScript 会把每一个元素单独传入来做类型运算，最后再合并成联合类型，这种语法叫做分布式条件类型。

// 是否是联合类型
type IsUnion<A, B = A> = A extends A ? 
    [B] extends [A] ? false : true 
    : never
type IsUnionRes = IsUnion<'1' | 2>
type IsUnionRes2 = IsUnion<'1'>

// BEM
type BEM<
    Block extends string,
    Element extends string[],
    Modifiers extends string[]
> =  `${Block}__${Element[number]}--${Modifiers[number]}`
type BEMRes = BEM<'aa', ['bb', 'cc'], ['dd', 'ee', 'ff']>