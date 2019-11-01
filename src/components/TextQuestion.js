import React from 'react'
import { Flex, H1, Input } from '../elements'
import PropTypes from 'prop-types'

function TextQuestion({ question, label, setValue, value }) {
  return (
    <Flex direction="column">
      <H1>{question}</H1>
      <label htmlFor="text-question-input">{label}</label>
      <Input autoComplete="off" id="text-question-input" value={value} onChange={e => setValue(e.target.value)} />
    </Flex>
  )
}

TextQuestion.propTypes = {
  question: PropTypes.string,
  label: PropTypes.string,
  setValue: PropTypes.func,
  value: PropTypes.string
}

export default TextQuestion