import { Goal, NewCondition, NewGoal } from '@/domain/entities/goal'
import { BaseError } from '@/lib/error'
import { CreateSuccess, Result } from '@/lib/result'

type UsecaseError = BaseError & FailedToGetNGoals

type FailedToGetNGoals = {
  type: 'FailedToGetNGoals'
}

type Usecase = {
  getNGoals(n: number): Promise<Result<Goal[], UsecaseError>>
  createGoal(goal: Goal): Promise<Result<Goal, UsecaseError>>
}

export function NewGoallistUsecase(): Usecase {
  return {
    getNGoals: async (): Promise<Result<Goal[], UsecaseError>> => {
      // TODO
      return Promise.resolve(CreateSuccess([NewGoal('0', 'test1', [NewCondition('やる気はある？', false)])]))
    },

    createGoal: async (goal: Goal): Promise<Result<Goal, UsecaseError>> => {
      // TODO
      return Promise.resolve(CreateSuccess(goal))
    }
  }
}
