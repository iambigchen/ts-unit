// 1. extends

type A1 = 'x' extends 'x' ? 1 : 2 // 1
type A2 = 'x' | 'y' extends 'x' ? 1 : 2 // 2
type E<T> = T extends 'x' ? 1 : 2
type A3 = E<'x' | 'y'> // 1 | 2

// A extends B 可以理解为 A是否可以分配给B。 A 是否是 B的子类型、 A 是否可以赋值给 B
// 如果 A 是泛型 并且 传入的泛型是联合类型，则会依次判断该联合类型的所有子类型是否可分配给extends后面的类型（是一个分发的过程）

// 阻止分发特性
type E2<T> = [T] extends ['x'] ? 1 : 2
type A4 = E2<'x' | 'y'> // 2

// 2. type A2 = 2 的原因
// 'x' | 'y' 比 'x'宽泛， 'x' 比 'x' | 'y'更具体，所以 'x' | 'y' 为父类型， 'x' 是子类型
// 子类型可以赋值给父类型，父类型不可以赋值给子类型

// 3. 子类型更佳具体，可以赋值给更佳宽泛的父类型

interface Animal {
    name: string
}

interface Dog extends Animal {
    break(): void
}

let animal: Animal
let dog: Dog

animal = dog // 子类型 可以赋值给 父类型
// dog = animal 会报错 父类型不可以赋值给子类型

type A = 1 | 2 | 3;
type B = 2 | 3;
let a: A;
let b: B;

// b = a; // 不可赋值

a = b; // 可以赋值 B更具体，是子类型， A更宽泛， 是父类型

// 4. 协变 具有父子关系的多个类型，在通过某种构造关系构造成的新的类型，如果还具有父子关系则是协变的

interface Animal {
    name: string
}

interface Dog extends Animal {
    break(): void
}

let Eg3: Array<Animal>
let Eg4: Array<Dog>

Eg3 = Eg4 // Eg4 还是 Eg3的子类型，所以是协变

// 5. 逆变 具有父子关系的多个类型，在通过某种构造关系构造成的新的类型，关系逆转了则是逆变

interface Animal {
    name: string
}

interface Dog extends Animal {
    break(): void
}

type AnimalFn = (arg: Animal) => void
type DogFn = (arg: Dog) => void

let animal2: AnimalFn = (arg: Animal) => {}
let dog2: DogFn = (arg: Dog) => {
    arg.break();
}

// animal2 = dog2 不可以赋值，因为 animal2({name: 'cat'})会报错

// 允许一个函数类型中，返回值类型是协变的，而参数类型是逆变的。

// 6. infer 
// 推导的名称相同并且都处于逆变的位置，则推导的结果将会是交叉类型。 
// 推导的名称相同并且都处于协变的位置，则推导的结果将会是联合类型。

type Bar<T> = T extends {
    a: (x: infer U) => void,
    b: (x: infer U) => void
} ? U : never

type T1 = Bar<{
    a: (x: string) => void,
    b: (x: string) => void
}> // string

type T2 = Bar<{
    a: (x: string) => void,
    b: (x: number) => void
}> // never

type Foo<T> = T extends {
    a: infer U,
    b: infer U
} ? U : never 

type F1 = Foo<{
    a: string,
    b: number
}> // string | number

// 7. 直接使用类作为类型，和使用typeof 类作为类型，有什么区别

// 当把类直接作为类型时，该类型约束的是该类型必须是类的实例； 即该类型获取的是该类上的实例属性和实例方法（也叫原型方法）；
// 当把typeof 类作为类型时，约束的满足该类的类型；即该类型获取的是该类上的静态属性和方法。
class People {
    name: number;
    age: number;
    constructor() {}
}

const p1: People = new People();
// p1可以正常赋值

//   const p2: People = People; // 等号后面的People报错，类型“typeof People”缺少类型“People”中的以下属性: name, age

// const p3: typeof People = new People(); // p3报错，类型 "People" 中缺少属性 "prototype"，但类型 "typeof People" 中需要该属性

const p4: typeof People = People;
// p4可以正常赋值

// 8. null和undefined可以赋值给其他类型 , 两者可以互相兼容的
type A11 = undefined extends null ? 1 : 2; // 1

type B11 = null extends undefined ? 1 : 2; // 1

type C11 = never extends undefined ? 1 : 2
