import {expectType, expectError} from 'tsd';
import type {SetReturnType} from '../index.d';

declare const anything: unknown;

declare const variation1: SetReturnType<() => void, number>;
expectType<() => number>(variation1);
variation1.call(anything);

declare const variation2: SetReturnType<(foo: string, bar: boolean) => number, void>;
expectType<(foo: string, bar: boolean) => void>(variation2);
variation2.call(anything, 'foo', true);

function fn1(this: Date): void {} // eslint-disable-line @typescript-eslint/no-empty-function
declare const variation3: SetReturnType<typeof fn1, string[]>;
expectType<(this: Date) => string[]>(variation3);
variation3.call(new Date());
expectError(variation3.call('not-a-date'));

declare function withExplicitThis(this: unknown, foo: string): number;
declare function withImplicitThis(foo: string): number;
expectType<typeof withExplicitThis>(withImplicitThis);
expectType<typeof withImplicitThis>(withExplicitThis);