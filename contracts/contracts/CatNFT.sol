// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CatNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    
    Counters.Counter private _tokenIds;
    
    struct Cat {
        string name;
        string imageURI;
        uint8 cuteness;
        string color;
        uint256 price;
    }
    
    mapping(uint256 => Cat) public cats;
    mapping(uint256 => address) public catCreators;
    
    event CatMinted(uint256 tokenId, address creator, string name, uint8 cuteness);
    event CatListed(uint256 tokenId, uint256 price);
    
    constructor() ERC721("CatNFT", "CAT") {}
    
    function mintCat(string memory name, string memory imageURI, uint8 cuteness, string memory color) 
        public 
        returns (uint256) 
    {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        
        _safeMint(msg.sender, newTokenId);
        
        cats[newTokenId] = Cat({
            name: name,
            imageURI: imageURI,
            cuteness: cuteness,
            color: color,
            price: 0.01 ether
        });
        
        catCreators[newTokenId] = msg.sender;
        
        emit CatMinted(newTokenId, msg.sender, name, cuteness);
        
        return newTokenId;
    }
    
    function listCat(uint256 tokenId, uint256 price) public {
        require(ownerOf(tokenId) == msg.sender, "Not the owner");
        cats[tokenId].price = price;
        emit CatListed(tokenId, price);
    }
    
    function getCat(uint256 tokenId) public view returns (Cat memory) {
        return cats[tokenId];
    }
    
    function getCatCreator(uint256 tokenId) public view returns (address) {
        return catCreators[tokenId];
    }
    
    function getTotalCats() public view returns (uint256) {
        return _tokenIds.current();
    }
}
