import styled, { css } from 'styled-components'

export const PageHeading = styled.h1(
   ({ theme: { size } }) => css`
      color: #ffffff;
      font-weight: 400;
      font-size: ${size.lg};
      margin: ${size.xl} 0 ${size.lg} 0;
   `
)

export const Projects = styled.ul(
   ({ theme: { size } }) => css`
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-auto-rows: minmax(260px, 1fr);
      grid-gap: ${size.md};
   `
)

export const Project = styled.li(
   ({ theme: { size, colors } }) => css`
      display: flex;
      flex-direction: column;
      list-style: none;
      padding: ${size.md};
      border-radius: ${size.xs};
      background: ${colors.dark['300']};
      header {
         h3 {
            font-weight: 500;
            font-size: ${size.md};
            margin-bottom: ${size.sm};
         }
      }
      main {
         height: 100%;
         p {
            font-size: 18px;
            line-height: 27px;
         }
      }
      footer {
         margin-top: auto;
      }
   `
)
