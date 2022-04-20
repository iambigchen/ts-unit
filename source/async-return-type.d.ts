
import type {PromiseValue} from './promise-value';

type AsyncFunction = (...args: any[]) => Promise<any>

export type AsyncReturnType<T extends AsyncFunction> = PromiseValue<ReturnType<T>>