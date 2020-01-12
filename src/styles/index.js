import styled, { css } from 'styled-components'

export const StyledWrapper = styled.div`
   display: flex;
   height: inherit;
   align-items: center;
   height: calc(100vh - 89px);
   @media (max-width: 567px) {
      display: unset;
      div {
         margin-top: 120px;
      }
   }
`

export const StyledName = styled.h2(
   ({ theme: { size } }) => css`
      font-weight: 400;
      font-size: ${size.xl};
      @media (max-width: 567px) {
         font-size: ${size.md};
      }
   `
)

export const StyledHeading = styled.h1(
   ({ theme: { size } }) => css`
      color: #636e84;
      font-size: 96px;
      font-weight: 500;
      margin-bottom: ${size.md};
      @media (max-width: 980px) {
         font-size: 64px;
      }
      @media (max-width: 567px) {
         font-size: ${size.xxl};
      }
   `
)

export const StyledPara = styled.p`
   color: #636e84;
   font-size: 20px;
   line-height: 30px;
   span {
      color: #fff;
   }
   @media (max-width: 567px) {
      font-size: 18px;
   }
`

export const StyledSkills = styled.ul(
   ({ theme: { size } }) => css`
      width: 100%;
      display: grid;
      grid-gap: 4px;
      grid-auto-rows: 32px;
      margin-top: ${size.sm};
      grid-template-columns: 1fr 1fr;
   `
)

export const StyledSkill = styled.li(
   ({ theme: { size } }) => css`
      display: flex;
      color: #636e84;
      font-size: 18px;
      list-style: none;
      font-weight: 400;
      align-items: center;
      padding-left: ${size.sm};
      a {
         text-decoration: none;
      }
      &:before {
         content: '';
         border-color: transparent #636e84;
         border-style: solid;
         border-width: 6px 0 6px 8px;
         border-radius: 0.2px;
         display: block;
         height: 0;
         width: 0;
         left: -16px;
         top: 0;
         position: relative;
      }
   `
)
