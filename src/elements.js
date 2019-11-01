import styled from 'styled-components'

export const Arrow = styled.i`
  border: solid ${({ theme }) => theme.colorSecondary};
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 3px;
  ${({ next, back }) => {
    if (next) {
      return `
        transform: rotate(-45deg);
        -webkit-transform: rotate(-45deg);
        margin-left: 10px;
      `
    }
    if (back) {
      return `
        transform: rotate(135deg);
        -webkit-transform: rotate(135deg);
        margin-right: 10px;
      `
    }
  }}
`

export const Button = styled.button`
  display:flex;
  background-color: ${({ theme }) => theme.backgroundColorSecondary};
  color: ${({ theme }) => theme.colorPrimary};
  font-size: 1rem;
  padding: 0.8em 1.3em;
  border: none;
  margin: 0.2em;
  cursor: pointer;
  font-weight: bold;
  outline: none;
  ${props => props.active && `
    opacity: 0.5;
    cursor: default;
  `}
  ${props => props.fullWidthMobile && `
    @media(max-width: ${props.theme.mobileBreakpoint}) {
      width: 100%;
    }
  `}
`

export const Error = styled.p`
  color: ${({ theme }) => theme.colorError};
  min-height: 1.5em;
  margin: 0;
`

export const Flex = styled.div`
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
  flex-wrap: ${props => props.wrap || 'nowrap'};
`

export const H1 = styled.h1`
  margin: ${({ theme }) => theme.headerMargin};
  font-family: ${({ theme }) => theme.headerFontFamily};
`

export const Input = styled.input`
  margin: ${({ theme }) => theme.inputMargin};
  background-color: ${({ theme }) => theme.backgroundColorPrimary};
  border: 1px solid ${({ theme }) => theme.colorPrimary};
  border-radius: 0.2em;
  padding: ${({ theme }) => theme.inputPadding};
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colorPrimary};
  outline: none;
`

export const TextButton = styled.button`
  border: none;
  background: inherit;
  color: inherit;
  font-weight: bold;
  font-family: ${({ theme }) => theme.textFontFamily};
  cursor: pointer;
  outline: none;
`
