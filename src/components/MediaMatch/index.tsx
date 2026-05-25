import breakpoints from '@/utils/breakpoints'
import styled, { css } from 'styled-components'

type breakpointKeys = keyof typeof breakpoints

export type MediaMatchProps = {
  lessThan?: breakpointKeys
  greaterThan?: breakpointKeys
  fullWidth?: boolean
}

const mediaMatchModifiers = {
  lessThan: (size: breakpointKeys) => css`
    @media (max-width: ${breakpoints[size]}) {
      display: block;
    }
  `,
  greaterThan: (size: breakpointKeys) => css`
    @media (min-width: ${breakpoints[size]}) {
      display: block;
    }
  `
}

export default styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !['lessThan', 'greaterThan', 'fullWidth'].includes(prop)
})<MediaMatchProps>`
  ${({ lessThan, greaterThan, fullWidth }) => css`
    display: none;
    ${!!lessThan && mediaMatchModifiers.lessThan(lessThan)}
    ${!!greaterThan && mediaMatchModifiers.greaterThan(greaterThan)}

    ${!!fullWidth &&
    css`
      width: 100%;
    `}
  `}
`
