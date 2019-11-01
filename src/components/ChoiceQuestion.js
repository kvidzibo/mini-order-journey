import React from 'react'
import { Flex, H1, Button } from '../elements'
import PropTypes from 'prop-types'

function ChoiceQuestion({ question, choices, setValue, value }) {
  return (
    <Flex direction="column">
      <H1>{question}</H1>
      <Flex wrap="wrap">
        {choices.map((choice, key) => (
          <Button
            fullWidthMobile
            active={value === choice}
            onClick={() => setValue(choice)}
            key={key}>{choice}
          </Button>
        ))}
      </Flex>
    </Flex>
  )
}

ChoiceQuestion.propTypes = {
  question: PropTypes.string,
  choices: PropTypes.arrayOf(PropTypes.string),
  setValue: PropTypes.func,
  value: PropTypes.string
}

export default ChoiceQuestion