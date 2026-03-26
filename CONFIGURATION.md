# CatFi - NFT Marketplace Configuration

## API Configuration

### Avalanche RPC
- **API Key**: `0x8a3a45e125e81a31064ad5c0229509e566585fee78001c1888961e1b5b5e9812`
- **Fuji RPC**: `https://api.avax-test.network/ext/bc/C/rpc?apikey=0x8a3a45e125e81a31064ad5c0229509e566585fee78001c1888961e1b5b5e9812`
- **Mainnet RPC**: `https://api.avax.network/ext/bc/C/rpc?apikey=0x8a3a45e125e81a31064ad5c0229509e566585fee78001c1888961e1b5b5e9812`

## Network Details

### Avalanche Fuji Testnet
- **Chain ID**: 43113 (0xa869)
- **Block Explorer**: https://testnet.snowtrace.io

### Avalanche Mainnet
- **Chain ID**: 43114 (0xa86a)
- **Block Explorer**: https://snowtrace.io

## Deployed Contracts (Anvil - Forked Fuji)

### CatNFT
- **Contract Address**: `0xAf179f782d478D57F16BC67F515BCe9Cbaac9f9D`
- **Transaction Hash**: `0xd2ddecc5168177258e5b8b7340643be5e12ab9d3d9118db9479cbbdfcdf9746a`
- **Deployer**: `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`

### CatMarketplace
- **Contract Address**: `0xd7a3677ED63C043648DAcAf1E3B5A516B63ED0da`
- **Transaction Hash**: `0xc4f7bbd4240586ed42873979eab090a9b3111c144e0a974aaeeb32174880bdce`
- **Deployer**: `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`

## Wallet Configuration

### CatFi Wallet
- **Address**: `0xD7b0de549ffF52EDC0b67f2Caaee5b3bAA7bCA09`
- **Private Key**: `0x49565dc8aeff3bdf910b6fb289b63b7d31b15f63d3951401b0e7d907e5c7802d`

### Anvil Dev Wallet #0
- **Address**: `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`
- **Private Key**: `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`

## Minted NFTs

### Token #1 - Whiskers
- **Name**: Whiskers
- **Image**: https://placekitten.com/400/400
- **Cuteness**: 95%
- **Color**: Orange
- **Price**: 0.01 AVAX

## Foundry Configuration

```toml
[profile.default]
src = "contracts"
out = "out"
libs = ["lib"]
solc = "0.8.19"

[rpc_endpoints]
avalanche = "https://api.avax.network/ext/bc/C/rpc"
fuji = "https://api.avax-test.network/ext/bc/C/rpc?apikey=YOUR_API_KEY"
```

## Commands

### Deploy to Fuji Testnet
```bash
cd /home/dotart/cat-nft-marketplace

# Deploy CatNFT
forge create contracts/contracts/CatNFT.sol:CatNFT \
  --rpc-url "https://api.avax-test.network/ext/bc/C/rpc?apikey=0x8a3a45e125e81a31064ad5c0229509e566585fee78001c1888961e1b5b5e9812" \
  --private-key YOUR_PRIVATE_KEY

# Deploy CatMarketplace
forge create contracts/contracts/CatMarketplace.sol:CatMarketplace \
  --rpc-url "https://api.avax-test.network/ext/bc/C/rpc?apikey=0x8a3a45e125e81a31064ad5c0229509e566585fee78001c1888961e1b5b5e9812" \
  --private-key YOUR_PRIVATE_KEY
```

### Interact with Contracts
```bash
# Mint a cat
cast send CAT_NFT_ADDRESS \
  "mintCat(string,string,uint8,string)" "Whiskers" "https://placekitten.com/400/400" 95 "Orange" \
  --rpc-url "https://api.avax-test.network/ext/bc/C/rpc?apikey=0x8a3a45e125e81a31064ad5c0229509e566585fee78001c1888961e1b5b5e9812" \
  --private-key YOUR_PRIVATE_KEY

# Get cat info
cast call CAT_NFT_ADDRESS \
  "getCat(uint256)" 1 \
  --rpc-url "https://api.avax-test.network/ext/bc/C/rpc?apikey=0x8a3a45e125e81a31064ad5c0229509e566585fee78001c1888961e1b5b5e9812"
```

## Faucet

Para obtener AVAX de prueba en Fuji:
1. Ve a https://core.app/tools/testnet-faucet
2. Conecta tu wallet
3. Solicita AVAX de prueba
