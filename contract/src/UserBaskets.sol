// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./interface/IConstant.sol";
import "./interface/IBasketToken.sol";

contract UserBasket {
    string public name;
    string public symbol;
    address public owner;
    IConstant.BasketInfo[] public listedBasket;
    uint256 public createdAt;

    struct UserBasketOfBasketData {
        string name;
        string symbol;
        uint256 createdAt;
        IConstant.BasketInfo[] basketTokens;
    }

    constructor(
        string memory _name,
        string memory _symbol,
        IConstant.BasketInfo[] memory baskets
    ) {
        name = _name;
        symbol = _symbol;
        owner = msg.sender;
        _initializeBaskets(baskets);
        createdAt = block.timestamp;
    }

    function _initializeBaskets(
        IConstant.BasketInfo[] memory baskets
    ) internal {
        require(baskets.length > 0, "UserBasket: No baskets provided");
        uint256 totalPercent = 0;
        for (uint256 i = 0; i < baskets.length; i++) {
            require(
                address(baskets[i].addr) != address(0),
                "UserBasket: Invalid   basket address"
            );
            require(
                baskets[i].percent > 0,
                "UserBasket: Basket percent must be greater than 0"
            );
            totalPercent += baskets[i].percent;
            listedBasket.push(baskets[i]);
        }
        require(
            totalPercent == 100,
            "UserBasket: Total percentage must be 100"
        );
    }

    function deposit(address _to) public payable {
        require(msg.value >= 0.01 ether, "UserBasket: Must deposit 0.01 ETH");

        for (uint256 i = 0; i < listedBasket.length; i++) {
            IConstant.BasketInfo memory basket = listedBasket[i];
            uint256 investAmountForBasket = (msg.value * basket.percent) / 100;

            IBasketToken(basket.addr).depositBasketToken{
                value: investAmountForBasket
            }(_to);
        }
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function getUserBasketOfBasketData()
        public
        view
        returns (UserBasketOfBasketData memory)
    {
        return
            UserBasketOfBasketData({
                name: name,
                symbol: symbol,
                createdAt: createdAt,
                basketTokens: listedBasket
            });
    }
}
