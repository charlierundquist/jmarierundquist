import React from 'react'
import './styles.css'
import { Header } from '../components/Header/Component'
import { Footer } from '../components/Footer/Component'
import { Noto_Sans, Noto_Serif } from 'next/font/google'
import Script from 'next/script'
import MailerliteEmbeddedFormBlock from '../components/MailerliteEmbeddedForm/Component'
// import { CTABlock } from '../components/CTABlock/Component'

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
      <head>
        <Script id="mailerliteScript" async defer>
          {`;(function (w, d, e, u, f, l, n) {
                      ;((w[f] =
                        w[f] ||
                        function () {
                          ;(w[f].q = w[f].q || []).push(arguments)
                        }),
                        (l = d.createElement(e)),
                        (l.async = 1),
                        (l.src = u),
                        (n = d.getElementsByTagName(e)[0]),
                        n.parentNode.insertBefore(l, n))
                    })(window, document, 'script', 'https://assets.mailerlite.com/js/universal.js', 'ml')
                    ml('account', '542048')`}
        </Script>
        <Script
          id="recaptchaScript"
          src="https://www.google.com/recaptcha/api.js"
          async
          defer
        ></Script>
      </head>
      <body suppressHydrationWarning>
        <Header></Header>
        <main>
          {children}
          <div>
            <MailerliteEmbeddedFormBlock></MailerliteEmbeddedFormBlock>
          </div>
        </main>
        {/* <CTABlock></CTABlock> */}
        <Footer></Footer>
      </body>
    </html>
  )
}
