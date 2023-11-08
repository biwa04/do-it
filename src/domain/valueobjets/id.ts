import { ValueObjectError } from './error'

export type NewFromStringError = ValueObjectError

export interface IDClass<T> {
  readonly toString: (t: ID<T>) => string
}

export interface ID<T> {
  readonly value: T
  readonly idClass: IDClass<T>
}
