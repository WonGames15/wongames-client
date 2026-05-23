import { QueryHomeDocument } from '@/graphql/queries/__generated__/QueryHome'
import Home, { HomeTemplateProps } from '@/templates/Home'
import { initializeApollo } from '@/utils/apollo'
import { bannerMapper, gamesMapper, highlightMapper } from '@/utils/mappers'

export default function Index(props: HomeTemplateProps) {
  return <Home {...props} />
}

// ATENÇÃO:
// os métodos getStaticProps/getServerSideProps SÓ FUNCIONAM EM PAGES

// getStaticProps => gerar estático em build time (gatsby)
// getServerSideProps => gerar via ssr a cada request (nunca vai para o bundle do client)
// getInitialProps => gerar via ssr a cada request (vai para o client, faz hydrate do lado do client depois do 1 req)
export async function getStaticProps() {
  const apolloClient = initializeApollo()
  const TODAY = new Date().toISOString().slice(0, 10)

  const {
    data: { banners, newGames, upcomingGames, freeGames, sections }
  } = await apolloClient.query({
    query: QueryHomeDocument,
    variables: { date: TODAY },
    fetchPolicy: 'no-cache'
  })

  return {
    revalidate: 10,
    props: {
      banners: bannerMapper(banners),
      newGamesTitle: sections?.newGames?.title ?? null,
      newGames: sections?.newGames ? gamesMapper(newGames) : null,

      mostPopularGamesTitle: sections?.popularGames?.title ?? null,
      mostPopularHighlight: highlightMapper(sections?.popularGames?.highlight),
      mostPopularGames: sections?.popularGames
        ? gamesMapper(sections?.popularGames?.games)
        : null,

      upcomingGamesTitle: sections?.upcomingGames?.title ?? null,
      upcomingGames: sections?.upcomingGames
        ? gamesMapper(upcomingGames)
        : null,
      upcomingHighlight: highlightMapper(sections?.upcomingGames?.highlight),

      freeGamesTitle: sections?.freeGames?.title ?? null,
      freeGames: gamesMapper(freeGames),
      freeHighlight: sections?.freeGames
        ? highlightMapper(sections?.freeGames?.highlight)
        : null
    }
  }
}
