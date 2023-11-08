export type Result<T, E extends Error> = Success<T> | Failure<E>

export const AndThen =
  <T, E extends Error>(result: Result<T, E>) =>
  <NT>(f: (val: T) => Result<NT, E>) => {
    if (result.isFailure) return CreateFailure(result.value)

    return f(result.value)
  }

export const OrElse =
  <T, E extends Error>(result: Result<T, E>) =>
  <NE extends Error>(f: (val: Failure<E>) => Result<T, NE>) => {
    if (result.isSuccess) return CreateSuccess(result.value)

    return f(result)
  }

type Success<T> = {
  readonly isSuccess: true
  readonly isFailure: false
  readonly value: T
}

type Failure<E> = {
  readonly isSuccess: false
  readonly isFailure: true
  readonly value: E
}

export const CreateSuccess = <T>(value: T): Success<T> => {
  return { isSuccess: true, isFailure: false, value }
}

export const CreateFailure = <E>(value: E): Failure<E> => {
  return { isSuccess: false, isFailure: true, value }
}
