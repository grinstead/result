export type Success<T> = {
  done: true;
  value: T;
  failure: undefined;
};

export type Failure<E extends {}> = {
  done: true;
  value: never;
  failure: E;
};

export type Result<T, E extends {}> = Success<T> | Failure<E>;

export function success<T>(value: T): Success<T> {
  return { done: true, value, failure: undefined };
}

export function failure<E extends {}>(error: E): Failure<E> {
  return {
    done: true,
    // @ts-expect-error
    get value() {
      throw error;
    },
    failure: error,
  };
}
