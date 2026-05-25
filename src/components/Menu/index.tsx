import { useDebounce } from '@/hooks/useDebouncer'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import Button from '@/components/Button'
import CartDropdown from '@/components/CartDropdown'
import CartIcon from '@/components/CartIcon'
import Logo from '@/components/Logo'
import MediaMatch from '@/components/MediaMatch'
import UserDropdown from '@/components/UserDropdown'

import { Close as CloseIcon } from '@styled-icons/material-outlined/Close'
import { Search as SearchIcon } from '@styled-icons/material-outlined/Search'
import { Menu2 as MenuIcon } from '@styled-icons/remix-fill/Menu2'

import * as S from './styles'

export type MenuProps = {
  username?: string | null
  status?: string
}

const Menu = ({ username, status }: MenuProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const [search, setSearch] = useState('')

  useEffect(() => {
    if (
      router.query.q &&
      router.pathname === '/games' &&
      typeof router.query.q === 'string'
    ) {
      setSearch(router.query.q)
    }
  }, [router.pathname, router.query.q])

  const debouncedSearch = useDebounce(search, 800)

  useEffect(() => {
    // só executa na página /games
    if (router.pathname !== '/games') return

    const currentQ =
      router.query.q && typeof router.query.q === 'string' ? router.query.q : ''

    // evita replace desnecessário
    if (currentQ === debouncedSearch) return

    const query = { ...router.query }

    if (!debouncedSearch.trim()) {
      delete query.q
    } else {
      query.q = debouncedSearch
    }

    router.replace(
      {
        pathname: '/games',
        query
      },
      undefined,
      { shallow: true }
    )
  }, [debouncedSearch])

  return (
    <S.Wrapper>
      <S.LogoWrapper>
        <Link href="/" passHref>
          <Logo hideOnMobile />
        </Link>
      </S.LogoWrapper>

      <MediaMatch lessThan="bigMedium" fullWidth>
        <S.WrapperMobile>
          <div>
            <S.IconWrapper onClick={() => setIsOpen(true)}>
              <MenuIcon aria-label="Open Menu" />
            </S.IconWrapper>

            <S.IconWrapper>
              <Link href="/cart">
                <CartIcon />
              </Link>
            </S.IconWrapper>
          </div>

          {router.pathname === '/games' && (
            <S.SearchWrapper>
              <SearchIcon
                aria-label="Search"
                color="#FAFAFA"
                width={24}
                height={24}
              />

              <S.SearchInput
                placeholder="Search games..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </S.SearchWrapper>
          )}
        </S.WrapperMobile>
      </MediaMatch>

      <MediaMatch greaterThan="bigMedium">
        <S.MenuNav>
          <Link href="/" passHref>
            <S.MenuLink>Home</S.MenuLink>
          </Link>

          <Link href="/games" passHref>
            <S.MenuLink>Explore</S.MenuLink>
          </Link>
        </S.MenuNav>
      </MediaMatch>

      {status !== 'loading' && (
        <>
          <S.MenuGroup>
            {router.pathname === '/games' && (
              <MediaMatch greaterThan="bigMedium">
                <S.SearchWrapper>
                  <SearchIcon
                    aria-label="Search"
                    color="#FAFAFA"
                    width={24}
                    height={24}
                  />

                  <S.SearchInput
                    placeholder="Search games..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </S.SearchWrapper>
              </MediaMatch>
            )}

            <MediaMatch greaterThan="bigMedium">
              <S.IconWrapper>
                <CartDropdown />
              </S.IconWrapper>
            </MediaMatch>

            <MediaMatch greaterThan="bigMedium">
              {username ? (
                <UserDropdown username={username} />
              ) : (
                <Link href="/sign-in" passHref>
                  <Button>Sign in</Button>
                </Link>
              )}
            </MediaMatch>
          </S.MenuGroup>

          <S.MenuFull aria-hidden={!isOpen} isOpen={isOpen}>
            <CloseIcon
              aria-label="Close Menu"
              onClick={() => setIsOpen(false)}
            />

            <S.MenuNav>
              <Link href="/" passHref>
                <S.MenuLink>Home</S.MenuLink>
              </Link>

              <Link href="/games" passHref>
                <S.MenuLink>Explore</S.MenuLink>
              </Link>

              {!!username && (
                <>
                  <Link href="/profile/me" passHref>
                    <S.MenuLink>My profile</S.MenuLink>
                  </Link>

                  <Link href="/wishlist" passHref>
                    <S.MenuLink>Wishlist</S.MenuLink>
                  </Link>
                </>
              )}
            </S.MenuNav>

            {!username && (
              <S.RegisterBox>
                <Link href="/sign-in" passHref>
                  <Button fullWidth size="large">
                    Sign in
                  </Button>
                </Link>

                <span>or</span>

                <Link href="/sign-up" passHref>
                  <S.CreateAccount title="Sign Up">Sign Up</S.CreateAccount>
                </Link>
              </S.RegisterBox>
            )}
          </S.MenuFull>
        </>
      )}
    </S.Wrapper>
  )
}

export default Menu
