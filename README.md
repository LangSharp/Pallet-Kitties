cat-marketplace/
├── contracts/                    # Smart Contracts (Solidity)
│   ├── contracts/
│   │   ├── CatNFT.sol          # ERC-721 NFT contract for cats
│   │   └── CatMarketplace.sol  # Marketplace contract
│   ├── scripts/
│   │   └── deploy.js           # Deployment script
│   ├── hardhat.config.js
│   ├── package.json
│   └── .env.example
└── frontend/                    # Frontend (ClojureScript)
    ├── src/main/cat_marketplace/
    │   ├── core.cljs            # Main entry point
    │   ├── components/
    │   │   ├── header.cljs
    │   │   ├── marketplace.cljs
    │   │   └── mint_form.cljs
    │   ├── state/
    │   │   └── store.cljs       # Re-frame state management
    │   └── utils/
    │       └── wallet.cljs      # Core Wallet integration
    ├── public/
    │   └── index.html
    ├── shadow-cljs.edn
    └── package.json
