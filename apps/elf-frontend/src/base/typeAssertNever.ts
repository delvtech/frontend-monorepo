/**
 * Performs a type check to make sure that a code path is unreachacle.  This is useful for example
 * in exhaustive type checking in switch statements:
 *
 * enum Foo {
 *   Bar = 'Bar',
 *   Baz = 'Baz',
 * }
 *
 * const foo = Foo.Bar;
 * switch (foo) {
 *   case Foo.Bar:
 *     // some logic here
 *     break;
 *   default:
 *     typeAssertNever(foo); // throws an error because case Foo.Baz is not covered!
 * }
 *
 * This function differs from assertNever in that it won't actually throw an error if the code is reached.
 * @param checkNever variable that should be equal to never by the time this function is reached.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function typeAassertNever(checkNever: never): void {}
