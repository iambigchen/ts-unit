
/**
 * 将T所有属性变成可选
 */
 export type Partial2<T> = {
    [K in keyof T]?: T[K]
}

/**
 * 将制定的key变成可选类型, 除了K外其他key保持不变
 */
export type PartialOptional<T, K extends keyof T> = Omit<T, K> & {
    [P in K] ?: T[P]
}

/**
 * 对每个key增加一个readonly修饰符
 */
export type Readonly2<T> = {
    readonly [K in keyof T]: T[K]
}

/**
 * 从T中选择 key是K的类型
 */
export type Pick2<T, K extends keyof T> = {
    [P in K]: T[P]
}

/**
 * key为联合类型中的每个子类型，类型为T
 */
export type Record2<K extends keyof any, T> = {
    [P in K]: T
}

/**
 * 提取存在于T，但不存在于U的类型组成的联合类型
 */
export type Exclude2<T, U> = T extends U ? never : T

/**
 * 提取联合类型T和联合类型U的所有交集
 */
export type Extract2<T, U> = T extends U ? T : never

/**
 * 从类型T中剔除K中的所有属性
 */
export type Omit2<T, K extends keyof any> = {
    [P in Exclude2<keyof T, K>]: T[P]
}

/**
 * 函数参数类型
 */
export type Parameters2<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never

/**
 * 函数返回值
 */
export type ReturnType2<T extends Function> = T extends (...args: any) => infer P ? P : never

/**
 * 推导数组所有元素的类型
 */
export type FalttenArray<T extends Array<any>> = T extends Array<infer P> ? P : never

/**
 * 获取类的构造函数的参数类型
 * T 要约束为抽象类，因为如果将类型定义为抽象类（抽象构造函数），则既可以赋值为抽象类，也可以赋值为普通类；而反之则不行。
 * 
 */
export type ConstructorParameters2<T extends abstract new (...args: any) => any> = T extends abstract new (...args: infer P) => any ? P : never;

/**
 * 获取构造函数返回值的类型
 */
export type InstanceType2<T extends abstract new (...args: any) => any> = T extends abstract new (...args: any) => infer P ? P : never

/**
 * 获取没有同时存在于T和U内的类型
 * 分发特性
 * Exclude<T | U, T & U> = Exclude<T, T & U> | Exclude<U, T & U>
 */
export type SymmetricDifference<T, U> = Exclude2<T | U, T & U>

/**
 * 检测T是否为undefined或null  
 * 只判断了T extends undefined，其实也是因为两者可以互相兼容的。所以你换成T extends null或者T extends null | undefined都是可以的。
 * never, null和undefined可以赋值给其他类型
 */
export type NonUndefined<T> = T extends undefined ? never : T


/**
 * 获取T中所有类型为函数的key组成的联合类型
 * T['a' | 'b']若[]内参数是联合类型，则也是分发索引的特性，依次取到值的类型进行联合
 * T[keyof T]则是获取T所有值的类型类型
 */
export type FunctionKeys<T extends object> = {
    [K in keyof T]: NonUndefined<T[K]> extends never ? never : NonUndefined<T[K]> extends Function ? K : never
}[keyof T]


/**
 * 基本数据类型
 */
export type Primitive = | string | number | boolean | symbol | bigint | null | undefined

/**
 * 查找T所有非只读类型的key组成的联合类型
 */
export type MutableKeys<T extends object> = {
    [P in keyof T]-?: IfEquals<{[Q in P]: T[P]}, {-readonly[Q in P]: T[P]}, P, never>
}[keyof T]

/**
 * 判断 X Y是否相等，如果相等 则返回 A 否则 B
 */
export type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? A : B

/**
 * 提取T中所有可选类型的key组成的联合类型
 */
export type OptionalKeys<T> = {
    [P in keyof T]: {} extends Pick2<T, P> ? P : never
  }[keyof T]

/**
 * 判断 T中K是否是可选类型
 */
export type IsOptional<T, K extends keyof T> = {} extends Pick2<T, K> ? true : false


/**
 * 增强Pick， 从T中提取指定值类型
 */
export type PickByValue<T, V> = Pick2<T, {
    [K in keyof T]: T[K] extends V ? K : never
}[keyof T]>

/**
 * 从T中提取存在于U中的key和对应的类型(注意，最终是从T中提取key和类型）
 */
export type Intersection<T extends object, U extends object> = Pick2<T, Extract2<keyof T, keyof U> & Extract2<keyof U, keyof T>>
