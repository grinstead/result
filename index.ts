export interface Success<T> {
  done: true;
  value: T;
  failure: undefined;
};

export interface Failure<E> {
  done: true;
  value: never;
  failure: E;
}

export type Result<T, E> = Success<T> | Failure<E>;

export function success<T>(value: T): Success<T> {
  return { done: true, value, failure: undefined };
}

class FailureResult<E> implements Failure<E> {
  readonly done = true;

  constructor(readonly failure) {}

  get value() {
    throw this.failure;
  }
}

export function failure<E extends {}>(error: E): Failure<E> {
  return new FailureResult(error);
}
