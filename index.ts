/**
 * Represents a successful result.
 * 
 * @template T The type of the successful value.
 */
export interface Success<T> {
  /** Indicates the operation is completed successfully. Always `true`. */
  done: true;
  /** The successful result value. */
  value: T;
  /** Always `undefined` for successful results. */
  failure: undefined;
}

/**
 * Represents a failure result.
 * 
 * @template E The type of the error object.
 */
export interface Failure<E> {
  /** Indicates the operation is completed, but with a failure. Always `true`. */
  done: true;
  /** Attempting to access this property will throw the error. */
  value: never;
  /** The failure object containing error details. */
  failure: E;
}

/**
 * Represents the result of an operation that can either succeed or fail.
 * 
 * @template T The type of the successful value.
 * @template E The type of the error object.
 */
export type Result<T, E> = Success<T> | Failure<E>;

/**
 * Creates a successful result.
 * 
 * @template T The type of the successful value.
 * @param value The value to be wrapped in a success result.
 * @returns A `Success<T>` object.
 */
export function success<T>(value: T): Success<T> {
  return { done: true, value, failure: undefined };
}

/**
 * A class representing a failure result.
 * 
 * @template E The type of the error object.
 */
class FailureResult<E> implements Failure<E> {
  /** Indicates the operation is completed, but with a failure. Always `true`. */
  readonly done = true;

  /**
   * Creates an instance of `FailureResult`.
   * @param failure The error object.
   */
  constructor(readonly failure: E) {}

  /**
   * Accessing this property will always throw the error object.
   * @throws The stored failure object.
   */
  get value(): never {
    throw this.failure;
  }
}

/**
 * Creates a failure result.
 * 
 * @template E The type of the error object.
 * @param error The error object to be wrapped in a failure result.
 * @returns A `Failure<E>` object.
 */
export function failure<E>(error: E): Failure<E> {
  return new FailureResult(error);
}
