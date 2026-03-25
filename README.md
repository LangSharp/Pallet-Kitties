# CatFi - NFT Marketplace on Avalanche

NFT Marketplace for Cat Images on Avalanche Blockchain with Core Wallet integration.

## Features

- **Core Wallet Integration** - Connect seamlessly with Avalanche's native wallet
- **NFT Minting** - Create unique cat NFTs with custom traits
- **Marketplace** - Buy and sell cat NFTs
- **Avalanche Network** - Fast transactions with low fees on Fuji testnet

## Tech Stack

- **Frontend**: React + ethers.js
- **Smart Contracts**: Solidity + Hardhat
- **Blockchain**: Avalanche C-Chain

## Project Structure

```
cat-marketplace/
├── contracts/                    # Smart Contracts (Solidity)
│   ├── contracts/
│   │   ├── CatNFT.sol          # ERC-721 NFT contract for cats
│   │   └── CatMarketplace.sol  # Marketplace contract
│   ├── scripts/
│   │   └── deploy.js           # Deployment script
│   ├── hardhat.config.js
│   └── package.json
└── frontend/                    # React Frontend
    ├── src/
    │   ├── App.js              # Main application
    │   ├── index.js            # Entry point
    │   └── index.css          # Styles
    ├── public/
    └── package.json
```

## Getting Started

### Frontend

```bash
cd frontend
npm install
npm start
```

### Smart Contracts

```bash
cd contracts
npm install
cp .env.example .env
# Edit .env with your PRIVATE_KEY
npx hardhat compile
npx hardhat run scripts/deploy.js --network fuji
```

## Networks

- **Fuji Testnet**: https://testnet.snowtrace.io
- **Mainnet**: https://snowtrace.io
