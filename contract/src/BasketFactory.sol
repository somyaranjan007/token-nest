// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./BasketToken.sol";
import "./interface/IBasketToken.sol";
import "./interface/IConstant.sol";
import "./UserBaskets.sol";

contract BasketFactory {
    address[] public allBasket;
    address[] public allBasketOfBasket;

    mapping(address => address[]) userBaskets;
    mapping(address => address[]) userBasketOfBaskets;

    event CreateBasket(
        address indexed creator,
        address indexed basketAddress,
        string name,
        string symbol,
        IConstant.BasketInfo[] tokens
    );

    event CreateBasketOfBasket(
        address indexed creator,
        address indexed basketOfBasketAddress,
        string name,
        string symbol,
        IConstant.BasketInfo[] baskets
    );

    function createBasket(
        string memory name,
        string memory symbol,
        IConstant.BasketInfo[] memory tokens,
        bool isCreateBasketToken
    ) public payable {
        address basket;
        bytes memory bytecode = getBytecode(
            name,
            symbol,
            tokens,
            isCreateBasketToken
        );
        bytes32 salt = createHash(msg.sender, name, symbol, tokens);
        assembly {
            basket := create2(0, add(bytecode, 0x20), mload(bytecode), salt)
        }
        if (isCreateBasketToken) {
            require(msg.value >= 0.01 ether, "minimum ETH!");
            bool success = IBasketToken(basket).depositBasketToken{
                value: msg.value
            }(msg.sender);
            require(success, "Fund tokens failed");
            allBasket.push(basket);
            userBaskets[msg.sender].push(basket);
            emit CreateBasket(msg.sender, basket, name, symbol, tokens);
        } else {
            allBasketOfBasket.push(basket);
            userBasketOfBaskets[msg.sender].push(basket);
            emit CreateBasketOfBasket(msg.sender, basket, name, symbol, tokens);
        }
    }

    function createHash(
        address owner,
        string memory name,
        string memory symbol,
        IConstant.BasketInfo[] memory tokens
    ) internal pure returns (bytes32) {
        bytes memory data = abi.encodePacked(name, symbol, owner);
        for (uint256 i = 0; i < tokens.length; i++) {
            data = abi.encodePacked(data, tokens[i].addr, tokens[i].percent);
        }
        return keccak256(data);
    }

    function getBytecode(
        string memory name,
        string memory symbol,
        IConstant.BasketInfo[] memory tokens,
        bool isCreateBasketToken
    ) internal pure returns (bytes memory) {
        bytes memory bytecode;
        if (isCreateBasketToken) {
            bytecode = type(ERC7621).creationCode;
        } else {
            bytecode = type(UserBasket).creationCode;
        }
        return abi.encodePacked(bytecode, abi.encode(name, symbol, tokens));
    }

    function getAllBaskets() public view returns (address[] memory) {
        return allBasket;
    }

    function getAllUserBaskets(
        address account
    ) public view returns (address[] memory) {
        return userBaskets[account];
    }

    function getAllUserBasketOfBaskets(
        address account
    ) public view returns (address[] memory) {
        return userBasketOfBaskets[account];
    }
}
