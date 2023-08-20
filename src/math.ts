
import { Alloc, Flat, Length } from "./tuple";
import { Equals, Extends } from "./util";
import { And, Not, Or } from "./gates";

/**
 * Tells whether a number is positive or not
 * @template T The number to check
 */
export type IsPositive<T extends number> = Not<Extends<`${T}`, `-${number}`>>;

/**
 * Tells whether a number is whole or not
 * @template T The number to check
 */
export type IsWhole<T extends number> = Not<Extends<`${T}`, `${number}.${number}`>>;

/**
 * Tells whether a number is supported by these types
 * @template T The number to check
 */
export type IsValid<T extends number> = And<IsPositive<T>, IsWhole<T>>;

/**
 * Guard clause for an operation on positive integers
 * @template A The first number to check
 * @template B The second number to check
 */
export type AreValid<A extends number, B extends number> = And<IsValid<A>, IsValid<B>>;

/**
 * Sums two numbers.
 * If only {@link A} is provided then it will be incremented of 1
 * @template A The first number
 * @template B The second number
 */
export type Add<A extends number, B extends number = 1> = AreValid<A, B> extends true ? Length<[ ...Alloc<A>, ...Alloc<B> ]> : never;

/**
 * Subtracts two numbers.
 * If only {@link A} is provided then it will be decremented of 1
 * @template A The first number
 * @template B The second number
 */
export type Sub<A extends number, B extends number = 1> = AreValid<A, B> extends true ? Alloc<A> extends [ ...infer U, ...Alloc<B> ] ? Length<U> : never : never;

/**
 * Multiplies two numbers
 * @template A The first number
 * @template B The second number
 */
export type Mul<A extends number, B extends number> = AreValid<A, B> extends true ? Length<Flat<Alloc<A, Alloc<B>>>> : never;

/**
 * Divides two numbers
 * @template A The first number
 * @template B The second number
 * @template R Internal parameter for accumulating the result, if I do otherwise then typescript implodes
 */
export type Div<A extends number, B extends number, R extends number = 0> = AreValid<A, B> extends true ? Less<A, B> extends true ? R : Div<Sub<A, B>, B, Add<R>> : never;

/**
 * Gets the reminder of the division between two numbers
 * @template A The first number
 * @template B The second number
 */
export type Mod<A extends number, B extends number> = AreValid<A, B> extends true ? Less<A, B> extends true ? A : Mod<Sub<A, B>, B> : never;

/**
 * Gets if the first number is greater than the second
 * @template A The first number
 * @template B The second number
 */
export type More<A extends number, B extends number> = AreValid<A, B> extends true ? Alloc<A> extends [ unknown, ...unknown[], ...Alloc<B> ] ? true : false : never;

/**
 * Gets if the first number is greater than or equal to the second
 * @template A The first number
 * @template B The second number
 */
export type MoreOrEqual<A extends number, B extends number> = AreValid<A, B> extends true ? Or<Equals<A, B>, More<A, B>> : never;

/**
 * Gets if the first number is less than the second
 * @template A The first number
 * @template B The second number
 */
export type Less<A extends number, B extends number> = AreValid<A, B> extends true ? Not<MoreOrEqual<A, B>> : never;

/**
 * Gets if the first number is less than or equal to the second
 * @template A The first number
 * @template B The second number
 */
export type LessOrEqual<A extends number, B extends number> = AreValid<A, B> extends true ? Not<More<A, B>> : never;