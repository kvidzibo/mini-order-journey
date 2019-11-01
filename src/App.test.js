import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import { Arrow, Error, Input, H1, Button } from './elements'

describe('Step1', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(<App />)
  })

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('has correct header.', () => {
    const header = wrapper.find(H1).text()
    expect(header).toEqual('What is your name?')
  })

  it('validates for too short input.', () => {
    wrapper.find(Arrow).simulate('click')
    const errorMsg = wrapper.find(Error).text()
    expect(errorMsg).toEqual('Your name should be longer than 1 character.')
  })

  it('validates for too long input.', () => {
    wrapper.find(Input).simulate('change', { target: { value: 'tooLong'.repeat(10) } })
    wrapper.find(Arrow).simulate('click')
    const errorMsg = wrapper.find(Error).text()
    expect(errorMsg).toEqual('Your name should be shorter than 26 character.')
  })

  it('Goes to step 2 with correct name.', () => {
    wrapper.find(Input).simulate('change', { target: { value: 'My Real Name' } })
    wrapper.find(Arrow).simulate('click')
    const header = wrapper.find(H1).text()
    expect(header).toEqual('What is your email?')
  })
})

describe('Step2', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(<App />)
    wrapper.find(Input).simulate('change', { target: { value: 'My Real Name' } })
    wrapper.find(Arrow).simulate('click')
  })

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('has correct header.', () => {
    const header = wrapper.find(H1).text()
    expect(header).toEqual('What is your email?')
  })

  it('fails with incorrect email.', () => {
    wrapper.find(Input).simulate('change', { target: { value: 'badEmail' } })
    wrapper.find(Arrow).at(1).simulate('click')
    const errorMsg = wrapper.find(Error).text()
    expect(errorMsg).toEqual('Wrong email address.')
  })

  it('allows to go back.', () => {
    wrapper.find(Arrow).at(0).simulate('click')
    const header = wrapper.find(H1).text()
    expect(header).toEqual('What is your name?')
  })

  it('goes to step3 with correct email.', () => {
    wrapper.find(Input).simulate('change', { target: { value: 'goodEmail@gmail.com' } })
    wrapper.find(Arrow).at(1).simulate('click')
    const header = wrapper.find(H1).text()
    expect(header).toEqual('What service are you here for?')
  })
})

describe('Step3', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(<App />)
    wrapper.find(Input).simulate('change', { target: { value: 'My Real Name' } })
    wrapper.find(Arrow).simulate('click')
    wrapper.find(Input).simulate('change', { target: { value: 'goodEmail@gmail.com' } })
    wrapper.find(Arrow).at(1).simulate('click')
  })

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('has correct header.', () => {
    const header = wrapper.find(H1).text()
    expect(header).toEqual('What service are you here for?')
  })

  it('fails if nothing is selected.', () => {
    wrapper.find(Arrow).at(1).simulate('click')
    const errorMsg = wrapper.find(Error).text()
    expect(errorMsg).toEqual('Please choose an option.')
  })

  it('allows to go back.', () => {
    wrapper.find(Arrow).at(0).simulate('click')
    const header = wrapper.find(H1).text()
    expect(header).toEqual('What is your email?')
  })

  it('goes to confirmation page on success.', () => {
    wrapper.find(Button).at(1).simulate('click')
    wrapper.find(Arrow).at(1).simulate('click')
    const header = wrapper.find(H1).text()
    expect(header).toEqual('Confirmation Page')
  })
})

describe('Confirmation page', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(<App />)
    wrapper.find(Input).simulate('change', { target: { value: 'My Real Name' } })
    wrapper.find(Arrow).simulate('click')
    wrapper.find(Input).simulate('change', { target: { value: 'goodEmail@gmail.com' } })
    wrapper.find(Arrow).at(1).simulate('click')
    wrapper.find(Button).at(1).simulate('click')
    wrapper.find(Arrow).at(1).simulate('click')
  })

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('has correct header.', () => {
    const header = wrapper.find(H1).text()
    expect(header).toEqual('Confirmation Page')
  })


  it('allows to go back.', () => {
    wrapper.find(Arrow).at(0).simulate('click')
    const header = wrapper.find(H1).text()
    expect(header).toEqual('What service are you here for?')
  })

  it('Displays correct information', () => {
    const questions = wrapper.find('dl dt').map(node => node.text())
    const responses = wrapper.find('dl dd').map(node => node.text())
    expect(questions).toEqual([
      'What is your name?',
      'What is your email?',
      'What service are you here for?'
    ])
    expect(responses).toEqual([
      'My Real Name',
      'goodEmail@gmail.com',
      'Contraception',
    ])
  })
})
