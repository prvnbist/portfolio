import styled, { css, createGlobalStyle } from 'styled-components'
import RoobertLight from '../../../static/fonts/RoobertLight.woff'
import RoobertRegular from '../../../static/fonts/RoobertRegular.woff'
import RoobertMedium from '../../../static/fonts/RoobertMedium.woff'
import RoobertSemiBold from '../../../static/fonts/RoobertSemiBold.woff'

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
         overflow: hidden;
         background: ${colors.dark['400']};
      }
      a {
         color: ${colors.blue['100']};
      }

      @font-face {
         font-family: 'Roobert';
         font-style: normal;
         font-weight: 300;
         src: url(${RoobertLight}) format('woff');
      }

      @font-face {
         font-family: 'Roobert';
         font-style: normal;
         font-weight: 400;
         src: url(${RoobertRegular}) format('woff');
      }

      @font-face {
         font-family: 'Roobert';
         font-style: normal;
         font-weight: 500;
         src: url(${RoobertMedium}) format('woff');
      }

      @font-face {
         font-family: 'Roobert';
         font-style: normal;
         font-weight: 600;
         src: url(${RoobertSemiBold}) format('woff');
      }
   `
)

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
      }
      @media (max-width: 767px) {
         width: 720px;
      }
      @media (max-width: 567px) {
         width: calc(100% - 40px);
      }
   `
)
