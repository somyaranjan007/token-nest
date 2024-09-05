// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

interface IBasketToken {
    function depositBasketToken(address _to) external payable returns (bool);

    function withdrawBasketToken(
        address _to,
        uint256 _lpValue
    ) external returns (bool);

    function vote(bool isUpVote) external;

    function getOwner() external view returns (address);
}
