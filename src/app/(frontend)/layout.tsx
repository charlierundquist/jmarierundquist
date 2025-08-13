import React from 'react'
import './styles.css'
import { Header } from '../components/Header/Component'
import { Footer } from '../components/Footer/Component'
import { Noto_Sans, Noto_Serif } from 'next/font/google'
import { CTABlock } from '../components/CTABlock/Component'

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: '300',
  variable: '--font-sans',
})

const notoSerif = Noto_Serif({
  subsets: ['latin'],
  variable: '--font-serif',
})

export const metadata = {
  description: 'Different Shapes of Family and Friendship...with a Splash of Love',
  title: 'J. Marie Rundquist, Author',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={`${notoSans.variable} ${notoSerif.variable}`}>
      <body suppressHydrationWarning>
        <Header></Header>
        <main>{children}</main>
        <CTABlock></CTABlock>
        <Footer></Footer>
      </body>
    </html>
  )
}
