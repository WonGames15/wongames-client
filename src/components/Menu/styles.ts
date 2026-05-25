import breakpoints from '@/utils/breakpoints'
import { cover } from 'polished'
import styled, { css } from 'styled-components'
import { generateMedia } from 'styled-media-query'

const customMedia = generateMedia(breakpoints)

export const Wrapper = styled.menu`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    padding: ${theme.spacings.small} 0;
    position: relative;
    z-index: ${theme.layers.menu};
  `}
`

export const WrapperMobile = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    gap: ${theme.spacings.large};

    & > div:first-child {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  `}
`

export const LogoWrapper = styled.div`
  ${customMedia.lessThan('bigMedium')`
    position: absolute;
    left: 50%;
    top: 13px;
    transform: translateX(-50%);
  `}
`

export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;

  ${customMedia.lessThan('bigMedium')`
    width: 100%;
  `}
`

export const SearchInput = styled.input`
  background: transparent;
  outline: none;
  border: 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
  padding-bottom: 4px;

  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.font.sizes.small};

  width: 18rem;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray};
  }

  ${customMedia.lessThan('bigMedium')`
    width: 100%;
  `}
`

export const IconWrapper = styled.div`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    cursor: pointer;
    width: 2.4rem;
    height: 2.4rem;
  `}
`

export const MenuGroup = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-grow: 1;
    justify-content: flex-end;
    align-items: center;
    gap: ${theme.spacings.xsmall};
  `}
`

export const MenuNav = styled.div`
  ${({ theme }) => css`
    ${customMedia.greaterThan('bigMedium')`
      margin-left: ${theme.spacings.small};
		`}
  `}
`

export const MenuLink = styled.button`
  ${({ theme }) => css`
    position: relative;
    z-index: ${theme.layers.menu};
    color: ${theme.colors.white};
    font-size: ${theme.font.sizes.medium};
    margin: 0.3rem ${theme.spacings.small} 0;
    text-decoration: none;
    text-align: center;
    border: none;
    background: transparent;
    cursor: pointer;

    &:hover {
      &::after {
        content: '';
        position: absolute;
        display: block;
        height: 0.3rem;
        background-color: ${theme.colors.primary};
        animation: hoverAnimation 0.2s forwards;
      }

      @keyframes hoverAnimation {
        from {
          width: 0;
          left: 50%;
        }
        to {
          width: 100%;
          left: 0;
        }
      }
    }
  `}
`

type MenuFullProps = {
  isOpen: boolean
}

export const MenuFull = styled.nav.withConfig({
  shouldForwardProp: (prop) => prop !== 'isOpen'
})<MenuFullProps>`
  ${({ theme, isOpen }) => css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: ${theme.colors.white};
    position: fixed;
    z-index: ${theme.layers.menu};
    /* position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0; */
    /* SUBSTITUI OS ITENS ACIMA */
    ${cover()}

    height: 100vh;
    overflow: hidden;
    transition: opacity ${theme.transition.default};
    opacity: ${isOpen ? 1 : 0};
    pointer-events: ${isOpen ? 'all' : 'none'};

    > svg {
      position: absolute;
      top: 0;
      right: 0;
      margin: ${theme.spacings.xsmall};
      cursor: pointer;
      width: 2.4rem;
      height: 2.4rem;
    }

    ${MenuNav} {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      flex-direction: column;
    }

    ${MenuLink} {
      color: ${theme.colors.black};
      font-weight: ${theme.font.bold};
      font-size: ${theme.font.sizes.xlarge};
      margin-bottom: ${theme.spacings.small};
      transform: ${isOpen ? 'translateY(0)' : 'translateY(3rem)'};
      transition: transform ${theme.transition.default};
    }

    ${RegisterBox} {
      transform: ${isOpen ? 'translateY(0)' : 'translateY(3rem)'};
      transition: transform ${theme.transition.default};
    }
  `}
`

export const RegisterBox = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 ${theme.spacings.xlarge} ${theme.spacings.xlarge};

    > span {
      display: block;
      margin: ${theme.spacings.xxsmall} 0;
      font-size: ${theme.font.sizes.xsmall};
    }
  `}
`

export const CreateAccount = styled.button`
  ${({ theme }) => css`
    color: ${theme.colors.primary};
    border: none;
    font-size: ${theme.font.sizes.medium};
    border-bottom: 0.2rem solid ${theme.colors.primary};
  `}
`
