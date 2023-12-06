
/** Represents `null` or `undefined` */
export type Nullish = null | void | undefined;

/**
 * Represents a type that would go on the `else` branch of an `if`.
 * It doesn't contain {@link NaN} because I don't know how to represent it in TypeScript
 */
export type Falsish = 0 | "" | false | Nullish;

/**
 * Like the ternary type operator in javascript, but checks the conditional part for thruthiness.
 * If you pass only the first parameter you can use the type with `&` on another type to turn it to `never` if {@link Cond} was {@link Falsish}:
 * ```ts
 * type a = Ternary<true> & 1;
 * //   ^? type a = 1
 * 
 * type b = Ternary<false> & 1;
 * //   ^? type b = never
 * ```
 * @template Cond The condition
 * @template If The type to return if {@link Cond} is NOT {@link Falsish}
 * @template Else The type to return if {@link Cond} is {@link Falsish}
 */
export type Ternary<Cond, If = unknown, Else = never> = Cond extends Falsish ? Else : If;

/**
 * If the type is {@link Falsish} it returns `true`, otherwise `false`
 * @template T The type to check
 */
export type Not<T> = Ternary<T, false, true>;

/**
 * Logical `AND` gate for types.
 * Like in normal JavaScript, if {@link A} is {@link Falsish} it gets returned, otherwise {@link B} gets
 * @template A The first type to check
 * @template B The second type to check
 */
export type And<A, B> = Ternary<A, B, A>;

/**
 * Logical `OR` gate for types.
 * Like in normal JavaScript, if {@link A} is {@link Falsish} it returns {@link B}, {@link A} is returned otherwise
 * @template A The first type to check
 * @template B The second type to check
 */
export type Or<A, B> = Ternary<A, A, B>;

/**
 * Logical `XOR` gate for types.
 * It returns `false` if both types are NOT {@link Falsish}.
 * If one and only one of of the types is {@link Falsish}, then the other is returned.
 * As a side effect if both types are {@link Falsish} then {@link B} is returned
 * @template A The first type to check
 * @template B The second type to check
 */
export type Xor<A, B> = Ternary<A, Ternary<B, false, A>, B>;

/**
 * If {@link A} extends {@link Nullish} then {@link B} gets returned, otherwise {@link A} gets
 * @template A The type that could be {@link Nullish}
 * @template B The backup type
 */
export type Coalesce<A, B> = A extends Nullish ? B : A;