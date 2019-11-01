import React from 'react'
import { H1 } from '../elements'
import PropTypes from 'prop-types'

function ConfirmationPage({ steps, answers }) {
  return (
    <>
      <H1>Confirmation Page</H1>
      {steps.map((step, key) => (
        <dl key={key}>
          <dt><b>{step.question}</b></dt>
          <dd>{answers[key].value}</dd>
        </dl>
      ))}
    </>
  )
}

ConfirmationPage.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.shape({ question: PropTypes.string.isRequired })),
  answers: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.string.isRequired })),
}

export default ConfirmationPage
