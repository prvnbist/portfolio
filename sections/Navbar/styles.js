import styled, { css } from 'styled-components'

export const StyledNavbar = styled.nav(
   () => css`
      top: 0;
      height: 64px;
      width: 100vw;
      z-index: 1000;
      position: sticky;
      background: #19191c;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      > div {
         width: 980px;
         display: flex;
         margin: 0 auto;
         height: inherit;
         align-items: center;
         justify-content: space-between;
         @media (max-width: 980px) {
            width: calc(100% - 32px);
         }
      }
   `
)

export const StyledNavItems = styled.ul(
   () => css`
      display: flex;
      height: inherit;
   `
)
export const StyledNavItem = styled.li(
   ({ theme: { colors, size }, isActive }) => css`
      height: inherit;
      list-style: none;
      margin-left: ${size.sm};
      position: relative;
      ${isActive &&
      css`
         &:after {
            bottom: 0;
            content: '';
            width: ${size.sm};
            height: ${size.xs};
            position: absolute;
            left: calc(50% - ${size.xs});
            background: ${colors.dark['100']};
            border-top-left-radius: ${size.xs};
            border-top-right-radius: ${size.xs};
         }
      `}
      a {
         color: #fff;
         height: inherit;
         line-height: 64px;
         font-weight: 400;
         display: inline-block;
         letter-spacing: 0.3px;
         font-size: ${size.sm};
         text-decoration: none;
      }
   `
)
