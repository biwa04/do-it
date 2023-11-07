type ToDo = "ToDo"

type InProgress = "Doing" | "Waiting"

type Done = "Success" | "Failed"

export type Status = ToDo | InProgress | Done

export function NewToDo(): ToDo {
    return "ToDo"
}

export function NewDoing(): InProgress {
    return "Doing"
}

export function NewWating(): InProgress {
    return "Waiting"
}

export function NewSuccess(): Done {
    return "Success"
}

export function NewFailed(): Done {
    return "Failed"
}

export function AllStatus(): Status[] {
    return [
        NewToDo(),
        NewDoing(),
        NewWating(),
        NewSuccess(),
        NewFailed()
    ]
}

export function StringToStatus(s: string): Status | undefined {
    switch(s) {
        case "ToDo": return NewToDo()
        case "Doing": return NewDoing()
        case "Waiting": return NewWating()
        case "Success": return NewSuccess()
        case "Failed": return NewFailed()
        default: return undefined
    }
}
