import styled, { css, createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle(
   ({ theme: { colors, fonts } }) => css`
      @import url('https://fonts.googleapis.com/css?family=IBM+Plex+Mono:300,400,500|IBM+Plex+Sans:300,400,400i,500,500i,600,700&display=swap');
      * {
         box-sizing: border-box;
         margin: 0;
         padding: 0;
         font-family: ${fonts.sansSerif};
      }
      body {
         color: #fff;
         background: ${colors.dark['400']};
      }
      a {
         color: ${colors.blue['100']};
      }
   `
)

export const StyledWrapper = styled.div`
   width: 980px;
   margin: 0 auto;
   @media (max-width: 767px) {
      width: 720px;
   }
   @media (max-width: 567px) {
      width: calc(100% - 40px);
   }
`
