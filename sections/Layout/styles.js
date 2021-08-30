import styled, { css } from 'styled-components'

export const StyledWrapper = styled.div(
   ({ theme: { size, colors } }) => css`
      > div {
         width: 980px;
         margin: 0 auto;
         padding-bottom: ${size.md};
         @media (max-width: 980px) {
            width: calc(100vw - 40px);
         }
      }
   `
)
