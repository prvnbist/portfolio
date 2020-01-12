import styled, { css } from 'styled-components'

export const StyledWrapper = styled.div(
   ({ theme: { size, colors } }) => css`
      width: 100vw;
      overflow-y: auto;
      height: calc(100vh - 65px);
      &::-webkit-scrollbar {
         width: ${size.xs};
      }
      &::-webkit-scrollbar-thumb {
         border-radius: ${size.xs};
         background-color: ${colors.dark['200']};
      }
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
