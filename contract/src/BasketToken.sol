// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./interface/IConstant.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";

contract ERC7621 is ERC20 {
    address public owner;
    IUniswapV2Router02 public uniswapRouter =
        IUniswapV2Router02(0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D);
    address public constant WETH = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
    IConstant.BasketInfo[] public listedTokens;

    uint256 public upVotes;
    uint256 public downVotes;
    uint256 public createdAt;

    mapping(address => bool) public votedAddress;

    constructor(
        string memory _name,
        string memory _symbol,
        IConstant.BasketInfo[] memory tokens
    ) ERC20(_name, _symbol) {
        owner = msg.sender;
        _initializeTokens(tokens);
        createdAt = block.timestamp;
    }

    struct ERC7621Data {
        string name;
        string symbol;
        address tokenAddress;
        IConstant.BasketInfo[] basketTokens;
        uint256 upVotes;
        uint256 downVotes;
        uint256 createdAt;
    }

    function _initializeTokens(IConstant.BasketInfo[] memory tokens) internal {
        require(tokens.length > 0, "ERC7621: No tokens provided");
        uint256 totalPercent = 0;
        for (uint256 i = 0; i < tokens.length; i++) {
            require(
                address(tokens[i].addr) != address(0),
                "ERC7621: Invalid token address"
            );
            require(
                tokens[i].percent > 0,
                "ERC7621: Token percent must be greater than 0"
            );
            totalPercent += tokens[i].percent;
            listedTokens.push(tokens[i]);
        }
        require(totalPercent == 100, "ERC7621: Total percentage must be 100");
    }

    function depositBasketToken(address _to) public payable returns (bool) {
        require(msg.value >= 0.01 ether, "ERC7621: Must deposit 0.01 ETH");
        uint256 totalFunds = calculateTotalFunds();
        for (uint256 i = 0; i < listedTokens.length; i++) {
            IConstant.BasketInfo memory token = listedTokens[i];
            uint256 amountToSwap = (msg.value * token.percent) / 100;
            address[] memory path = new address[](2);
            path[0] = WETH;
            path[1] = token.addr;
            uniswapRouter.swapExactETHForTokens{value: amountToSwap}(
                0,
                path,
                address(this),
                block.timestamp
            );
        }
        uint256 userDepositFunds = calculateTotalFunds() - totalFunds;
        uint8 percent = 0;
        if (isZero(totalSupply())) {
            percent = 100;
        } else {
            percent = uint8((userDepositFunds / totalSupply()) * 100);
        }
        uint256 liquidity = (userDepositFunds / 100) * percent;
        _mint(_to, liquidity);
        return true;
    }

    function withdrawBasketToken(address _to) public returns (bool) {
        uint256 _lpValue = balanceOf(_to);
        require(_lpValue > 0, "ERC7621: Insufficient LP Tokens");

        uint256 userSharePercent = (_lpValue / totalSupply()) * 100;

        for (uint256 i = 0; i < listedTokens.length; i++) {
            IConstant.BasketInfo memory token = listedTokens[i];
            uint256 tokenBalance = IERC20(token.addr).balanceOf(address(this));
            uint256 amountToTransfer = (tokenBalance * userSharePercent) / 100;

            IERC20(token.addr).approve(
                address(uniswapRouter),
                amountToTransfer
            );

            address[] memory path = new address[](2);
            path[0] = token.addr;
            path[1] = WETH;

            uniswapRouter.swapExactTokensForETHSupportingFeeOnTransferTokens(
                amountToTransfer,
                0,
                path,
                _to,
                block.timestamp
            );
        }

        _burn(_to, _lpValue);
        return true;
    }

    modifier checkVoter(address voter) {
        require(!votedAddress[voter], "ERC7621: Address has already voted");
        votedAddress[voter] = true;
        _;
    }

    function upVote() public checkVoter(msg.sender) {
        upVotes += 1;
    }

    function downVote() public checkVoter(msg.sender) {
        downVotes += 1;
    }

    function calculateTotalFunds() internal view returns (uint256 totalFunds) {
        for (uint256 i = 0; i < listedTokens.length; i++) {
            totalFunds += IERC20(listedTokens[i].addr).balanceOf(address(this));
        }
    }

    function isZero(uint256 value) internal pure returns (bool) {
        if (value == 0) {
            return true;
        } else {
            return false;
        }
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function getBasketData() public view returns (ERC7621Data memory) {
        return
            ERC7621Data({
                name: name(),
                symbol: symbol(),
                tokenAddress: address(this),
                basketTokens: listedTokens,
                upVotes: upVotes,
                downVotes: downVotes,
                createdAt: createdAt
            });
    }

    // function getUserBasketData(address _user) public view returns ()
}
