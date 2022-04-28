import {expectAssignable, expectType, expectError} from 'tsd';
import type {
    Partial2, PartialOptional, Readonly2, Pick2, Record2, Exclude2, Extract2, Omit2, Parameters2, ReturnType2, FalttenArray, 
    ConstructorParameters2, InstanceType2, SymmetricDifference, NonUndefined, FunctionKeys,
    IfEquals, MutableKeys, OptionalKeys, IsOptional, PickByValue, Intersection
} from '../index.d'

type Eg = {
    name: string,
    age: number
}

declare const partialEg: Partial2<Eg>
expectType<{
    name?: string,
    age?: number
}>(partialEg)


declare const partialOptionalEg: PartialOptional<Eg, 'age'>
expectAssignable<{
    name: string,
    age?: number,
}>(partialOptionalEg)


type ReadonlyEg = Readonly2<Eg>
declare const readonlyEg: ReadonlyEg


expectError(readonlyEg.age = 2)
expectType<{
    readonly name: string,
    readonly age: number
}>(readonlyEg)


type Pick2Eg = Pick2<Eg, 'age'>
declare const pick2Eg: Pick2Eg
expectType<{
    age: number
}>(pick2Eg)


type Record2Eg = Record2<'a' | 1, Eg>
declare const record2Eg: Record2Eg
expectType<{
    'a': Eg,
    1: Eg
}>(record2Eg)


type Exclude2Eg = Exclude2<'a' | 'b', 'a'>
declare const exclude2Eg: Exclude2Eg
expectType<'b'>(exclude2Eg)


type Extract2Eg = Extract2<'a' | 'b', 'a'>
declare const extract2Eg: Extract2Eg
expectType<'a'>(extract2Eg)


type Omit2Eg = Omit2<Eg, 'age'>
declare const omit2Eg: Omit2Eg
expectType<{
    name: string
}>(omit2Eg)


type Parameters2Eg = (a: string, b: number) => void
declare const parameters2Eg: Parameters2<Parameters2Eg>
expectType<[string, number]>(parameters2Eg)


type Fn = {
    (a: number): number,
    (a: string): string
}
declare const returnType2: ReturnType2<Fn>
expectAssignable<number | string>(returnType2)


declare const falttenArray: FalttenArray<[number, string]>
expectAssignable<number | string>(falttenArray)


class People {
    age: number
    sex?: number
    name: string
    constructor(name: string, sex?: number) {
        this.name = name
        this.age = 1
        this.sex = sex
    }
}
declare const constructorParameters2: ConstructorParameters2<typeof People>
expectType<[name: string, sex?: number]>(constructorParameters2)


declare const instanceType2: InstanceType2<typeof People>
expectType<{
    name: string,
    age: number,
    sex?: number
}>(instanceType2)


declare const symmetricDifference: SymmetricDifference<{
    a: string,
    b: number
}, {
    a: string,
    c: number
}>
expectAssignable<{
    a: string
}>(symmetricDifference)


declare const nonUndefined: NonUndefined<undefined>
expectType<never>(nonUndefined)


declare const functionKeysEg: FunctionKeys<{
    a: () => void,
    b: string,
    c: number,
    d: Function,
    e(): string,
    f: null,
    g: undefined
}>
expectAssignable<'a'|'d'|'e'>(functionKeysEg)


type T1 = {key1: string};
type T2 = {readonly key1: string};
type T3 = {key1?: string};

type IfEquals1 = IfEquals<T1, T2, true, false>
type IfEquals2 = IfEquals<T1, T3, true, false>

declare const ifEquals1: IfEquals1
declare const ifEquals2: IfEquals2

expectType<false>(ifEquals1)
expectType<false>(ifEquals2)


type MutableKeysEg = {
    key1: string,
    key2: number,
    readonly key3: string,
    readonly key4: number
}

declare const mutableKeysEg: MutableKeys<MutableKeysEg>
expectType<'key1' | 'key2'>(mutableKeysEg)


declare const optionalKeysEg: OptionalKeys<{key1?: string, key2: number}>
expectType<'key1'>(optionalKeysEg!)


declare const isOptional1: IsOptional<{
    a: string,
    b?: number,
    c?: number
}, 'a'|'b'|'c'>
expectType<false>(isOptional1)

declare const isOptional2: IsOptional<{
    a: string,
    b?: number,
    c?: number
}, 'b'|'c'>
expectType<true>(isOptional2)

declare const pickByValue: PickByValue<{
    key1: number, key2: number|undefined, key3: number}, number>
expectType<{
    key1: number,
    key3: number
}>(pickByValue)

declare const intersection: Intersection<{
    a: string,
    b: number
}, {
    a: number
}>

expectType<{
    a: string
}>(intersection)