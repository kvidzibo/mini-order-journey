import React, { useState } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import theme from './theme'
import { TextQuestion, ChoiceQuestion, Step, Navigation, ConfirmationPage } from './components'
import { validate, useArrayState } from './helpers'

const StyledApp = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-family: ${({ theme }) => theme.textFontFamily};
  color: ${({ theme }) => theme.colorPrimary};
  background-color: ${({ theme }) => theme.backgroundColorPrimary};
  padding: ${({ theme }) => theme.appPadding};
  > * {
    width: ${({ theme }) => theme.appWidth};
  }
  @media(max-width: ${({ theme }) => theme.mobileBreakpoint}) {
    padding: ${({ theme }) => theme.appMobilePadding};
    > * {
      width: 100%;
    }
  }
`

const steps = [{
  component: TextQuestion,
  question: 'What is your name?',
  label: 'Name',
  validators: [
    {
      validate: text => text.length > 1,
      message: 'Your name should be longer than 1 character.'
    },
    {
      validate: text => text.length < 26,
      message: 'Your name should be shorter than 26 character.'
    }
  ],
}, {
  component: TextQuestion,
  question: 'What is your email?',
  label: 'Email Address',
  validators: [{
    validate: text => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text),
    message: 'Wrong email address.'
  }]
}, {
  component: ChoiceQuestion,
  question: 'What service are you here for?',
  choices: ['STI Testing', 'Contraception', 'Other'],
  validators: [{
    validate: text => text,
    message: 'Please choose an option.'
  }]
}]

function App() {
  const [currentStep, setCurrentStep] = useState(0)
  const [state, updateState, fullState] = useArrayState(steps.length, currentStep, {
    value: '',
    error: '',
    triedToSubmit: false
  })

  return (
    <ThemeProvider theme={theme}>
      <StyledApp>
        {steps[currentStep] ? (
          <Step
            step={state}
            stepConfig={steps[currentStep]}
            updateStep={updates => updateState(updates)}
            validate={validate}
          />
        ) : <ConfirmationPage steps={steps} answers={fullState} />}
        <Navigation
          onBackClick={currentStep ? () => setCurrentStep(currentStep - 1) : false}
          onNextClick={steps[currentStep] ? () => {
            const error = validate(steps[currentStep].validators, state.value)
            if (error) {
              updateState({ error, triedToSubmit: true })
            } else {
              setCurrentStep(currentStep + 1)
            }
          } : false}
        />
      </StyledApp>
    </ThemeProvider>
  )
}

export default App
