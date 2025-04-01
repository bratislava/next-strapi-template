import { GetStaticPaths, GetStaticProps } from 'next'

import { client } from '@/src/services/graphql'
import { PageEntityFragment } from '@/src/services/graphql/api'
import { NOT_FOUND } from '@/src/utils/consts'

type PageProps = {
  entity: PageEntityFragment
}

type StaticParams = {
  path: string[]
}

export const getStaticPaths: GetStaticPaths<StaticParams> = async () => {
  // TODO get all paths
  const paths: string[] = []

  // eslint-disable-next-line no-console
  console.log(`Pages: Generated static paths for ${paths.length} pages.`)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<PageProps, StaticParams> = async ({
  locale,
  params,
}) => {
  const path = params?.path
  const slug = path?.at(-1)

  const pathJoined = `/${path?.join('/')}`

  // eslint-disable-next-line no-console
  console.log(`Revalidating page ${locale === 'en' ? '/en' : ''}${pathJoined}`)

  if (!path || !slug || !locale) {
    return NOT_FOUND
  }

  const [{ pages: entities }] = await Promise.all([client.PageBySlug({ slug })])

  const entity = entities?.data[0]
  if (!entity) {
    return NOT_FOUND
  }

  // // Prefetch data
  // const queryClient = new QueryClient()

  // // TODO prefetchqueries

  // const dehydratedState = dehydrate(queryClient)

  return {
    props: {
      entity,
      // general,
      // navigation,
      // dehydratedState,
      // ...translations,
    },
    revalidate: 1, // TODO change to 10
  }
}

const Page = ({ entity: page }: PageProps) => {
  if (!page.attributes) {
    return null
  }

  return (
    <div>
      <h1>{page.attributes.title}</h1>
    </div>
  )
}

export default Page
