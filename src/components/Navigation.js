import React from 'react'
import styled from 'styled-components'
import { TextButton, Arrow } from '../elements'
import PropTypes from 'prop-types'

function UnStyledNavigation({ onNextClick, onBackClick, className }) {
  return (
    <div className={className}>
      {onBackClick && <TextButton onClick={onBackClick}><Arrow back /> Back</TextButton>}
      {onNextClick && <TextButton onClick={onNextClick}>Next <Arrow next /></TextButton>}
    </div>
  )
}

const Navigation = styled(UnStyledNavigation)`
  display: flex;
  justify-content: ${({ onNextClick, onBackClick }) => {
    if (onNextClick && onBackClick) {
      return 'space-between'
    }
    if (onNextClick) {
      return 'flex-end'
    }
    if (onBackClick) {
      return 'flex-start'
    }
  }};
  color: ${({ theme }) => theme.colorSecondary};
`

Navigation.propTypes = {
  onNextClick: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  onBackClick: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
}

export default Navigation