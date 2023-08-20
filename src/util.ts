
import { Ternary } from "./gates";

/**
 * Tells if {@link T} is `any`
 * @template T The type to check
 */
export type IsAny<T> = Extends<0, 1 & T>;

/**
 * Tells if {@link T} is `never`
 * @template T The type to check
 */
export type IsNever<T> = Extends<[T], [never]>;

/**
 * If {@link A} is `never` then {@link B} gets returned, otherwise {@link A} gets
 * @template A The type that could be `never`
 * @template B The backup type
 */
export type Else<A, B> = Ternary<IsNever<A>, B, A>;

/**
 * Like the `extends` keyword, but the result if boolean
 * @template A The derived type
 * @template B The eventual base type
 */
export type Extends<A, B> = A extends B ? true : false;

/**
 * Tells if two types are strictly equals with some TypeScript tricks
 * @template A The first type to check
 * @template B The second type to check
 */
export type Equals<A, B> = Extends<(<T>() => Extends<T, A>), (<T>() => T extends B ? true : false)>; // The second cannot be an `Extends` for some reason