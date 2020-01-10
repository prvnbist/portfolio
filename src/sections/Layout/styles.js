import { css, createGlobalStyle } from 'styled-components'

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
