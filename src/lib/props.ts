
import { Not, Ternary } from "./gates";
import { Check } from "./predicates";
import { Equals } from "./util";

/**
 * Returns the values of each property of {@link T}
 * @template T The type from which to get the properties
 */
export type Values<T> = T[keyof T];

/**
 * Exactly like {@link Omit}, but forces {@link K} to be a key of {@link T}
 * @template T The type from which to omit a property
 * @template K The key of the property
 */
export type Without<T, K extends keyof T> = Omit<T, K>;

/**
 * Overrides the types of the properties of {@link A} with the one present in {@link B}
 * @template A The type to override
 * @template B Type that represents the override
 */
export type Override<A, B extends { [k in keyof A]?: unknown }> = Omit<A, keyof B> & B;

/**
 * Executes {@link Required} on a specific property of {@link T}
 * @template T The object containing the property
 * @template K The key of the property
 */
export type Require<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

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