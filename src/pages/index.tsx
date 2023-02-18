// import { Roboto_Mono } from '@next/font/google'
// const robotoMono = Roboto_Mono({ subsets: ['latin'] })
import FormPrompt from '@/components/FormPrompt'
import Layout from '@/layouts/Layout'

export default function Home() {
  return (
    <>
      <Layout title='Open AI Image Generation'>
        <FormPrompt />
      </Layout>
    </>
  )
}
