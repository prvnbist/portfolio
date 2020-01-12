import styled, { css } from 'styled-components'

export const Header = styled.header(
   ({ theme: { colors, size } }) => css`
      height: auto;
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
         @media (max-width: 567px) {
            line-height: 32px;
            font-size: ${size.md};
         }
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
         padding-bottom: ${size.sm};
         border-bottom: 1px solid ${colors.dark['200']};
      }
      h3 {
         font-size: 20px;
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
      ul {
         padding-left: ${size.lg};
         margin-bottom: ${size.md};
         li {
            color: #8e939c;
            font-size: 18px;
            line-height: ${size.lg};
         }
      }
      blockquote {
         padding: ${size.md};
         margin-bottom: ${size.md};
         background: ${colors.dark['300']};
         border-left: 2px solid ${colors.dark['100']};
         p {
            margin-bottom: 0;
            font-style: italic;
            font-size: ${size.sm};
            line-height: ${size.md};
            font-family: ${fonts.monoSpace};
         }
      }
      .gatsby-resp-image-background-image {
         border-radius: ${size.xs};
      }
   `
)

export const Pagination = styled.div(
   ({ theme: { size, colors } }) => css`
      height: auto;
      display: grid;
      grid-gap: ${size.md};
      margin-top: ${size.md};
      grid-template-columns: 1fr 1fr;
      @media (max-width: 567px) {
         grid-template-columns: 1fr;
      }
      > a {
         padding: ${size.md};
         text-decoration: none;
         border-radius: ${size.xs};
         background: ${colors.dark['300']};
         &:nth-child(2) {
            text-align: right;
         }
         span {
            color: #4e4e55;
            font-size: 16px;
            font-weight: 600;
            text-transform: uppercase;
         }
         h3 {
            color: #fff;
            font-size: 18px;
            font-weight: 400;
            line-height: 27px;
            margin-top: ${size.xs};
         }
      }
   `
)
