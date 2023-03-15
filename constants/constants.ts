//  This is with zkSync
export const Registery_address = '0xbCbdF8dE97c7527b01083A1c0Ad6B92C37A7581F'
// export const Registery_address = '0x015A40a60d33Cea1d67F9dcFF77b6C93b8490C26'

//  This is with Mantle
// export const Registery_address = '0x16d7be29ebc6db2e9c92E0Bf1dE5c1cfe6b1AD2a'

// 0xAd495B48D4936f422Ba3f8a8BFA00a533769f01D
// 0xEA3A6Ae619ee3a077964a6661518f702884e266f
// 0x71f5338032576962c55c31ED4cF4688D1a1c6b1A
// 0x7f7825eBE22dCC9b4935848e2b47f79EaF376aD3
// 0x6477223C062b5d8756b4e8d747Ba38E3a9882128
export const explorerLink = 'https://hyperspace.filfox.info/en'

export const Registery_ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_contractAddress',
        type: 'address',
      },
      {
        internalType: 'string',
        name: '_ipfsURI',
        type: 'string',
      },
    ],
    name: 'addContractRecord',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_newManager',
        type: 'address',
      },
    ],
    name: 'setManager',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_manager',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'contractRecord',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_contractAddress',
        type: 'address',
      },
    ],
    name: 'getContractRecord',
    outputs: [
      {
        internalType: 'string',
        name: '_ipfsURI',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'manager',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]
