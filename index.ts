import type {PromiseValue, SetReturnType, IsNever} from './index.d';

// function asyncFn (a: number): Promise<number>{
//     return new Promise((resolve) => {
//         resolve(a)
//     })
// }

// asyncFn(1).then(e => {

// })

// type A = ReturnType<typeof asyncFn>

// type TP = PromiseValue<A>

// var a: TP = 1

function t(this: Date, a: number): string {
    return a + '1'
}

type SetReturnTypeTest = SetReturnType<typeof t, number>

let t2: SetReturnTypeTest = function (this: Date, a: number): number {
    return a
}

let a: never

type A = IsNever<typeof a>