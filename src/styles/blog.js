import styled, { css } from 'styled-components'

export const PageHeading = styled.h1(
   ({ theme: { size } }) => css`
      color: #ffffff;
      font-weight: 400;
      font-size: ${size.lg};
      margin: ${size.lg} 0;
   `
)

export const Articles = styled.ul(() => css``)

export const Article = styled.li(
   ({ theme: { colors, size } }) => css`
      height: 64px;
      list-style: none;
      padding: 0 ${size.sm};
      border-bottom: 1px solid ${colors.dark['200']};
      &:first-child {
         border-top: 1px solid ${colors.dark['200']};
      }
      &:hover {
         background: ${colors.dark['300']};
      }
      @media (max-width: 767px) {
         height: auto;
         padding: ${size.sm};
      }
      a {
         width: 100%;
         color: #fff;
         display: flex;
         height: inherit;
         align-items: center;
         text-decoration: none;
         justify-content: space-between;
         h4,
         span {
            font-size: 18px;
            font-weight: 400;
            letter-spacing: 0.4px;
         }
         span {
            color: #4e4e55;
         }
         @media (max-width: 767px) {
            flex-direction: column;
            align-items: flex-start;
            h4 {
               margin-bottom: ${size.sm};
            }
         }
      }
   `
)
