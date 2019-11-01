import { useState } from 'react'

export const validate = (validators, value) => {
  const failedValidator = validators.find(validator => !validator.validate(value))
  return failedValidator ? failedValidator.message : ''
}

export const useArrayState = (len, currentStep, defaultState) => {
  const [state, setState] = useState(new Array(len).fill(defaultState))
  return [state[currentStep], stateUpdates => {
    const newState = [...state]
    newState[currentStep] = { ...state[currentStep], ...stateUpdates }
    setState(newState)
  }, state]
}
