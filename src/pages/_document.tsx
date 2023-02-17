import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" data-theme='dark'>
      <Head />
      <body className="bg-white dark:bg-[#161618] dark:text-white px-2">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
