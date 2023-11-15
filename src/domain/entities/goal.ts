import { ID } from '../valueobjets/id'
import { Entity } from './entity'

// Define value objects

export type GoalID = ID<string>
const GoalIDClass = {
  toString: (id: GoalID) => id.value
}

export type Condition = {
  name: string
  fulfill: boolean
}

// Define Entities

export type GoalDTO = {
  id: string
  name: string
  conditions: Condition[]
}

export type Goal = {
  id: GoalID
  name: string
  conditions: Condition[]
} & Entity<Goal, GoalDTO>

export function GoalToGoalDTO(goal: Goal): GoalDTO {
  return {
    id: goal.id.value,
    name: goal.name,
    conditions: goal.conditions
  }
}

export function GoalDTOToGoal(goal: GoalDTO): Goal {
  return {
    id: {
      value: goal.id,
      idClass: GoalIDClass
    },
    name: goal.name,
    conditions: goal.conditions,
    toDTO: GoalToGoalDTO,
    toEntity: GoalDTOToGoal
  }
}

export function NewGoal(id: string, name: string, conditions: Condition[]): Goal {
  return {
    id: {
      value: id,
      idClass: GoalIDClass
    },
    name: name,
    conditions: conditions,
    toDTO: GoalToGoalDTO,
    toEntity: GoalDTOToGoal
  }
}
