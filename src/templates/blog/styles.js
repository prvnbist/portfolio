import styled, { css } from 'styled-components'

export const Header = styled.header(
   ({ theme: { colors, size } }) => css`
      min-height: 240px;
      padding: ${size.md};
      margin: ${size.md} 0;
      border-radius: ${size.sm};
      background: ${colors.dark['300']};
      display: flex;
      flex-direction: column;
      h1 {
         font-weight: 400;
         line-height: 60px;
         font-size: ${size.xl};
         margin-bottom: ${size.md};
         height: 100%;
      }
      > div {
         margin-top: auto;
      }
      span {
         color: #4e4e55;
         margin-right: ${size.md};
      }
   `
)

export const Body = styled.main(
   ({ theme: { size, fonts, colors } }) => css`
      h2,
      h3,
      p {
         font-weight: 400;
         margin-bottom: ${size.sm};
      }
      h2 {
         font-size: 28px;
      }
      h3 {
         font-size: 24px;
      }
      p {
         color: #8e939c;
         font-size: 18px;
         line-height: 32px;
         code {
            font-size: 18px;
            padding: 3px 6px;
            border-radius: 4px;
            font-family: ${fonts.sansSerif};
            background: ${colors.dark['200']} !important;
            border-bottom: 2px solid ${colors.dark['100']};
         }
      }
      img {
         width: 100%;
         border-radius: ${size.xs};
      }
      pre {
         margin-bottom: ${size.md};
      }
      pre {
         font-size: 16px;
         overflow-x: auto;
         border-radius: ${size.xs};
         font-family: ${fonts.monoSpace};
         background-color: ${colors.dark['300']} !important;
         span {
            font-family: ${fonts.monoSpace};
         }
         &::-webkit-scrollbar {
            height: ${size.xs};
         }
         &::-webkit-scrollbar-thumb {
            border-radius: ${size.xs};
            background-color: ${colors.dark['200']};
         }
      }
   `
)
