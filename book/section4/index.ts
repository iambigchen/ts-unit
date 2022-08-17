// 数组长度做计数

// TypeScript 类型系统中没有加减乘除运算符，但是可以通过构造不同的数组然后取 length 的方式来完成数值计算，把数值的加减乘除转化为对数组的提取和构造。

// 加法
type Add<Num1 extends number, Num2 extends number> = [...BuildArray<Num1>, ...BuildArray<Num2>]['length']
type AddRes = Add<1, 2>

// 减法
type Subtract<Num1 extends number, Num2 extends number> = BuildArray<Num1> extends [...BuildArray<Num2>, ...infer Arr] ? Arr['length'] : never
type SubtractRes = Subtract<3,1>

// 乘法
type Multiply<Num1 extends number, Num2 extends number, Arr extends unknown[] = []> = Num2 extends 0 ?
    Arr['length'] : Multiply<Num1, Subtract<Num2, 1>, [...Arr, ...BuildArray<Num1>]>
type MultiplyRes = Multiply<2, 3>

// 除法
type Divide<Num1 extends number, Num2 extends number, Arr extends unknown[] = []> = Num1 extends 0 ?
    Arr['length'] : Divide<Subtract<Num1, Num2>, Num2, [...Arr, unknown]>
type DivideRes = Divide<6, 2>

// 计数
type StrLen<Str extends string, Arr extends unknown[] = []> = Str extends `${infer A}${infer Other}` ?  StrLen<Other, [...Arr, unknown]> : Arr['length']
type StrLenRes = StrLen<'abcde'>

// 两个数比较
type GreaterThan<Num1 extends number, Num2 extends number, Arr extends unknown[] = []> = Arr['length'] extends Num1 ? false
    : Arr['length'] extends Num2 ? true
        : GreaterThan<Num1, Num2, [...Arr, unknown]>
type GreaterThanRes = GreaterThan<2,1>
type GreaterThanRes2 = GreaterThan<2,6>

// 斐波拉契
type Fibonacci<Num extends number> = FibonacciLoop<[1], [], [], Num>
type FibonacciLoop<
    PrevArr extends unknown[], 
    CurrentArr extends unknown[], 
    IndexArr extends unknown[] = [], 
    Num extends number = 1
> = IndexArr['length'] extends Num ? CurrentArr['length'] :
    FibonacciLoop<CurrentArr, [...PrevArr, ...CurrentArr], [...IndexArr, unknown], Num>

type FibonacciRes = Fibonacci<8>
