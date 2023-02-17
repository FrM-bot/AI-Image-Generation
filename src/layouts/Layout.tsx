import Head from 'next/head'
import { ReactElement } from 'react'
import Darkmode from '../components/Darkmode'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Link from '../components/Link'
import ConfigProvider from '@/context/ConfigProvider'
import Config from '../components/Config'

interface Props {
  children: ReactElement
  title: string
}

function Layout({ children, title }: Props) {
  return (
    <ConfigProvider>
      <>
        <Head>
          <title>{title}</title>
          <meta name="description" content="Inteligent Artificial Image Generation" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/openai.svg" />
          <meta property="og:title" content="Inteligent Artificial Image Generation" />
          <meta property="og:type" content="web application" />
          <meta property="og:site_name" content="AI Image Generation" />
          <meta property="og:description" content="Inteligent Artificial Image Generation with OpenAI API."/>
          <meta property="og:url" content="https://seoalive.com/open-graph" />
          <meta property="og:image" content="https://seoalive.com/wp-content/uploads/2020/04/open-graph.jpg" />
        </Head>
        <Header />
        <main className='max-w-7xl mx-auto mt-8 min-h-[80vh]'>
          <Config />
          {children}
        </main>
        <Footer />
      </>
    </ConfigProvider>
  )
}

export default Layout