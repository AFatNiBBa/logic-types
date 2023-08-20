
import { Not, Ternary } from "./gates";
import { Check } from "./predicates";
import { Equals } from "./util";

/**
 * Returns the values of each property of {@link T}
 * @template T The type from which to get the properties
 */
export type Values<T> = T[keyof T];

/**
 * Tells if the {@link K} property is `readonly` inside of {@link T}
 * @template T The object containing the property
 * @template K The key of the property
 */
export type IsReadOnly<T, K extends keyof T> = Not<Equals<Pick<T, K>, { -readonly [_ in K]: T[K] }>>;

/**
 * Tells if the {@link K} property is `readonly` inside of {@link T}
 * @template T The object containing the property
 * @template K The key of the property
 */
export type IsOptional<T, K extends keyof T> = Not<Equals<Pick<T, K>, { [_ in K]-?: T[K] }>>;

/**
 * Filters an object's properties based on a predicate
 * See {@link Check} for details on how to use {@link P}
 * @template T The object to which to filter the properties
 * @template P A function that takes the value of the property, its key and {@link T}, and tells whether or not the property should be present on the result
 */
export type FilterObject<T, P extends (v: any, k: any, t: any) => boolean> = { [k in keyof T as Ternary<Check<P, [ T[k], k, T ]>, k>]: T[k] };