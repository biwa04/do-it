'use server'

import { Card, CardContent, CardHeader, Checkbox, FormControlLabel, FormGroup, Paper } from '@mui/material'
import { NewGoaListUsecase } from './usecase'

const usecase = NewGoaListUsecase()

export default async function GoalList() {
  const goals = await usecase.getNGoals(30)
  if (goals.isFailure) {
    console.log(goals.value)
    return <div></div>
  }

  console.log(goals.value)

  return (
    <Paper>
      {goals.value.map((goal) => {
        console.log(goal.name)
        return (
          <Card key={goal.id}>
            <CardHeader title={goal.name} />
            <CardContent>
              <FormGroup>
                {goal.conditions.map((condition, i) => (
                  <FormControlLabel control={<Checkbox />} label={condition.name} key={i} />
                ))}
              </FormGroup>
            </CardContent>
          </Card>
        )
      })}
    </Paper>
  )
}
