import Head from 'next/head'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Testimonial from '@/components/Testimonial'
import Footer from '@/components/Footer'
import Team from '@/components/Team'
import Features from '@/components/Features'
// import { ArgentLoginButton, IEthereumProvider } from '@argent/login-react'
// import { Buffer } from 'buffer'
// window.Buffer = Buffer

export default function Home({
  handleDisconnect,
  handleConnect,
  connectWallet,
  wallet,
}) {
  return (
    <>
      <Head>
        <title>zkSync Mix</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar connectWallet={connectWallet} wallet={wallet} />
        <Hero />
        <Features />
        <Testimonial />

        <Footer />
      </main>
    </>
  )
}