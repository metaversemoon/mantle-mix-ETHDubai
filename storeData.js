import { Web3Storage } from 'web3.storage'

// const WEB3STORAGE_TOKEN = process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN
const WEB3STORAGE_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGMwOThmYkQyQzM3ZEY0YjI1N2UzYWNDMjdCMzgyNDg3ZWE3NWM1NjUiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Njg4OTQ4MzYyMjIsIm5hbWUiOiJwZWVyIn0.oKZ_ltLB-flCrHyOePGFz5ns2ofm3_8lA0rdqQ3rYoE'

function getAccessToken() {
  return WEB3STORAGE_TOKEN
}

function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() })
}

export const storeContract = async (obj) => {
  const blob = new Blob([JSON.stringify(obj)], { type: 'application/json' })
  const files = [new File([blob], 'contract.json')]
  console.log('Uploading the Contract data to IPFS via web3.storage')
  const client = makeStorageClient()
  const cid = await client.put(files, {
    wrapWithDirectory: false,
  })
  console.log('stored files with cid:', cid)
  return cid
}
