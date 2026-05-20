import { BannerProps } from '@/components/Banner'
import BannerSlider from '@/components/BannerSlider'
import { Container } from '@/components/Container'
import { GameCardProps } from '@/components/GameCard'
import { HighlightProps } from '@/components/Highlight'
import Showcase from '@/components/Showcase'

import Base from '../Base'
import * as S from './styles'

export type HomeTemplateProps = {
  banners: BannerProps[]
  newGamesTitle: string
  newGames: GameCardProps[]
  mostPopularGamesTitle: string
  mostPopularHighlight: HighlightProps
  mostPopularGames: GameCardProps[]
  upcomingGamesTitle: string
  upcomingGames: GameCardProps[]
  upcomingHighlight: HighlightProps
  freeGamesTitle: string
  freeGames: GameCardProps[]
  freeHighlight: HighlightProps
}

const Home = ({
  banners,
  newGamesTitle,
  newGames,
  mostPopularGamesTitle,
  mostPopularHighlight,
  mostPopularGames,
  upcomingGamesTitle,
  upcomingGames,
  upcomingHighlight,
  freeGamesTitle,
  freeGames,
  freeHighlight
}: HomeTemplateProps) => (
  <Base>
    <Container>
      <S.SectionBanner>
        <BannerSlider items={banners} />
      </S.SectionBanner>
    </Container>

    {newGames && newGames.length && (
      <S.SectionNews>
        <Showcase title={newGamesTitle} games={newGames} color="black" />
      </S.SectionNews>
    )}

    {(mostPopularHighlight ||
      (mostPopularGames && mostPopularGames.length)) && (
      <Showcase
        title={mostPopularGamesTitle}
        games={mostPopularGames}
        highlight={mostPopularHighlight}
      />
    )}

    {(upcomingHighlight || (upcomingGames && upcomingGames.length)) && (
      <Showcase
        title={upcomingGamesTitle}
        games={upcomingGames}
        highlight={upcomingHighlight}
      />
    )}

    {(freeHighlight || (freeGames && freeGames.length)) && (
      <Showcase
        title={freeGamesTitle}
        games={freeGames}
        highlight={freeHighlight}
      />
    )}
  </Base>
)

export default Home
