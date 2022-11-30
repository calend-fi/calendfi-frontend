import ABI_SWAPPOOL_ERC20 from "./abis/SwapPoolERC20.JSON"
import IERC20 from "../common/IERC20.js"
import * as web3util from "../common/web3util.js"
import { ethers } from "ethers";

// const errorPrefix = 'SwapPoolERC20 | ';

class SwapPoolERC20 extends IERC20 {

    async isApproved(tid, spender, owner = null) {
        let _owner = await web3util.defaultOwnerIfNotSet(owner);
        const result = await this.read(
            'allowance',
            [tid, _owner, spender]
        )
        return result;
    }

    async approve(tid, spender, amount = ethers.constants.MaxUint256, owner = null) {
        let _owner = await web3util.defaultOwnerIfNotSet(owner);

        const res = await this.write(
            'approve',
            [tid, _owner, spender, amount], {
                // gasLimit: 55762
            }
        )
        const event = web3util.findEventArgs(res.events, "Approval");
        return event;
    }

    async getAmountOut(poolId, amountIn, fromToken0) {
        const result = await this.read(
            'getAmountOut',
            [poolId, amountIn, fromToken0]
        )
        return result;
    }

    async swap(poolID, amountIn, minAmountOut, fromToken0, owner = null) {
        let _owner = await web3util.defaultOwnerIfNotSet(owner);

        const res = await this.write(
            'swap',
            [poolID, amountIn, minAmountOut, fromToken0, _owner], {
                // gasLimit: 79000
            }
        )
        const event = web3util.findEventArgs(res.events, "SwapEvt");
        return event;
    }

    async addPool(token1, token2, projectid, feeRate) {
        const res = await this.write(
            'addPool',
            [token1, token2, projectid, feeRate], {
                // gasLimit: 80002
            }
        )
        const event = web3util.findEventArgs(res.events, "PoolAddedEvt");
        return event;
    }



    async totalSupply(poolId) {
        const result = await this.read(
            'totalSupply',
            [poolId]
        )
        return result;
    }

    async poolAssets(poolId) {
        const result = await this.read(
            'poolAssets',
            [poolId]
        )
        return result;
    }


    async balanceOf(poolId, owner = null) {
        let _owner = await web3util.defaultOwnerIfNotSet(owner);
        const result = await this.read(
            'balanceOf',
            [poolId, _owner]
        )
        return result;
    }



    async addLiquidity(poolid, amount0, amount1) {
        const res = await this.write(
            'addLiquidity',
            [poolid, amount0, amount1], {
                // gasLimit: 100102
            }
        )
        const event = web3util.findEventArgs(res.events, "MintEvt");
        return event;
    }

    async removeLiquidity(liquidity, poolid) {
        const res = await this.write(
            'removeLiquidity',
            [liquidity, poolid], {
                // gasLimit: 90000
            }
        )
        const event = web3util.findEventArgs(res.events, "BurnEvt");
        return event;
    }



}

export default SwapPoolERC20

export function createSwapPoolERC20() {
    let adr;
    try {
        adr = web3util.getContractAdr('SwapPoolERC20')
        return new SwapPoolERC20(ABI_SWAPPOOL_ERC20, adr);
    } catch (e) {
        console.log(e);
    }
}