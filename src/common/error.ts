interface BaseError extends Error {
    preError: Error | undefined
}

export interface UsecaseError extends BaseError {

}

export interface RepositoryError extends BaseError {

}
