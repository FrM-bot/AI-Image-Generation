// import { Roboto_Mono } from '@next/font/google'
// const robotoMono = Roboto_Mono({ subsets: ['latin'] })
import ImageGenerated from '@/components/ImageGenerated'
import LocalImages from '@/components/LocalPictures'
import Layout from '@/layouts/Layout'

export default function Home() {
  return (
    <>
      <Layout title='Open AI Image Generation'>
        <>
          <ImageGenerated />
          <LocalImages />
        </>
      </Layout>
    </>
  )
}
