# Uniswap V2 Technical Overview

## Core Contracts

### UniswapV2Factory

```solidity
function createPair(address tokenA, address tokenB) external returns (address pair)
```

- Creates new trading pair
- Emits `PairCreated` event

### UniswapV2Pair

```solidity
function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external
function mint(address to) external returns (uint liquidity)
function burn(address to) external returns (uint amount0, uint amount1)
```

Key variables:
```solidity
uint public constant MINIMUM_LIQUIDITY = 10**3;
uint112 private reserve0;
uint112 private reserve1;
uint32  private blockTimestampLast;
```

### UniswapV2Router02

```solidity
function swapExactTokensForTokens(
    uint amountIn,
    uint amountOutMin,
    address[] calldata path,
    address to,
    uint deadline
) external returns (uint[] memory amounts)

function addLiquidity(
    address tokenA,
    address tokenB,
    uint amountADesired,
    uint amountBDesired,
    uint amountAMin,
    uint amountBMin,
    address to,
    uint deadline
) external returns (uint amountA, uint amountB, uint liquidity)
```

## Key Concepts

1. **Constant Product Formula**: `x * y = k`
2. **Flash Swaps**: Borrow without upfront collateral
3. **Price Oracle**: TWAP calculations
4. **LP Tokens**: Represent liquidity share
5. **Reentrancy Protection**: `lock` modifier
6. **Minimum Liquidity**: Prevent division by zero

## Swap Function Deep Dive

```solidity
function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external lock {
    require(amount0Out > 0 || amount1Out > 0, 'UniswapV2: INSUFFICIENT_OUTPUT_AMOUNT');
    (uint112 _reserve0, uint112 _reserve1,) = getReserves();
    require(amount0Out < _reserve0 && amount1Out < _reserve1, 'UniswapV2: INSUFFICIENT_LIQUIDITY');

    uint balance0;
    uint balance1;
    { // scope for _token{0,1}, avoids stack too deep errors
    address _token0 = token0;
    address _token1 = token1;
    require(to != _token0 && to != _token1, 'UniswapV2: INVALID_TO');
    if (amount0Out > 0) _safeTransfer(_token0, to, amount0Out);
    if (amount1Out > 0) _safeTransfer(_token1, to, amount1Out);
    if (data.length > 0) IUniswapV2Callee(to).uniswapV2Call(msg.sender, amount0Out, amount1Out, data);
    balance0 = IERC20(_token0).balanceOf(address(this));
    balance1 = IERC20(_token1).balanceOf(address(this));
    }
    uint amount0In = balance0 > _reserve0 - amount0Out ? balance0 - (_reserve0 - amount0Out) : 0;
    uint amount1In = balance1 > _reserve1 - amount1Out ? balance1 - (_reserve1 - amount1Out) : 0;
    require(amount0In > 0 || amount1In > 0, 'UniswapV2: INSUFFICIENT_INPUT_AMOUNT');
    { // scope for reserve{0,1}Adjusted, avoids stack too deep errors
    uint balance0Adjusted = balance0.mul(1000).sub(amount0In.mul(3));
    uint balance1Adjusted = balance1.mul(1000).sub(amount1In.mul(3));
    require(balance0Adjusted.mul(balance1Adjusted) >= uint(_reserve0).mul(_reserve1).mul(1000**2), 'UniswapV2: K');
    }

    _update(balance0, balance1, _reserve0, _reserve1);
    emit Swap(msg.sender, amount0In, amount1In, amount0Out, amount1Out, to);
}
```

- Handles token swaps and flash swaps
- Ensures constant product formula
- Uses `lock` modifier for reentrancy protection
- Emits `Swap` event

## Key Takeaways

1. Immutable, minimal core contracts
2. Complex logic in periphery contracts
3. Security: reentrancy protection, minimum liquidity
4. Innovations: flash swaps, price oracles
5. Constant product formula central to operations