import styled, { css } from 'styled-components'
import media from 'styled-media-query'

type GridProps = {
  noMarginTopDesktop?: boolean
  noMarginTopMobile?: boolean
}

export const Grid = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !['noMarginTopDesktop', 'noMarginTopMobile'].includes(prop)
})<GridProps>`
  ${({ theme, noMarginTopDesktop, noMarginTopMobile }) => css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
    grid-auto-rows: max-content;
    grid-gap: ${theme.spacings.small};

    ${media.lessThan('medium')`
      margin-top: ${!noMarginTopMobile && theme.spacings.small};
    `}

    ${media.greaterThan('medium')`
      margin-top: ${!noMarginTopDesktop && theme.spacings.medium};
    `}

    margin-bottom: ${theme.spacings.medium};
  `}
`
