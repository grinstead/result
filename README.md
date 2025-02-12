# @grinstead/result

A lightweight and type-safe `Result` type for TypeScript, providing a functional way to handle success and failure cases without relying on exceptions.

## Installation

```sh
npm install @grinstead/result
```

## Usage

### Importing

```typescript
import { Result, success, failure } from "@grinstead/result";
```

### Creating a Success Result

```typescript
const result = success(42);

console.log(result.done); // true
console.log(result.value); // 42
console.log(result.failure); // undefined
```

### Creating a Failure Result

```typescript
const error = new Error("Something went wrong");
const result = failure(error);

console.log(result.done); // true
console.log(result.failure); // Error: Something went wrong

// Accessing `.value` will throw the stored error
try {
  console.log(result.value);
} catch (err) {
  console.error(err.message); // "Something went wrong"
}
```

## API

### `Result<T, E>`

A type representing an operation that can either succeed or fail.

```typescript
type Result<T, E> = Success<T> | Failure<E>;
```

### `success<T>(value: T): Success<T>`

Creates a successful result.

```typescript
const res = success("Hello");
console.log(res.value); // "Hello"
```

### `failure<E>(error: E): Failure<E>`

Creates a failure result.

```typescript
const res = failure(new Error("Oops"));
console.log(res.failure); // Error: Oops
```

Accessing `.value` will throw:

```typescript
console.log(res.value); // Throws the error
```
