import styled, { css } from 'styled-components'

export const StyledWrapper = styled.div`
   display: flex;
   height: inherit;
   align-items: center;
   > div {
      &:first-child {
         flex: 1.5;
         padding-right: 20px;
      }
      &:last-child {
         flex: 1;
         @media (max-width: 567px) {
            display: none;
         }
      }
   }
`

export const StyledHeading = styled.h1(
   ({ theme: { size } }) => css`
      font-size: 56px;
      font-weight: 500;
      margin-bottom: ${size.md};
      @media (max-width: 567px) {
         font-size: ${size.xl};
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

export const StyledImage = styled.div(
   ({ theme: { colors } }) => css`
      position: relative;
      &:before {
         z-index: -1;
         content: '';
         width: 100%;
         height: 100%;
         left: 6px;
         top: 4px;
         position: absolute;
         border: 3px solid ${colors.blue['400']};
      }
      img {
         width: 100%;
      }
   `
)
