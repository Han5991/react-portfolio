export declare global {
  type Recursive<T> = {[P in keyof T]: Recursive<T[P]>};

  type Values<T> = T[keyof T];

  type RemoveOptional<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

  type Brand<K, T> = K & {__brand: T};

  type Nullable<T> = T | null;

  type FlattenObjectKeys<
    T extends Record<string, unknown>,
    Key = keyof T,
  > = Key extends string
    ? T[Key] extends Record<string, unknown>
      ? `${Key}.${FlattenObjectKeys<T[Key]>}`
      : `${Key}`
    : never;

  type ArrayElementType<T extends ReadonlyArray<unknown>> =
    T extends ReadonlyArray<infer ElementType> ? ElementType : never;
}
