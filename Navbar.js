import Link from 'next/link'
import { useState } from 'react'
import { Transition } from '@headlessui/react'
import { BiMenu } from 'react-icons/bi'
import { MdClose } from 'react-icons/md'
import Image from 'next/image'
import logo from '../public/img/logo32.png'
import CustomButton from './CustomButton'
import * as fcl from '@onflow/fcl'

const Navbar = ({
  connectWallet,
  wallet,
  handleConnectArgent,
  user,
  setUser,
}) => {
  const [expand, setExpand] = useState(false)
  const onClickDisconnect = () => {
    if (user?.loggedIn) {
      fcl.unauthenticate()
    } else {
      fcl.authenticate()
    }
  }

  return (
    <nav
      className="pt-5 max-w-full flex justify-between items-center px-6  lg:flex lg:justify-around lg:px-0 font-plus relative lg:items-center text-white"
      style={{ backgroundColor: '#212548' }}
    >
      {!expand ? (
        <a
          href="#"
          className="self-center ml-2 lg:hidden"
          onClick={() => {
            setExpand(!expand)
          }}
        >
          <BiMenu className="text-5xl" />
        </a>
      ) : (
        <a
          href="#"
          className="self-center text-center lg:hidden fixed left-[80%] z-50 rounded-full ml-3 bg-gray-900 px-2 py-2"
          onClick={() => {
            setExpand(!expand)
          }}
        >
          <MdClose className="text-4xl text-white" />
        </a>
      )}
      <div className="flex justify-between w-[200px] -order-1 lg:w-72">
        <div className="flex items-start justify-start space-x-2 w-auto cursor-pointer">
          <Link
            href="/"
            onClick={() => {
              setExpand(!expand)
            }}
          >
            <Image src={logo} alt="logo" className="rounded" />
          </Link>
        </div>
      </div>
      <ul className="hidden lg:flex justify-around items-center basis-2/5 text-lg">
        <Link href="/Explorer">
          <div className="cursor-pointer relative group py-0.5 px-0.5 ">
            <button className="relative group-hover:border-t-2 border-[#fff] py-1 transition-all uppercase">
              Explorer
            </button>
          </div>
        </Link>
        <Link href="/Deployer">
          <div className="cursor-pointer relative group py-0.5 px-0.5 ">
            <button className="relative group-hover:border-t-2 border-[#fff] py-1 transition-all uppercase">
              Deployer
            </button>
          </div>
        </Link>
        <Link href="/Verify">
          <div className="cursor-pointer relative group py-0.5 px-0.5 ">
            <button className="relative group-hover:border-t-2 border-[#fff] py-1 transition-all uppercase">
              Verifier
            </button>
          </div>
        </Link>
      </ul>
      <div className="hidden lg:flex items-center">
        {wallet ? (
          <button className="relative group-hover:border-t-2 border-[#fff] py-1 transition-all uppercase">
            {wallet.substring(0, 6)}...
            {wallet.substring(wallet.length - 4, wallet.length)}
          </button>
        ) : (
          <button
            className="relative group-hover:border-t-4 border-[#fff] py-1 transition-all uppercase"
            onClick={() => connectWallet()}
          >
            Connect Wallet
          </button>
        )}
      </div>

      <div className="hidden lg:flex items-center">
        {!user?.loggedIn && (
          <button
            className="relative group-hover:border-t-4 border-[#fff] py-1 transition-all uppercase"
            onClick={onClickDisconnect}
          >
            Log In with Flow
          </button>
        )}
      </div>
      {/* --------------- Mobile and Tablets --------------- */}
      {/* ------------- Transition for Mobile Menu -------------- */}
      <Transition
        show={expand}
        enter="transition ease-out duration-1000 transform"
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in-out duration-1000 transform"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
        className="lg:hidden w-screen h-screen fixed overflow-y left-0 top-0 z-10"
      >
        <div
          className="lg:hidden flex flex-col items-center h-full px-4 w-full bg-[#121212] py-10 md:px-8"
          id="mobile-menu"
        >
          <div className="flex justify-center space-x-2 items-center w-auto mb-24">
            <Link
              href="/"
              onClick={() => {
                setExpand(!expand)
              }}
            >
              <Image src={logo} width={259} height={180} alt="logo" />
            </Link>
          </div>
          <ul className=" flex flex-col justify-between basis-2/6 items-start mb-6">
            <Link href="/Explorer">
              <button className="cursor-pointer  transition-all text-3xl mb-4">
                EXPLORER
              </button>
            </Link>
            <Link href="/Deployer">
              <button className="cursor-pointer  transition-all text-3xl mb-4">
                DEPLOYER
              </button>
            </Link>
            <Link href="/Verify">
              <button className="cursor-pointer  transition-all text-3xl mb-4">
                VERIFIER
              </button>
            </Link>
          </ul>

          <div className="flex items-center ">
            {wallet ? (
              <button>{wallet}</button>
            ) : (
              <button onClick={() => connectWallet()}>Connect Wallet</button>
            )}
          </div>

          <div className="flex items-center">
            {handleConnectArgent ? (
              <button
                className="relative group-hover:border-t-4 border-[#fff] py-1 transition-all uppercase"
                onClick={() => connectWallet()}
              >
                Connect with Argent
              </button>
            ) : (
              ''
            )}
          </div>
        </div>
      </Transition>
    </nav>
  )
}

export default Navbar
