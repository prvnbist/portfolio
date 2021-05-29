import React from 'react'
import { StyledTextButton, StyledIconButton, StyledComboButton } from './styles'

export const TextButton = ({ children, ...props }) => (
   <StyledTextButton {...props}>{children}</StyledTextButton>
)

export const IconButton = ({ children, ...props }) => (
   <StyledIconButton {...props}>{children}</StyledIconButton>
)

export const ComboButton = ({ children, ...props }) => {
   const position = typeof children[0] === 'string' ? 'right' : 'left'
   if (position === 'left')
      return (
         <StyledComboButton position={position} {...props}>
            <span>{children[0]}</span>
            {children[1]}
         </StyledComboButton>
      )
   return (
      <StyledComboButton position={position} {...props}>
         {children[0]}
         <span>{children[1]}</span>
      </StyledComboButton>
   )
}
