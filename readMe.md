
# logic-types

Collection of useful "functional" types that have 0 runtime cost.
You can import all the types
```ts
import { /* ... */ } from "logic-types";
```
Or just a specific section
```ts
import { /* ... */ } from "logic-types/gates"; // "gates" is a section
```

Here are some examples on things you can do with this package
```ts
import { FilterObject, Lambda, Not, Extends } from "logic-types";

type Test = { a: 1, readonly ab: 2, c: 3 };

// Not readonly keys
type a = FilterObject<Test, Lambda.Not<Lambda.IsReadOnly>>;
//   ^? type a = { a: 1, c: 3 }

// Keys that do NOT start with "a"
type b = FilterObject<Test, <K>(v: any, k: K) => Not<Extends<K, `a${string}`>>>;
//   ^? type b = { c: 3 }
```

## Exported types
Here's a list of the exported types divided by section.
These descriptions are summaries, check the doc comment on the actual type for the full explaination

### gates
Contains mostly boolean logic utilities
- **Nullish**: Represents a value `A` so that `A ?? B` is equal to `B`
- **Falsish**: Represents a value `A` so that `A || B` is equal to `B`
- **Ternary**: Like the normal ternary type operator but checks if the first argument is NOT `Falsish`
- **Not**: Logical `NOT` gate (With JavaScript like checks)
- **And**: Logical `AND` gate (With JavaScript like checks)
- **Or**: Logical `OR` gate (With JavaScript like checks)
- **Xor**: Logical `XOR` gate, but with some twists: Check the doc comment for details
- **Coalesce**: Like the `??` operator, but for types

### math
Contains the type version of some positive integer math functions
- **IsPositive**: Tells whether a number is positive or not
- **IsWhole**: Tells whether a number is whole or not
- **IsValid**: Tells whether a number is supported by these types
- **AreValid**: Guard clause for an operation on positive integers
- **Add**: Sums two numbers
- **Sub**: Subtracts two numbers
- **Mul**: Multiplies two numbers
- **Div**: Divides two numbers
- **Mod**: Gets the reminder of the division between two numbers
- **More**: Gets if the first number is greater than the second
- **MoreOrEqual**: Gets if the first number is greater than or equal to the second
- **Less**: Gets if the first number is less than the second
- **LessOrEqual**: Gets if the first number is less than or equal to the second

### predicates
Contains utilities for working with types of predicate callbacks
- **Check**: Returns whether a function type would have returned `true` if provided with certain arguments
- **Lambda**: Utility types to create predicates types in an easy way:
    - **IsReadOnly**: A property filter that leaves the ones that are `readonly`
    - **IsOptional**: A property filter that leaves the ones that are optional
    - **Is**: A property filter that leaves the ones that have the input type as value
    - **Not**: Negates the input predicate

### props
Contains utilities for working with properties of objects
- **Values**: Returns an union of the values from each property of the input type
- **Override**: Overrides the type of the properties of a type with the ones of another
- **Require**: Partial `Required`
- **IsReadOnly**: Tells whether a key represents a `readonly` property inside of an object
- **IsOptional**: Tells whether a key represents an optional property inside of an object
- **FilterObject**: Allows you to filter the properties of an object based on each the key and/or the value of each property by using a predicate

### tuple
Contains a set of types for working with types of lists
- **Length**: Returns the length of an array in a specific way that helps TypeScript to not implode
- **Head**: Returns the first element of an array
- **Tail**: Returns the last element of an array
- **Alloc**: Creates a new array of a certain input length
- **Flat**: Flattens an array of array
- **FilterArray**: Allows you to filter the elements of an array by using a predicate

### util
Contains miscellaneous types
- **IsAny**: Tells whether a type is `any`
- **IsNever**: Tells whether a type is `never`
- **Else**: If the first argument is NOT `never` it gets returned, otherwise the second gets
- **Extends**: Like the `extends` opertator, but returns a boolean directly
- **Equals**: Checks if two types are strictly equals; Is needed for checks like `IsReadOnly` and `IsOptional` since they "abuse" some of TypeScript internal checks