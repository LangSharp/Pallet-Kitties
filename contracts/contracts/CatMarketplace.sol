// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract CatMarketplace {
    struct Listing {
        address seller;
        uint256 price;
        bool active;
    }
    
    mapping(address => mapping(uint256 => Listing)) public listings;
    mapping(address => uint256[]) public userListedTokens;
    
    event Listed(address indexed nftContract, uint256 indexed tokenId, address seller, uint256 price);
    event Unlisted(address indexed nftContract, uint256 indexed tokenId, address seller);
    event Sold(address indexed nftContract, uint256 indexed tokenId, address buyer, address seller, uint256 price);
    
    function listNFT(address nftContract, uint256 tokenId, uint256 price) public {
        IERC721 nft = IERC721(nftContract);
        require(nft.ownerOf(tokenId) == msg.sender, "Not the owner");
        require(price > 0, "Price must be greater than 0");
        
        nft.transferFrom(msg.sender, address(this), tokenId);
        
        listings[nftContract][tokenId] = Listing({
            seller: msg.sender,
            price: price,
            active: true
        });
        
        userListedTokens[msg.sender].push(tokenId);
        
        emit Listed(nftContract, tokenId, msg.sender, price);
    }
    
    function buyNFT(address nftContract, uint256 tokenId) public payable {
        Listing storage listing = listings[nftContract][tokenId];
        require(listing.active, "Not listed for sale");
        require(msg.value >= listing.price, "Insufficient payment");
        
        IERC721 nft = IERC721(nftContract);
        address seller = listing.seller;
        
        nft.transferFrom(address(this), msg.sender, tokenId);
        
        payable(seller).transfer(listing.price);
        
        listing.active = false;
        
        emit Sold(nftContract, tokenId, msg.sender, seller, listing.price);
    }
    
    function unlistNFT(address nftContract, uint256 tokenId) public {
        Listing storage listing = listings[nftContract][tokenId];
        require(listing.seller == msg.sender, "Not the seller");
        require(listing.active, "Not listed");
        
        IERC721 nft = IERC721(nftContract);
        nft.transferFrom(address(this), msg.sender, tokenId);
        
        listing.active = false;
        
        emit Unlisted(nftContract, tokenId, msg.sender);
    }
    
    function getListing(address nftContract, uint256 tokenId) public view returns (Listing memory) {
        return listings[nftContract][tokenId];
    }
    
    function getUserListings(address user) public view returns (uint256[] memory) {
        return userListedTokens[user];
    }
}
