# CatFi - NFT Marketplace Configuration

## Contract Addresses (Anvil Local Node)

### Avalanche Fuji Testnet Configuration
- **Network Name**: Avalanche Fuji C-Chain
- **Chain ID**: 43113 (0xa869)
- **RPC URL**: https://api.avax-test.network/ext/bc/C/rpc
- **Block Explorer**: https://testnet.snowtrace.io

## Deployed Contracts

### CatNFT
- **Contract Address**: `0x6CB33613E705825AA5e9C58b84dC9305347D203A`
- **Transaction Hash**: `0xa182746b8ed869e3df1f84bd83e4b9190127428eb09dc9b5d021f251f7f39d65`
- **Deployer**: `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`

### CatMarketplace
- **Contract Address**: `0x1428eE115b66d4CD2EBd41aD6670125562ee654e`
- **Transaction Hash**: `0xe2ec0ee6ec1ddb32aafe48228eb65a2e84c8e634390c1884faa55a5452183c6e`
- **Deployer**: `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`

## Wallet Configuration

### CatFi Wallet (Test)
- **Address**: `0xD7b0de549ffF52EDC0b67f2Caaee5b3bAA7bCA09`
- **Private Key**: `0x49565dc8aeff3bdf910b6fb289b63b7d31b15f63d3951401b0e7d907e5c7802d`
- **Balance**: Pending faucet funding

### Anvil Dev Wallet #0
- **Address**: `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`
- **Private Key**: `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`
- **Balance**: 10000 ETH (dev only)

## Contract ABIs

### CatNFT ABI
```json
[
  {
    "type": "constructor",
    "inputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "mintCat",
    "inputs": [
      {"name": "name", "type": "string"},
      {"name": "imageURI", "type": "string"},
      {"name": "cuteness", "type": "uint8"},
      {"name": "color", "type": "string"}
    ],
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "getCat",
    "inputs": [{"name": "tokenId", "type": "uint256"}],
    "outputs": [{
      "type": "tuple",
      "components": [
        {"name": "name", "type": "string"},
        {"name": "imageURI", "type": "string"},
        {"name": "cuteness", "type": "uint8"},
        {"name": "color", "type": "string"},
        {"name": "price", "type": "uint256"}
      ]
    }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getTotalCats",
    "inputs": [],
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view"
  }
]
```

### CatMarketplace ABI
```json
[
  {
    "type": "function",
    "name": "listNFT",
    "inputs": [
      {"name": "nftContract", "type": "address"},
      {"name": "tokenId", "type": "uint256"},
      {"name": "price", "type": "uint256"}
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "buyNFT",
    "inputs": [
      {"name": "nftContract", "type": "address"},
      {"name": "tokenId", "type": "uint256"}
    ],
    "outputs": [],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "getListing",
    "inputs": [
      {"name": "nftContract", "type": "address"},
      {"name": "tokenId", "type": "uint256"}
    ],
    "outputs": [
      {"name": "seller", "type": "address"},
      {"name": "price", "type": "uint256"},
      {"name": "active", "type": "bool"}
    ],
    "stateMutability": "view"
  }
]
```

## Frontend Configuration

Update `frontend/src/config.js` or environment variables:

```javascript
export const CONFIG = {
  CAT_NFT_ADDRESS: '0x6CB33613E705825AA5e9C58b84dC9305347D203A',
  MARKETPLACE_ADDRESS: '0x1428eE115b66d4CD2EBd41aD6670125562ee654e',
  CHAIN_ID: '0xa869', // 43113 - Avalanche Fuji
  RPC_URL: 'https://api.avax-test.network/ext/bc/C/rpc'
};
```

## Commands

### Deploy to Fuji Testnet
```bash
cd /home/dotart/cat-nft-marketplace
forge create contracts/contracts/CatNFT.sol:CatNFT \
  --rpc-url https://api.avax-test.network/ext/bc/C/rpc \
  --private-key YOUR_PRIVATE_KEY \
  --broadcast
```

### Verify Contract
```bash
forge verify-contract \
  --chain-id 43113 \
  --num-of-optimizations 200 \
  --constructor-args $(cast abi-encode "constructor()" ) \
  0x6CB33613E705825AA5e9C58b84dC9305347D203A \
  contracts/contracts/CatNFT.sol:CatNFT
```

### Run Tests
```bash
forge test
```

### Interact with Contracts
```bash
# Mint a cat
cast send 0x6CB33613E705825AA5e9C58b84dC9305347D203A \
  "mintCat(string,string,uint8,string)" "Whiskers" "https://placekitten.com/400/400" 95 "Orange" \
  --rpc-url http://localhost:8545 \
  --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

# Get cat info
cast call 0x6CB33613E705825AA5e9C58b84dC9305347D203A \
  "getCat(uint256)(string,string,uint8,string,uint256)" 1 \
  --rpc-url http://localhost:8545
```

## Network Details

### Anvil Local Node
- **RPC URL**: http://localhost:8545
- **Chain ID**: 43113
- **Accounts**: 10 pre-funded accounts with 10000 ETH each

### Avalanche Mainnet
- **Chain ID**: 43114
- **RPC URL**: https://api.avax.network/ext/bc/C/rpc
- **Explorer**: https://snowtrace.io
