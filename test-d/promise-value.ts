import {expectAssignable, expectType} from 'tsd';
import type {PromiseValue} from '../index.d';

type NumberPromise = Promise<number>;
type NestedPromise = Promise<NumberPromise>;

expectAssignable<PromiseValue<NumberPromise>>(2);

expectAssignable<PromiseValue<NestedPromise>>(2)

expectAssignable<PromiseValue<number>>(2);