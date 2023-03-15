import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Code from '@/components/SolidityCode'
import React from 'react'

const Deployer = ({ wallet, provider, signer, connectWallet }) => {
  return (
    <div className="min-h-[100vh] bg-black">
      <Navbar connectWallet={connectWallet} wallet={wallet} />
      <Code wallet={wallet} provider={provider} signer={signer} />
      <Footer />
    </div>
  )
}

export default Deployer
