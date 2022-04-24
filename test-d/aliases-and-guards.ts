import type { Primitive, Falsy, SetIntersection, SetDifference, SetComplement, SymmetricDifference } from '../source/aliases-and-guards'
import {expectType, expectAssignable, expectNotAssignable} from 'tsd';


expectAssignable<Primitive>(1)
expectNotAssignable<Primitive>([])

expectAssignable<Falsy>('')
expectAssignable<Falsy>(0)
expectNotAssignable<Falsy>(1)

type Value = SetIntersection<'1' | '2' | '3', '2' | '3' | '4'>
expectAssignable<Value>('2')

type Value2 = SetIntersection<string | number | (() => void), Function>;
expectAssignable<Value2>(() => {})

type Value3 = SetDifference<'1' | '2' | '3', '2' | '3' | '4'>
expectAssignable<Value3>('1')

type Value4 = SetComplement<'1' | '2' | '3', '2' | '3'>
expectAssignable<Value4>('1')

type Value5 = SymmetricDifference<'1' | '2' | '3', '2' | '3' | '4'>
expectAssignable<Value5>('1')
