// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ICTopEmployeesNFT is Ownable, ERC721URIStorage {
    uint256 public tokenId;
    constructor() ERC721("ICTopEmployeesNFT", "TOP") {
        tokenId = 0;
    }

    function mintToken(address recipient, string calldata tokenURI) public onlyOwner {
        require(owner()!=recipient, "Recipient cannot be the owner of the contract");
        _safeMint(recipient, ++tokenId);
        _setTokenURI(tokenId, tokenURI);
    }
}

