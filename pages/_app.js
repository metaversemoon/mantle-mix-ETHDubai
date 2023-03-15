import '@/styles/globals.css'

import { useState } from 'react'
import '@rainbow-me/rainbowkit/styles.css'
import {
  getDefaultWallets,
  RainbowKitProvider,
  midnightTheme,
} from '@rainbow-me/rainbowkit'
import { Chain, configureChains, createClient, WagmiConfig } from 'wagmi'
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  polygonMumbai,
} from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import { Lato } from '@next/font/google'
import { ChakraProvider } from '@chakra-ui/react'
import { ethers } from 'ethers'
import { Contract, Web3Provider, Provider } from 'zksync-web3'
import { Registery_address, Registery_ABI } from '../constants/constants'
// import {
//   ArgentLoginButton,
//   IEthereumProvider,
// } from '../node_modules/@argent/login-react/dist'
// import { Buffer } from 'buffer'
import Onboard from '@web3-onboard/core'
import argentModule from '@web3-onboard/argent'
import * as fcl from '@onflow/fcl'
import '../flow/config.js'

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
})

const hyperSpaceChain = {
  id: 3141,
  name: 'Filecoin — HyperSpace testnet',
  network: 'Filecoin — HyperSpace testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Test Filecoin',
    symbol: 'tFIL',
  },
  rpcUrls: {
    default: {
      http: ['https://api.hyperspace.node.glif.io/rpc/v1'],
    },
    chainstack: {
      http: ['https://filecoin-hyperspace.chainstacklabs.com/rpc/v1'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Filfox Explorer',
      url: 'https://hyperspace.filfox.info/en',
    },
  },
  testnet: true,
}

const { chains, provider } = configureChains(
  [hyperSpaceChain],
  [
    // alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    publicProvider(),
  ],
)

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

export default function App({ Component, pageProps }) {
  const [provider, setProvider] = useState('')
  const [wallet, setWallet] = useState('')
  const [signer, setSigner] = useState('')
  const [user, setUser] = useState({ loggedIn: false })

  // initialize the module
  const argent = argentModule()

  const onboard = Onboard({
    // ... other Onboard options
    wallets: [
      argent,
      // ... other wallets
    ],
    chains: [
      {
        id: '0x118', // = 280
        token: 'ETH',
        label: 'zkSync Goerli',
        rpcUrl: 'https://zksync2-testnet.zksync.dev',
      },
      // ... other chains
    ],
  })

  // const onboard = Onboard({
  //   // ... other Onboard options
  //   wallets: [
  //     argent,
  //     // ... other wallets
  //   ],
  //   chains: [
  //     // {
  //     //   id: '0x118', // = 280
  //     //   token: 'ETH',
  //     //   label: 'zkSync Goerli',
  //     //   rpcUrl: 'https://alpha4.starknet.io',
  //     // },
  //     {
  //       id: '0x118', // = 280
  //       token: 'ETH',
  //       label: 'zkSync Goerli',
  //       rpcUrl: 'https://zksync2-testnet.zksync.dev',
  //     },

  //     // ... other chains
  //   ],
  // })

  const handleConnectArgent = async () => {
    const connectedWallets = await onboard.connectWallet()
    console.log('MY__connectedWallets', connectedWallets)
  }
  const handleConnect = async (ethereumProvider) => {
    const provider = new ethers.providers.Web3Provider(ethereumProvider)
    setProvider(provider)
  }

  const handleDisconnect = async () => {
    localStorage.removeItem('walletconnect') // to make sure WC is disconnected
    setProvider(undefined)
  }

  const connectWallet = async () => {
    const provider = new Provider('https://zksync2-testnet.zksync.dev')
    // const provider = new Provider('https://rpc.testnet.mantle.xyz')
    setProvider(provider)

    // Note that we still need to get the Metamask signer
    const signer = new Web3Provider(window.ethereum).getSigner()
    setSigner(signer)

    const addresses = await window.ethereum.request({
      method: 'eth_requestAccounts',
    })
    const address = addresses[0]
    setWallet(address)
    const contract = new Contract(Registery_address, Registery_ABI, signer)
  }

  // useEffect(() => {
  //   fcl.currentUser().subscribe(setUser)
  //   fcl
  //     .config()
  //     .put('flow.network', 'testnet')
  //     .put('accessNode.api', 'https://rest-testnet.onflow.org')
  //     .put('discovery.wallet', 'https://fcl-discovery.onflow.org/testnet/authn')
  //     .put('app.detail.title', 'Flow Bounty Hunter')
  //     .put('app.detail.icon', 'https://i.imgur.com/r23Zhvu.png')
  //     .put('0xFlowToken', '0x7e60df042a9c0868')
  // }, [])

  return (
    <WagmiConfig client={wagmiClient}>
      <main className={lato.className}>
        <RainbowKitProvider
          chains={chains}
          modalSize="compact"
          theme={midnightTheme({
            accentColor: '#262A53',
            accentColorForeground: 'white',
            borderRadius: 'small',
            fontStack: 'rounded',
          })}
        >
          <ChakraProvider>
            <div>
              <button
                className="relative group-hover:border-t-4 border-[#191b43] py-1 transition-all uppercase"
                onClick={handleConnectArgent}
              >
                Connect Wallet Argent
              </button>
              {/* <div>
                {!provider ? (
                  <ArgentLoginButton
                    options={{
                      chainId: 280,
                      rpcUrl: 'https://zksync2-testnet.zksync.dev',
                    }}
                    onConnect={handleConnect}
                    onError={console.error}
                  />
                ) : (
                  <>
                    <h2>Connected as {provider.getSigner()._address}</h2>
                    <p>
                      <button onClick={handleDisconnect}>Disconnect</button>
                    </p>
                  </>
                )}
              </div> */}
            </div>
            <Component
              {...pageProps}
              handleConnect={handleConnect}
              provider={provider}
              setProvider={setProvider}
              signer={signer}
              setSigner={setSigner}
              handleDisconnect={handleDisconnect}
              connectWallet={connectWallet}
              wallet={wallet}
              handleConnectArgent={handleConnectArgent}
              user={user}
              setUser={setUser}
            />
          </ChakraProvider>
        </RainbowKitProvider>
      </main>
    </WagmiConfig>
  )
}
