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
         overflow-x: hidden;
         background: ${colors.dark['400']};
      }
      a {
         color: ${colors.blue['100']};
      }

      @font-face {
         font-family: 'Roobert';
         font-style: normal;
         font-weight: 300;
         src: url('/static/fonts/RoobertLight.woff') format('woff');
      }

      @font-face {
         font-family: 'Roobert';
         font-style: normal;
         font-weight: 400;
         src: url('/static/fonts/RoobertRegular.woff') format('woff');
      }

      @font-face {
         font-family: 'Roobert';
         font-style: normal;
         font-weight: 500;
         src: url('/static/fonts/RoobertMedium.woff') format('woff');
      }

      @font-face {
         font-family: 'Roobert';
         font-style: normal;
         font-weight: 600;
         src: url('/static/fonts/RoobertSemiBold.woff') format('woff');
      }
   `
)

export const StyledWrapper = styled.div`
   width: 980px;
   margin: 0 auto;
   height: calc(100vh - 65px);
   @media (max-width: 767px) {
      width: 720px;
   }
   @media (max-width: 567px) {
      width: calc(100% - 40px);
   }
`
