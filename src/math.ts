
import { Alloc } from "./tuple";

/**
 * Sums-up two numbers
 * @template A The first number to sum
 * @template B The second number to sum
 */
export type Sum<A extends number, B extends number = 1> = [ ...Alloc<A>, ...Alloc<B> ]["length"];