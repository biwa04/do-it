export interface Entity<T, U> {
  toDTO: (e: T) => U
  toEntity: (dto: U) => T
}
