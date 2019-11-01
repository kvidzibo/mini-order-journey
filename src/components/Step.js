import React from 'react'
import { Flex, Error } from '../elements'
import PropTypes from 'prop-types'


function Step({ step, stepConfig, updateStep, validate }) {
  const { component: StepComponent, validators, ...rest } = stepConfig
  return (
    <Flex direction="column">
      <StepComponent
        {...rest}
        value={step.value}
        setValue={value => updateStep({
          value,
          error: step.triedToSubmit ? validate(validators, value) : ''
        })}
      />
      <Error>{step.error}</Error>
    </Flex>
  )
}

Step.propTypes = {
  step: PropTypes.shape({
    value: PropTypes.string,
    triedToSubmit: PropTypes.bool,
    error: PropTypes.string
  }),
  stepConfig: PropTypes.shape({
    validators: PropTypes.arrayOf(PropTypes.shape({
      message: PropTypes.string,
      validate: PropTypes.func
    })),
    component: PropTypes.func
  }),
  updateStep: PropTypes.func,
  validate: PropTypes.func
}

export default Step