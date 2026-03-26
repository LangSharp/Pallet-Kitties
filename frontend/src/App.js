import React, { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';

const CONFIG = {
  CAT_NFT_ADDRESS: '0xAf179f782d478D57F16BC67F515BCe9Cbaac9f9D',
  MARKETPLACE_ADDRESS: '0xd7a3677ED63C043648DAcAf1E3B5A516B63ED0da',
  CHAIN_ID: '0xa869',
  RPC_URL: 'https://api.avax-test.network/ext/bc/C/rpc'
};

const ABI = {
  catNft: [
    "function mintCat(string memory name, string memory imageURI, uint8 cuteness, string memory color) public returns (uint256)",
    "function getCat(uint256 tokenId) public view returns (string memory name, string memory imageURI, uint8 cuteness, string memory color, uint256 price)",
    "function getTotalCats() public view returns (uint256)",
    "function ownerOf(uint256 tokenId) public view returns (address)"
  ],
  marketplace: [
    "function listNFT(address nftContract, uint256 tokenId, uint256 price) public",
    "function buyNFT(address nftContract, uint256 tokenId) public payable"
  ]
};

const SAMPLE_CATS = [
  { id: 1, name: 'Whiskers', image: 'https://placekitten.com/400/400', cuteness: 98, color: 'Orange Tabby', price: 0.5 },
  { id: 2, name: 'Luna', image: 'https://placekitten.com/401/401', cuteness: 95, color: 'Black Panther', price: 0.8 },
  { id: 3, name: 'Mochi', image: 'https://placekitten.com/402/402', cuteness: 92, color: 'White Snow', price: 0.35 },
  { id: 4, name: 'Shadow', image: 'https://placekitten.com/403/403', cuteness: 89, color: 'Gray Smoke', price: 0.25 },
  { id: 5, name: 'Ginger', image: 'https://placekitten.com/404/404', cuteness: 96, color: 'Ginger Bread', price: 0.45 },
  { id: 6, name: 'Snowball', image: 'https://placekitten.com/405/405', cuteness: 94, color: 'Pure White', price: 0.55 },
  { id: 7, name: 'Felix', image: 'https://placekitten.com/406/406', cuteness: 91, color: 'Calico', price: 0.4 },
  { id: 8, name: 'Cleo', image: 'https://placekitten.com/407/407', cuteness: 93, color: 'Tuxedo', price: 0.38 },
];

const FEATURES = [
  { icon: '⚡', title: 'Lightning Fast', description: 'Powered by Avalanche blockchain for instant transactions with minimal fees' },
  { icon: '🔐', title: 'Secure Ownership', description: 'Your cat NFTs are secured on-chain with true ownership via Core Wallet' },
  { icon: '🎨', title: 'Unique Traits', description: 'Each cat has unique cuteness ratings and characteristics' },
  { icon: '🌐', title: 'Decentralized', description: 'Fully decentralized marketplace running on Avalanche C-Chain' },
  { icon: '💎', title: 'Rare Collection', description: 'Collect and trade rare cat NFTs from the community' },
  { icon: '🚀', title: 'Easy Minting', description: 'Create your own cat NFTs in seconds with simple steps' },
];

function App() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [balance, setBalance] = useState(null);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const checkWalletConnection = useCallback(async () => {
    if (window.avalanche) {
      try {
        const accounts = await window.avalanche.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          const address = accounts[0];
          const provider = new ethers.providers.Web3Provider(window.avalanche);
          const balanceWei = await provider.getBalance(address);
          const balanceAvax = ethers.utils.formatEther(balanceWei);
          setWalletAddress(address);
          setBalance(parseFloat(balanceAvax).toFixed(4));
        }
      } catch (error) {
        console.error('Error checking wallet:', error);
      }
    }
  }, []);

  useEffect(() => {
    checkWalletConnection();
    
    if (window.avalanche) {
      window.avalanche.on('accountsChanged', (accounts) => {
        if (accounts.length === 0) {
          setWalletAddress(null);
          setBalance(null);
        } else {
          checkWalletConnection();
        }
      });
    }
  }, [checkWalletConnection]);

  const connectWallet = async (walletType) => {
    setIsLoading(true);
    
    try {
      if (walletType === 'core') {
        if (!window.avalanche) {
          window.open('https://core.app/', '_blank');
          setNotification({ type: 'error', message: 'Please install Core Wallet extension' });
          setIsLoading(false);
          return;
        }
        
        await window.avalanche.request({ method: 'eth_requestAccounts' });
        await switchToFuji();
        
        const accounts = await window.avalanche.request({ method: 'eth_accounts' });
        const address = accounts[0];
        
        const provider = new ethers.providers.Web3Provider(window.avalanche);
        const balanceWei = await provider.getBalance(address);
        const balanceAvax = ethers.utils.formatEther(balanceWei);
        
        setWalletAddress(address);
        setBalance(parseFloat(balanceAvax).toFixed(4));
        setShowWalletModal(false);
        setNotification({ type: 'success', message: 'Wallet connected successfully!' });
      } else if (walletType === 'metamask') {
        if (!window.ethereum) {
          window.open('https://metamask.io/', '_blank');
          setNotification({ type: 'error', message: 'Please install MetaMask' });
          setIsLoading(false);
          return;
        }
        
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        await switchToFuji();
        
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        const balanceWei = await provider.getBalance(address);
        const balanceAvax = ethers.utils.formatEther(balanceWei);
        
        setWalletAddress(address);
        setBalance(parseFloat(balanceAvax).toFixed(4));
        setShowWalletModal(false);
        setNotification({ type: 'success', message: 'Wallet connected successfully!' });
      }
    } catch (error) {
      console.error('Connection error:', error);
      setNotification({ type: 'error', message: 'Failed to connect wallet' });
    }
    
    setIsLoading(false);
  };

  const switchToFuji = async () => {
    const fujiParams = {
      chainId: '0xa869',
      chainName: 'Avalanche Fuji C-Chain',
      rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
      blockExplorerUrls: ['https://testnet.snowtrace.io'],
      nativeCurrency: {
        name: 'AVAX',
        symbol: 'AVAX',
        decimals: 18,
      },
    };

    const provider = window.avalanche || window.ethereum;
    
    try {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0xa869' }],
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await provider.request({
            method: 'wallet_addEthereumChain',
            params: [fujiParams],
          });
        } catch (addError) {
          console.error('Error adding network:', addError);
        }
      }
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    setBalance(null);
    setNotification({ type: 'info', message: 'Wallet disconnected' });
  };

  const buyCat = async (cat) => {
    if (!walletAddress) {
      setShowWalletModal(true);
      return;
    }
    
    setIsLoading(true);
    setNotification({ type: 'info', message: `Purchasing ${cat.name}...` });
    
    setTimeout(() => {
      setIsLoading(false);
      setNotification({ type: 'success', message: `${cat.name} purchased successfully! 🎉` });
    }, 2000);
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="navbar">
        <a href="#" className="logo">
          <span className="logo-icon">🐱</span>
          <span>CatFi</span>
        </a>
        
        <ul className="nav-links">
          <li><a href="#features">Features</a></li>
          <li><a href="#cats">Collectibles</a></li>
          <li><a href="#how-it-works">How It Works</a></li>
          <li><a href="#stats">Stats</a></li>
        </ul>
        
        <div className="nav-actions">
          {walletAddress ? (
            <div className="wallet-connected">
              <span className="wallet-address">{formatAddress(walletAddress)}</span>
              <span className="wallet-balance">{balance} AVAX</span>
              <button className="btn btn-secondary" onClick={disconnectWallet}>
                Disconnect
              </button>
            </div>
          ) : (
            <button className="btn btn-primary" onClick={() => setShowWalletModal(true)}>
              Connect Wallet
            </button>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="floating-cats">
          <span className="floating-cat" style={{ top: '20%', left: '10%', animationDelay: '0s' }}>🐱</span>
          <span className="floating-cat" style={{ top: '60%', left: '85%', animationDelay: '5s' }}>😺</span>
          <span className="floating-cat" style={{ top: '30%', left: '75%', animationDelay: '10s' }}>🐈</span>
          <span className="floating-cat" style={{ top: '70%', left: '5%', animationDelay: '15s' }}>😸</span>
        </div>
        
        <div className="hero-content">
          <div className="hero-badge">
            <span>●</span> Powered by Avalanche Network
          </div>
          
          <h1>
            The Purrfect<br />
            <span className="gradient-text">NFT Marketplace</span>
          </h1>
          
          <p className="hero-subtitle">
            Discover, collect, and trade unique cat NFTs on the fastest blockchain. 
            Built on Avalanche with seamless Core Wallet integration.
          </p>
          
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => setShowWalletModal(true)}>
              🚀 Start Collecting
            </button>
            <a href="#cats" className="btn btn-secondary">
              Browse Cats
            </a>
          </div>
          
          <div className="hero-stats">
            <div className="stat">
              <div className="stat-value">12K+</div>
              <div className="stat-label">Cats Collected</div>
            </div>
            <div className="stat">
              <div className="stat-value">5.2K</div>
              <div className="stat-label">Active Collectors</div>
            </div>
            <div className="stat">
              <div className="stat-value">$2.1M</div>
              <div className="stat-label">Total Volume</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cats */}
      <section className="featured" id="cats">
        <div className="section-header">
          <h2>Featured Cats 🐱</h2>
          <p>Discover the most adorable cat collectibles on Avalanche</p>
        </div>
        
        <div className="featured-grid">
          {SAMPLE_CATS.map((cat) => (
            <div key={cat.id} className="cat-card">
              <div className="cat-card-image">
                <img src={cat.image} alt={cat.name} />
                <div className="cuteness-badge">{cat.cuteness}%</div>
              </div>
              <div className="cat-card-content">
                <h3>{cat.name}</h3>
                <span className="color-tag">{cat.color}</span>
                <div className="price">
                  <span>{cat.price} AVAX</span>
                  <button 
                    className="btn btn-primary" 
                    onClick={() => buyCat(cat)}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Loading...' : 'Buy Now'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="features" id="features">
        <div className="features-container">
          <div className="section-header">
            <h2>Why Choose CatFi? ✨</h2>
            <p>The ultimate platform for cat lovers and NFT collectors</p>
          </div>
          
          <div className="features-grid">
            {FEATURES.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works" id="how-it-works">
        <div className="section-header">
          <h2>How It Works 🔥</h2>
          <p>Get started in three simple steps</p>
        </div>
        
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Connect Wallet</h3>
            <p>Connect your Core Wallet or MetaMask to the Avalanche network</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Mint or Buy</h3>
            <p>Create your own unique cat NFT or buy from the marketplace</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Collect & Trade</h3>
            <p>Build your collection and trade with other collectors</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section" id="stats">
        <div className="stats-container">
          <div className="stats-grid">
            <div className="stats-card">
              <div className="icon">🐱</div>
              <div className="value">12,847</div>
              <div className="label">Total Cats Minted</div>
            </div>
            <div className="stats-card">
              <div className="icon">👥</div>
              <div className="value">5,234</div>
              <div className="label">Unique Holders</div>
            </div>
            <div className="stats-card">
              <div className="icon">💰</div>
              <div className="value">$2.1M</div>
              <div className="label">Trading Volume</div>
            </div>
            <div className="stats-card">
              <div className="icon">⚡</div>
              <div className="value">0.5s</div>
              <div className="label">Avg Transaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Join the Cat Revolution? 🚀</h2>
          <p>Connect your wallet and start collecting adorable cat NFTs today!</p>
          <button className="btn btn-glow" onClick={() => setShowWalletModal(true)}>
            Connect Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>🐱 CatFi</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              The purrfect NFT marketplace on Avalanche blockchain.
            </p>
          </div>
          <div className="footer-section">
            <h4>Marketplace</h4>
            <ul>
              <li><a href="#cats">Browse Cats</a></li>
              <li><a href="#">Sell NFTs</a></li>
              <li><a href="#">Create NFT</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Resources</h4>
            <ul>
              <li><a href="#">Documentation</a></li>
              <li><a href="#">Smart Contracts</a></li>
              <li><a href="#">API</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Community</h4>
            <ul>
              <li><a href="#">Discord</a></li>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">Telegram</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 CatFi. Built on Avalanche Network. All rights reserved.</p>
        </div>
      </footer>

      {/* Wallet Modal */}
      {showWalletModal && (
        <div className="modal-overlay" onClick={() => setShowWalletModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowWalletModal(false)}>
              ✕
            </button>
            <h2>Connect Your Wallet</h2>
            <p>Choose your preferred wallet to start collecting</p>
            
            <div className="wallet-options">
              <button className="wallet-option" onClick={() => connectWallet('core')} disabled={isLoading}>
                <span className="icon">🔷</span>
                <div className="info">
                  <h4>Core Wallet</h4>
                  <p>Avalanche's native wallet</p>
                </div>
              </button>
              <button className="wallet-option" onClick={() => connectWallet('metamask')} disabled={isLoading}>
                <span className="icon">🦊</span>
                <div className="info">
                  <h4>MetaMask</h4>
                  <p>Popular Ethereum wallet</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification Toast */}
      {notification && (
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          background: notification.type === 'error' ? 'rgba(255, 45, 117, 0.9)' : 
                      notification.type === 'success' ? 'rgba(0, 240, 255, 0.9)' :
                      'rgba(255, 255, 255, 0.9)',
          color: notification.type === 'info' ? '#333' : '#fff',
          padding: '1rem 2rem',
          borderRadius: '12px',
          fontWeight: '600',
          zIndex: 3000,
          animation: 'fadeInUp 0.3s ease-out',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
        }}>
          {notification.message}
        </div>
      )}
    </div>
  );
}

export default App;
