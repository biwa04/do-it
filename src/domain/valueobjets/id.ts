export type ID = {
    value: string
}

export function IDfromString(s: string): ID {
    return {value: s}    
}
