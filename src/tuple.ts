
import { Check } from "./predicates";
import { Ternary } from "./gates";

/**
 * Returns the first element of a tuple
 * @template T The tuple from which to return the first element
 */
export type Head<T extends readonly unknown[]> = T extends [ infer U, ...infer _ ] ? U : never;

/**
 * Returns the last element of a tuple
 * @template T The tuple from which to return the last element
 */
export type Tail<T extends readonly unknown[]> = T extends [ infer U ] ? U : T extends [ infer _, ...infer U ] ? Tail<U> : never;

/**
 * Creates a tuple of {@link T} with length {@link N} and starts with the elements from {@link Prev}
 * @template N The number of desired elements
 * @template T The type of each new added element
 * @template Prev The tuple on which elements will be added until the length becomes {@link N}
 */
export type Alloc<N extends number, T = unknown, Prev extends unknown[] = []> = Prev extends { length: N } ? Prev : Alloc<N, T, [ ...Prev, T ]>;

/**
 * Filters an array's elements based on a predicate.
 * See {@link Check} for details on how to use {@link P}
 * @template T The array to which to filter the elements
 * @template P A function that takes an element whether or not it should be present on the result
 */
export type FilterArray<T extends readonly unknown[], P extends (v: any) => boolean> = 
    T extends readonly [] 
        ? [] 
        : T extends readonly [ infer U, ...infer Rest ] 
            ? [ ...Ternary<Check<P, [ U ]>, [ U ], []>, ...FilterArray<Rest, P> ] 
            : never;