
import { IsReadOnly as E_IsReadOnly, IsOptional as E_IsOptional } from "./props";
import { Not as E_Not } from "./gates";
import { Extends } from "./util";

/**
 * Calls the predicate {@link P} with the {@link Args} arguments and checks if it returns `true`.
 * Usage:
 * ```ts
 * type EndsWithA<T> = Check<(x: `${string}a`) => true, [ T ]>;
 * type DoesnTEndWithA<T> = Check<<U>(x: U) => U extends `${string}a` ? false : true, [ T ]>
 * 
 * type a = EndsWithA<"ba">;
 * //   ^? type a = true
 * 
 * type b = EndsWithA<"bab">;
 * //   ^? type b = false
 * 
 * type c = DoesnTEndWithA<"ba">;
 * //   ^? type c = false
 * 
 * type d = DoesnTEndWithA<"bab">;
 * //   ^? type d = true
 * ```
 * @template P The predicate function type
 * @template Args The arguments to check
 */
export type Check<P extends (...args: any[]) => boolean, Args extends readonly unknown[]> = Extends<P, (...args: Args) => true>;

/** Utility predicates */
export namespace Lambda {

    /** Creates a predicate to filter for `readonly` properties */
    export type IsReadOnly = <T, K extends keyof T>(_: any, k: K, t: T) => E_IsReadOnly<T, K>;

    /** Creates a predicate to filter for optional properties */
    export type IsOptional = <T, K extends keyof T>(_: any, k: K, t: T) => E_IsOptional<T, K>;

    /**
     * Creates a predicate to filter for a specific value
     * @template T The value to search for
     */
    export type Is<T> = (x: T) => true;

    /**
     * Creates a predicate the negates another, so that if {@link F} would have had returned `true`, then `false` will be returned and vice-versa.
     * It doesn't always work when chaining multiple things.
     * Check back if things improved after https://github.com/microsoft/TypeScript/issues/55435 gets eventually fixed
     * @template F The predicate to negate
     */
    export type Not<F extends (v: any, k: any, t: any) => boolean> = 
        F extends IsReadOnly
            ? <T, K extends keyof T>(_: any, k: K, t: T) => E_Not<E_IsReadOnly<T, K>>
            : F extends IsOptional
                ? <T, K extends keyof T>(_: any, k: K, t: T) => E_Not<E_IsOptional<T, K>>
                : <V, K, T>(v: V, k: K, t: T) => E_Not<Check<F, [ V, K, T ]>>; // ← This should be the only thing here, everything else is a fix
}