declare namespace _ {
  // Lodash only goes to 5 arguments, make a definition for 6.
  interface LoDashStatic {
    /**
     * Creates an array of grouped elements, the first of which contains the first elements of the given arrays,
     * the second of which contains the second elements of the given arrays, and so on.
     *
     * @param arrays The arrays to process.
     * @return Returns the new array of grouped elements.
     */
    /**
     * @see _.zip
     */
    zip<T1, T2, T3, T4, T5, T6>(
      arrays1: List<T1 | undefined>,
      arrays2: List<T2 | undefined>,
      arrays3: List<T3 | undefined>,
      arrays4: List<T4 | undefined>,
      arrays5: List<T5 | undefined>,
      arrays6: List<T6 | undefined>,
    ): Array<
      [
        T1 | undefined,
        T2 | undefined,
        T3 | undefined,
        T4 | undefined,
        T5 | undefined,
        T6 | undefined,
      ]
    >;
  }
}
