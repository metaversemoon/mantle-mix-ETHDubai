import React, { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import Input from '@/components/Input'
import Footer from '@/components/Footer'
import ReturnedFunction from '@/components/ReturnedFunction'
import {
  analyzeABI,
  contractDataType,
  functionType,
} from '@/functionality/analyzeABI'
import { Registery_ABI, Registery_address } from '@/constants/constants'
import { useAccount, useContract, useProvider } from 'wagmi'
import { Contract, Wallet } from 'ethers'
import { storeContract } from '@/functionality/storeData'
import { explorerLink } from '@/constants/constants'
import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import ReturnedSourceCode from '@/components/ReturnedSourceCode'
import * as fcl from '@onflow/fcl'

const private_key = process.env.NEXT_PUBLIC_PRIVATE_KEY

const Explorer = ({ wallet, provider, signer, connectWallet }) => {
  const router = useRouter()

  const [readFunctions, setReadFunctions] = useState('')
  const [writeFunctions, setWriteFunctions] = useState('')
  const [showType, setShowType] = useState('')
  const [constructors, setConstructors] = useState('')
  const [contractExists, setContractExists] = useState()
  const [contractData, setContractData] = useState()
  const [contractAddress, setContractAddress] = useState('')
  const [ipfsURI, setIpfsURI] = useState('')
  const [isReadActive, setIsReadActive] = useState(false)
  const [isWriteActive, setIsWriteActive] = useState(false)
  const [isSourceCodeActive, setIsSourceCodeActive] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [tx, setTx] = useState('')

  const { address } = useAccount('')
  // const provider = useProvider('')
  const Registery_Contract = useContract({
    address: Registery_address,
    abi: Registery_ABI,
    signerOrProvider: provider,
  })
  const toast = useToast()
  useEffect(() => {
    const queryAddress = router.query.address
    if (queryAddress) {
      setContractAddress(queryAddress)
    }
  }, [router.query])

  async function searchContract() {
    if (!contractAddress) return
    try {
      const response = await Registery_Contract?.getContractRecord(
        contractAddress,
      )
      toast({
        title: 'Address fetched!!!',
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
      if (!response) {
        toast({
          title: 'Contract does not exist',
          description: 'This contract does not exist in our registry',
          status: 'error',
          duration: 2000,
          isClosable: true,
        })
        // console.log("Contract does not exist");
        setContractExists(false)
        return
        /// notify that Contract doesnot Exists
      }
      setIpfsURI(response)
      setContractExists(true)
      fetchContractData(response)
    } catch (error) {
      toast({
        title: `${error.reason}`,
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
      console.log(error)
    }
  }

  async function fetchContractData(ipfsURL) {
    const contractData = await (await fetch(ipfsURL)).json()
    // contractData
    //  console.log(contractData);

    if (!contractData) {
      toast({
        title: 'Contract Data not found',
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
      // console.log("Contract Data not found");
      return
    }
    /// has bytecode , abi , code
    setContractData(contractData)
    setShowType('source')
    setIsSourceCodeActive(true)
    setIsReadActive(false)
    setIsWriteActive(false)
    getData(contractData.abi)
    //set default to the contract Tab and show all the data there
  }

  const addTask = async (fullUrl) => {
    const transactionId = await fcl.mutate({
      cadence: `
        import TasksList from 0xDeployer
        transaction(newURL: String) {
          prepare(signer: AuthAccount) {
          }
          execute {
            TasksList.addTask(newURL: newURL)
          }
        }
        `,
      args: (arg, t) => [arg(fullUrl, t.String)],
      proposer: fcl.authz,
      payer: fcl.authz,
      authorizations: [fcl.authz],
      limit: 999,
    })

    console.log('Transaction Id IS THIS ONE', transactionId)
    if (transactionId) {
      const txLink = `https://flow-view-source.com/testnet/tx/${transactionId}`
      setTx(txLink)
      setLoading(false)
      toast({
        title: 'Task creation success!',
        description: "We've successfully created your quest task.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  /// issue with the ABI type
  async function getData(abi) {
    const data = await analyzeABI(abi)
    // console.log(data);
    setReadFunctions(data?.read)
    setWriteFunctions(data?.write)

    console.log(data, 'getData')
  }
  console.log(contractData)
  // now handle for the contract that does not exists
  // send the user to deploy page but with a contractAddress , so that it will not deploy the contract again and verify the contract

  return (
    <main className="bg-black min-h-[100vh]">
      <Navbar connectWallet={connectWallet} wallet={wallet} />
      <h1 className="bg-black text-white text-center text-3xl sm:text-4xl pt-10 pb-14">
        Explore here
      </h1>
      <div className="mx-auto max-w-xl mb-10 px-4">
        <p className="pb-3 text-white text-xl">Paste Contract Address here</p>
        <Input
          input={contractAddress}
          setInput={setContractAddress}
          search={searchContract}
        />
        <div className="flex justify-evenly py-10">
          <button
            className={`text-white text-lg focus:border-t-2 ${
              isReadActive ? 'border-t-2' : 'none'
            }`}
            onClick={() => {
              setShowType('read')
              setIsReadActive(true)
              setIsWriteActive(false)
              setIsSourceCodeActive(false)
              // call flow
              addTask(
                'https://bafkreif4gwfu5eblik4moipyhqvhzmsb2tnx5sqylqvxntzyhydhqvhl3a.ipfs.w3s.link/',
              )
            }}
          >
            Read Contract
          </button>
          <button
            className={`text-white text-lg focus:border-t-2 ${
              isWriteActive ? 'border-t-2' : 'none'
            }`}
            onClick={() => {
              setShowType('write')
              setIsWriteActive(true)
              setIsReadActive(false)
              setIsSourceCodeActive(false)
              //LLL
            }}
          >
            Write Contract
          </button>
          <button
            className={`text-white text-lg focus:border-t-2 ${
              isSourceCodeActive ? 'border-t-2' : 'none'
            }`}
            onClick={() => {
              setShowType('source')
              setIsSourceCodeActive(true)
              setIsReadActive(false)
              setIsWriteActive(false)
            }}
          >
            Source Code
          </button>
        </div>
      </div>

      {showType == 'read' && (
        <div className="flex items-center justify-evenly flex-wrap">
          {readFunctions &&
            readFunctions.map((readFunction, key) => {
              return (
                <ReturnedFunction
                  functionData={readFunction}
                  key={key}
                  contractAddress={contractAddress}
                  wallet={wallet}
                  provider={provider}
                  signer={signer}
                />
              )
            })}
        </div>
      )}

      {isLoading ? (
        <div className="">
          <div role="status">
            <svg
              aria-hidden="true"
              class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
          <p>Uploading....</p>
        </div>
      ) : (
        ''
      )}

      {tx && (
        <div
          style={{
            backgroundColor: 'white',
            color: 'black',
            padding: '3rem',
          }}
        >
          <p
            style={{
              fontSize: '1.2rem',
              color: 'black',
            }}
          >
            🎉 Congratulations... We have successfully created your quest task.
          </p>
          <a
            href={tx}
            target="_blank"
            rel="noreferrer"
            className="pt-4 underline decoration-sky-900"
          >
            See Transaction Details
          </a>
        </div>
      )}

      {showType == 'write' && (
        <div className="flex items-center justify-evenly flex-wrap">
          {writeFunctions &&
            writeFunctions.map((writeFunction, key) => {
              return (
                <ReturnedFunction
                  functionData={writeFunction}
                  signer={signer}
                  provider={provider}
                  key={key}
                  contractAddress={contractAddress}
                />
              )
            })}
        </div>
      )}
      {showType == 'source' && (
        <div>
          {contractData && (
            <div>
              <ReturnedSourceCode sourceCode={contractData.code} />
            </div>
          )}
        </div>
      )}
      <Footer />
    </main>
  )
}

export default Explorer
