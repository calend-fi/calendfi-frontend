// const errorPrefix = 'Web3Index | ';
import { ethers } from 'ethers';
import { Address0 } from "./common/web3Config.js"


let parseUnits = ethers.utils.parseUnits;
let formatUnits = ethers.utils.formatUnits;
import store from '@/store'

import { getWalletInfo, getBlock } from '@/web3/common/wallet.js'

//  common
import { createIErc20 } from "./common/IERC20"

// v2_0
import { createSwapPoolERC20 as createSwapPoolERC20_v2_0 } from '@/web3/v2_0/SwapPoolERC20'
import { createStakerERC20 as createStakerERC20_v2_0 } from '@/web3/v2_0/StakerERC20'
import { createManagerERC20 as createManagerERC20_v2_0 } from '@/web3/v2_0/ManagerERC20'

// v2_1
import { createSwapPoolERC20 as createSwapPoolERC20_v2_1 } from '@/web3/v2_1/SwapPoolERC20'
import { createStakerERC20 as createStakerERC20_v2_1 } from '@/web3/v2_1/StakerERC20'
import { createRouterERC20 as createRouterERC20_v2_1 } from '@/web3/v2_1/RouterERC20'
import { createManagerERC20 as createManagerERC20_v2_1 } from '@/web3/v2_1/ManagerERC20'
import { createIWETH as createIWETHERC20_v2_1 } from '@/web3/v2_1/IWETH'
import { createAirDropper as createAirDropper_v2_1 } from '@/web3/v2_1/AirDropper'
import { createAirDropper02 as createAirDropper02_v2_1 } from '@/web3/v2_1/AirDropper02'

import { createAlchemyPay01 as createAlchemyPay01_v2_1 } from "@/web3/v2_1/AlchemyPay01"
import { createAlchemyPay02 as createAlchemyPay02_v2_1 } from "@/web3/v2_1/AlchemyPay02"



// rotuer_02
import { createRouter02ERC20 as createRouter02ERC20_v2_1 } from '@/web3/v2_1/EncV2Router02'
// staker_02
import { createStaker02ERC20 as createStaker02ERC20_v2_1 } from '@/web3/v2_1/EncV2Staker02'
// staker_022
import { createStaker022ERC20 as createStaker022ERC20_v2_1 } from '@/web3/v2_1/EncV2Staker022'
// staker_023
import { createStaker023ERC20 as createStaker023ERC20_v2_1 } from '@/web3/v2_1/EncV2Staker023'
// staker_03
import { createStaker03ERC20 as createReferral_v2_1 } from '@/web3/v2_1/Staker03'
import { createShareERC as createShare } from '@/web3/v2_1/Share'

import { createAdjustableStakeERC20 as createAdjustableStakeERC20_v2_1 } from '@/web3/v2_1/AdjustableStake'

import { createLockerERC20 as createLockerERC20_v2_1 } from '@/web3/v2_1/Locker'

// swap（projectid = 39426）
import { createSwapper as createSwapper_v2_1 } from '@/web3/v2_1/Swapper'
import { createswapV2Router as createswapV2Router_v2_1 } from '@/web3/v2_1/IUniswapV2Router'


import { createMarket as createMarket_v2_1 } from '@/web3/v2_1/market'


import { createTest as createTest_v2_1 } from '@/web3/v2_1/Test'



let timestamp;


document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === 'visible') {
        (async () => {
            let block = await getBlock();
            store.commit('setBlock', block);
            timestamp = Number(block.timestamp);
        })();
    }
});

setTimeout(() => {
    timestamp = store.state.block.timestamp;
    let timestampTimer = null;
    (async function upDateBlock() {
        try {
            let block = await getBlock();
            store.commit('setBlock', block);
            timestamp = Number(block.timestamp);
            clearInterval(timestampTimer);
            timestampTimer = setInterval(() => {
                timestamp++;
            }, 1000);
        } catch (e) {
            console.log('getBlockError');
        }
    })();
})



export async function getSymbol_erc20(address) {
    if (address.toLocaleLowerCase() === store.getters.platformToken) {
        address = store.getters.wrapTokenAddress;
    }
    return await createIErc20(address).getSymbol();
}

export async function getTokenInfo_erc20(address, params = ["name", "symbol", "totalSupply", "decimals"]) {
    if (address.toLocaleLowerCase() === store.getters.platformToken) {
        address = store.getters.wrapTokenAddress;
    }
    let obj = {
        address: address
    };
    let _name;
    let _symbol;
    let _totalSupply;
    let _decimals;
    if (params.includes("name")) {
        _name = createIErc20(address).getName();
    }
    if (params.includes("symbol")) {
        _symbol = createIErc20(address).getSymbol();
    }
    if (params.includes("totalSupply")) {
        _totalSupply = createIErc20(address).getTotalSupply();
    }
    if (params.includes("decimals")) {
        _decimals = createIErc20(address).getDecimals();
    }
    if (params.includes("name")) {
        let name = await _name;
        obj.name = name;
    }
    if (params.includes("symbol")) {
        let symbol = await _symbol;
        obj.symbol = symbol;
    }
    if (params.includes("totalSupply")) {
        let totalSupply = await _totalSupply;
        obj.totalSupply = totalSupply;
    }
    if (params.includes("decimals")) {
        let decimals = await _decimals;
        obj.decimals = decimals;
    }
    return obj;
}

export async function getDecimals_erc20(address) {
    if (address.toLocaleLowerCase() === store.getters.platformToken) {
        address = store.getters.wrapTokenAddress;
    }
    return await createIErc20(address).getDecimals();
}

export async function balanceOf_erc20(address) {
    if (address.toLocaleLowerCase() === store.getters.platformToken) {
        let res = await getWalletInfo();
        // store.commit('setWalletInfo', res);
        // return store.getters.walletInfo.balance;
        return res.balance;
    } else {
        let balance = await createIErc20(address).balanceOf();
        let decimals = await getDecimals_erc20(address);
        return parseUnits(formatUnits(balance, decimals), 18)
    }
}

export async function isApproved_erc20(address, contractAdr) {

    if (address.toLocaleLowerCase() === store.getters.platformToken) {
        return false;
        // address = store.getters.wrapTokenAddress;
    }


    return await createIErc20(address).isApproved(contractAdr);
}

export async function approve_erc20(address, contractAdr) {

    if (address.toLocaleLowerCase() === store.getters.platformToken) {
        address = store.getters.wrapTokenAddress;
    }


    await createIErc20(address).approve(contractAdr);
}


export async function totalSupply_swapPool(poolid, version = store.state.environment.version) {
    if (version === 'v2_0') {
        return await createSwapPoolERC20_v2_0().totalSupply(poolid);
    } else if (version === 'v2_1') {

        return await createSwapPoolERC20_v2_1().totalSupply(poolid);
    }
}

export async function balanceOf_swapPool(poolid, version = store.state.environment.version) {
    if (version === 'v2_0') {
        return await createSwapPoolERC20_v2_0().balanceOf(poolid);
    } else if (version === 'v2_1') {

        return await createSwapPoolERC20_v2_1().balanceOf(poolid);
    }
}

export async function poolAssets_swapPool(poolid, version = store.state.environment.version) {
    if (version === 'v2_0') {
        let res = await createSwapPoolERC20_v2_0().poolAssets(poolid);
        return res;
    } else if (version === 'v2_1') {

        let res = await createRouterERC20_v2_1().poolAssets(poolid);
        let arr = Object.assign([], res);
        arr.reserves0 = arr.gReserves0;
        arr.reserves1 = arr.gReserves1;
        return arr;
    }
}

export async function getAmountOut_swapPool(poolID, amountIn, fromToken0, version = store.state.environment.version) {
    if (version === 'v2_0') {
        return await createSwapPoolERC20_v2_0().getAmountOut(poolID, amountIn, fromToken0);
    } else if (version === 'v2_1') {
        // if (typeof poolID == 'object' && poolID.length == 2) {
        if (typeof poolID == 'object') {
            return await createRouter02ERC20_v2_1().getAmountsOut([...poolID], amountIn, [...fromToken0]);
        } else {
            return await createRouterERC20_v2_1().getAmountOut(poolID, amountIn, fromToken0);
        }
    }
}

export async function getAmountIn_swapPool(poolID, amountOut, fromToken0, version = store.state.environment.version) {
    if (version === 'v2_0') {
        throw new Error('Error');
    } else if (version === 'v2_1') {
        if (typeof poolID == 'object') {
            return await createRouter02ERC20_v2_1().getAmountsIn([...poolID], amountOut, [...fromToken0]);

        } else {

            return await createRouterERC20_v2_1().getAmountIn(poolID, amountOut, fromToken0);
        }
    }
}

export async function swap_swapPool(poolID, amountIn, minAmountOut, fromToken0, version = store.state.environment.version) {

    let deadline = Math.ceil(Number(store.state.transaction_settings.deadline) * 60) + timestamp;
    console.log(deadline);
    if (version === 'v2_0') {
        await createSwapPoolERC20_v2_0().swap(poolID, amountIn, minAmountOut, fromToken0);
    } else if (version === 'v2_1') {

        if (typeof poolID == 'object') {
            await createRouter02ERC20_v2_1().swaps([...poolID], amountIn, minAmountOut, [...fromToken0], deadline);

        } else {


            await createRouterERC20_v2_1().swap(poolID, amountIn, minAmountOut, fromToken0, deadline);
        }
    }
}

export async function swapWithETHIn_swapPool(poolID, minAmountOut, fromToken0, value, version = store.state.environment.version) {
    let deadline = Math.ceil(Number(store.state.transaction_settings.deadline) * 60) + timestamp;

    if (version === 'v2_0') {
        throw new Error('Error');
    } else if (version === 'v2_1') {
        if (typeof poolID == 'object') {
            await createRouter02ERC20_v2_1().swapsWithETHIn(poolID, minAmountOut, fromToken0, value, deadline);

        } else {
            await createRouterERC20_v2_1().swapWithETHIn(poolID, minAmountOut, fromToken0, value, deadline);
        }
    }
}

export async function swapWithETHOut_swapPool(poolID, amountIn, minAmountOut, fromToken0, version = store.state.environment.version) {
    let deadline = Math.ceil(Number(store.state.transaction_settings.deadline) * 60) + timestamp;

    if (version === 'v2_0') {
        throw new Error('Error');
    } else if (version === 'v2_1') {
        if (typeof poolID == 'object') {
            await createRouter02ERC20_v2_1().swapsWithETHOut(poolID, amountIn, minAmountOut, fromToken0, deadline);
        } else {
            await createRouterERC20_v2_1().swapWithETHOut(poolID, amountIn, minAmountOut, fromToken0, deadline);
        }
    }
}


export async function addPool_swapPool(token1, token2, projectid, feeRate, version = store.state.environment.version) {

    if (token1.toLocaleLowerCase() === store.getters.platformToken) {
        token1 = store.getters.wrapTokenAddress;
    }
    if (token2.toLocaleLowerCase() === store.getters.platformToken) {
        token2 = store.getters.wrapTokenAddress;
    }

    if (version === 'v2_0') {
        return await createSwapPoolERC20_v2_0().addPool(token1, token2, projectid, feeRate);
    } else if (version === 'v2_1') {

        return await createSwapPoolERC20_v2_1().addPool(token1, token2, projectid);

    }
}



export async function addLiquidity_swapPool(poolid, amount0, amount1, version = store.state.environment.version) {
    let deadline = Math.ceil(Number(store.state.transaction_settings.deadline) * 60) + timestamp;

    if (version === 'v2_0') {
        await createSwapPoolERC20_v2_0().addLiquidity(poolid, amount0, amount1);
    } else if (version === 'v2_1') {
        await createRouterERC20_v2_1().addLiquidity(poolid, amount0, amount1, deadline);
    }
}

export async function addLiquidityETH_swapPool(poolid, amount0, amount1, value, version = store.state.environment.version) {
    let deadline = Math.ceil(Number(store.state.transaction_settings.deadline) * 60) + timestamp;

    if (version === 'v2_0') {
        throw new Error('Error');
    } else if (version === 'v2_1') {
        await createRouterERC20_v2_1().addLiquidityETH(poolid, amount0, amount1, value, deadline);
    }
}

export async function removeLiquidity_swapPool(liquidity, poolid, version = store.state.environment.version) {
    let deadline = Math.ceil(Number(store.state.transaction_settings.deadline) * 60) + timestamp;

    if (version === 'v2_0') {
        await createSwapPoolERC20_v2_0().removeLiquidity(liquidity, poolid);
    } else if (version === 'v2_1') {
        await createRouterERC20_v2_1().removeLiquidity(liquidity, poolid, deadline);
    }
}



export async function removeLiquidityETH_swapPool(liquidity, poolid, version = store.state.environment.version) {
    let deadline = Math.ceil(Number(store.state.transaction_settings.deadline) * 60) + timestamp;

    if (version === 'v2_0') {
        throw new Error('Error');
    } else if (version === 'v2_1') {
        await createRouterERC20_v2_1().removeLiquidityETH(liquidity, poolid, deadline);
    }
}



export async function WETH_router(version = store.state.environment.version) {
    if (version === 'v2_0' || version === 'v2_1') {
        return await createRouterERC20_v2_1().WETH();
    }
}


export async function isApproved_swapPool(poolid, contractAdr, version = store.state.environment.version) {
    if (version === 'v2_0') {
        return await createSwapPoolERC20_v2_0().isApproved(poolid, contractAdr);
    } else if (version === 'v2_1') {

        return await createSwapPoolERC20_v2_1().isApproved(poolid, contractAdr);

    }
}

export async function approve_swapPool(poolid, contractAdr, version = store.state.environment.version) {
    if (version === 'v2_0') {
        await createSwapPoolERC20_v2_0().approve(poolid, contractAdr);
    } else if (version === 'v2_1') {

        await createSwapPoolERC20_v2_1().approve(poolid, contractAdr);
    }
}



export async function claimableReward_swapPool(poolId, version = store.state.environment.version) {
    if (version === 'v2_0') {
        throw new Error('Error');
    } else if (version === 'v2_1') {
        return await createSwapPoolERC20_v2_1().claimableReward(poolId);
    }
}


export async function claimReward_swapPool(poolId, version = store.state.environment.version) {
    if (version === 'v2_0') {
        throw new Error('Error');
    } else if (version === 'v2_1') {
        await createSwapPoolERC20_v2_1().claimReward(poolId);
    }
}




export async function createActivity_adjustableStake(projectId, startTime, lastingTime, rewardAmount, staketoken, tid, isMultiToken, isChainToken, rewardToken, flag, version = store.state.environment.version) {

    let rewardTokenIsPlatformToken = false;
    if (rewardToken.toLocaleLowerCase() === store.getters.platformToken) {
        rewardTokenIsPlatformToken = true;
        rewardToken = Address0;
    }
    if (version === 'v2_1') {
        if (rewardTokenIsPlatformToken) {
            return await createAdjustableStakeERC20_v2_1().addActivityETH(projectId, startTime, lastingTime, rewardAmount, staketoken, tid, isMultiToken, isChainToken, rewardToken, flag);
        } else {
            return await createAdjustableStakeERC20_v2_1().addActivity(projectId, startTime, lastingTime, rewardAmount, staketoken, tid, isMultiToken, isChainToken, rewardToken, flag);
        }
    }
}


export async function updateETH_adjustableStake(activityID, awardAmount, rewardRate, version = store.state.environment.version) {
    if (version === 'v2_1') {


        return await createAdjustableStakeERC20_v2_1().updateETH(activityID, awardAmount, rewardRate);
    }
}
export async function update_adjustableStake(activityID, awardAmount, rewardRate, version = store.state.environment.version) {
    if (version === 'v2_1') {
        return await createAdjustableStakeERC20_v2_1().update(activityID, awardAmount, rewardRate);
    }
}

export async function remainAward_adjustableStake(activityID, version = store.state.environment.version) {
    if (version === 'v2_1') {
        return await createAdjustableStakeERC20_v2_1().remainAward(activityID);
    }
}

export async function activities_adjustableStake(activityID, version = store.state.environment.version) {
    if (version === 'v2_1') {
        return await createAdjustableStakeERC20_v2_1().activities(activityID);
    }
}

export async function claimableReward_adjustableStake(activityID, version = store.state.environment.version) {
    if (version === 'v2_1') {
        return await createAdjustableStakeERC20_v2_1().claimableReward(activityID);
    }
}

export async function userAssets_adjustableStake(activityID, version = store.state.environment.version) {
    if (version === 'v2_1') {
        return await createAdjustableStakeERC20_v2_1().userAssets(activityID);
    }
}

export async function claimReward_adjustableStake(activityID, version = store.state.environment.version) {
    if (version === 'v2_1') {
        return await createAdjustableStakeERC20_v2_1().claimReward(activityID);
    }
}


export async function stake_adjustableStake(actividyid, amount, pairaddress, version = store.state.environment.version) {
    if (version === 'v2_1') {
        if (pairaddress.toLocaleLowerCase() === store.getters.platformToken) {
            await createAdjustableStakeERC20_v2_1().stakeWithEth(actividyid, amount); //新合约
        } else {
            await createAdjustableStakeERC20_v2_1().stake(actividyid, amount); //新合约
        }
    }
}
export async function withdraw_adjustableStake(amount, actividyid, version = store.state.environment.version) {
    if (version === 'v2_1') {
        await createAdjustableStakeERC20_v2_1().withdraw(amount, actividyid);
    }
}
export async function exit_adjustableStake(actividyid, version = store.state.environment.version) {
    if (version === 'v2_1') {
        return await createAdjustableStakeERC20_v2_1().exit(actividyid);
    }
}







export async function createActivity_lockerStake(projectID, startTime, targetFinishTime, penaltyFeeRate, rewardAmount, rewardPerSecond, staketoken, tid, isMultiToken, isChainToken, version = store.state.environment.version) {

    let staketokenIsPlatformToken = false;
    if (staketoken.toLocaleLowerCase() === store.getters.platformToken) {
        staketokenIsPlatformToken = true;
        staketoken = Address0;
    }
    if (version === 'v2_1') {
        if (staketokenIsPlatformToken) {
            return await createLockerERC20_v2_1().addActivityETH(projectID, startTime, targetFinishTime, penaltyFeeRate, rewardAmount, rewardPerSecond, staketoken, tid, isMultiToken, isChainToken);
        } else {
            return await createLockerERC20_v2_1().addActivity(projectID, startTime, targetFinishTime, penaltyFeeRate, rewardAmount, rewardPerSecond, staketoken, tid, isMultiToken, isChainToken);
        }
    }
}


export async function updateETH_lockerStake(activityID, awardAmount, rewardPerSecond, version = store.state.environment.version) {
    if (version === 'v2_1') {


        return await createLockerERC20_v2_1().updateETH(activityID, awardAmount, rewardPerSecond);
    }
}
export async function update_lockerStake(activityID, awardAmount, rewardPerSecond, version = store.state.environment.version) {
    if (version === 'v2_1') {
        return await createLockerERC20_v2_1().update(activityID, awardAmount, rewardPerSecond);
    }
}

export async function remainAward_lockerStake(activityID, version = store.state.environment.version) {
    if (version === 'v2_1') {
        return await createLockerERC20_v2_1().remainAward(activityID);
    }
}

export async function activities_lockerStake(activityID, version = store.state.environment.version) {
    if (version === 'v2_1') {
        return await createLockerERC20_v2_1().activities(activityID);
    }
}

export async function claimableReward_lockerStake(activityID, version = store.state.environment.version) {
    if (version === 'v2_1') {
        return await createLockerERC20_v2_1().claimableReward(activityID);
    }
}

export async function userAssets_lockerStake(activityID, version = store.state.environment.version) {
    if (version === 'v2_1') {
        return await createLockerERC20_v2_1().userAssets(activityID);
    }
}

export async function claimReward_lockerStake(activityID, version = store.state.environment.version) {
    if (version === 'v2_1') {
        return await createLockerERC20_v2_1().claimReward(activityID);
    }
}


export async function stake_lockerStake(actividyid, amount, pairaddress, version = store.state.environment.version) {
    if (version === 'v2_1') {
        if (pairaddress.toLocaleLowerCase() === store.getters.platformToken) {
            await createLockerERC20_v2_1().stakeWithEth(actividyid, amount); //新合约
        } else {
            await createLockerERC20_v2_1().stake(actividyid, amount); //新合约
        }
    }
}
export async function withdraw_lockerStake(amount, actividyid, version = store.state.environment.version) {
    if (version === 'v2_1') {
        await createLockerERC20_v2_1().withdraw(amount, actividyid);
    }
}
export async function exit_lockerStake(actividyid, version = store.state.environment.version) {
    if (version === 'v2_1') {
        return await createLockerERC20_v2_1().exit(actividyid);
    }
}



export async function stake_staker(actividyid, amount, referral, flag, stakeVersion, pairaddress, version = store.state.environment.version) {
    if (version === 'v2_0') {
        await createStakerERC20_v2_0().stake(actividyid, amount);
    } else if (version === 'v2_1') {
        if (stakeVersion === '2.1.2.3') {
            if (pairaddress.toLocaleLowerCase() === store.getters.platformToken) {
                await createStaker023ERC20_v2_1().stakeWithEth(actividyid, amount); //新合约
            } else {
                await createStaker023ERC20_v2_1().stake(actividyid, amount); //新合约
            }
        } else if (stakeVersion === '2.1.2.2') {
            if (pairaddress.toLocaleLowerCase() === store.getters.platformToken) {
                await createStaker022ERC20_v2_1().stakeWithEth(actividyid, amount); //新合约
            } else {
                await createStaker022ERC20_v2_1().stake(actividyid, amount); //新合约
            }
        } else if (stakeVersion === '2.1.2') {
            if (pairaddress.toLocaleLowerCase() === store.getters.platformToken) {
                await createStaker02ERC20_v2_1().stakeWithEth(actividyid, amount); //新合约
            } else {
                await createStaker02ERC20_v2_1().stake(actividyid, amount); //新合约
            }
        } else if (stakeVersion === '2.1') {
            if (flag == 5 || flag == 6) {
                referral = referral == '' ? Address0 : referral
                if (pairaddress.toLocaleLowerCase() === store.getters.platformToken) {
                    await createReferral_v2_1().stakeWithEth(actividyid, amount, referral); //新合约
                } else {
                    await createReferral_v2_1().stake(actividyid, amount, referral);
                }
            } else {
                await createStakerERC20_v2_1().stake(actividyid, amount);
            }
        }

    }
}


export async function withdraw_staker(amount, actividyid, flag, stakeVersion, version = store.state.environment.version) {
    if (version === 'v2_0') {
        await createStakerERC20_v2_0().withdraw(amount, actividyid);
    } else if (version === 'v2_1') {



        if (stakeVersion === '2.1.2.3') {
            await createStaker023ERC20_v2_1().withdraw(amount, actividyid);
        } else if (stakeVersion === '2.1.2.2') {
            await createStaker022ERC20_v2_1().withdraw(amount, actividyid);
        } else if (stakeVersion === '2.1.2') {
            await createStaker02ERC20_v2_1().withdraw(amount, actividyid);
        } else if (stakeVersion === '2.1') {
            if (flag == 5 || flag == 6) {
                await createReferral_v2_1().withdraw(amount, actividyid);
            } else {
                await createStakerERC20_v2_1().withdraw(amount, actividyid);
            }

        }
    }
}


export async function exit_staker(actividyid, flag, stakeVersion, version = store.state.environment.version) {
    if (version === 'v2_0') {
        throw new Error('Error');
    } else if (version === 'v2_1') {
        if (stakeVersion === '2.1.2.3') {
            return await createStaker023ERC20_v2_1().exit(actividyid);
        } else if (stakeVersion === '2.1.2.2') {
            return await createStaker022ERC20_v2_1().exit(actividyid);
        } else if (stakeVersion === '2.1.2') {
            return await createStaker02ERC20_v2_1().exit(actividyid);
        } else if (stakeVersion === '2.1') {
            if (flag == 5 || flag == 6) {
                return await createReferral_v2_1().exit(actividyid);
            } else {
                return await createStakerERC20_v2_1().exit(actividyid);
            }
        }
    }
}


export async function activities_staker(actividyid, flag, stakeVersion, version = store.state.environment.version) {
    if (version === 'v2_0') {
        return await createStakerERC20_v2_0().activities(actividyid);
    } else if (version === 'v2_1') {
        if (stakeVersion === '2.1.2.3') {
            return await createStaker023ERC20_v2_1().activities(actividyid);
        } else if (stakeVersion === '2.1.2.2') {
            return await createStaker022ERC20_v2_1().activities(actividyid);
        } else if (stakeVersion === '2.1.2') {
            return await createStaker02ERC20_v2_1().activities(actividyid);
        } else if (stakeVersion === '2.1') {
            if (flag == 5 || flag == 6) {
                return await createReferral_v2_1().shareActivities(actividyid);
            } else {
                return await createStakerERC20_v2_1().activities(actividyid);
            }

        }


    }
}

export async function claimableReward_staker(actividyid, flag, stakeVersion, version = store.state.environment.version) {
    if (version === 'v2_0') {
        return await createStakerERC20_v2_0().claimableReward(actividyid);
    } else if (version === 'v2_1') {
        if (stakeVersion === '2.1.2.3') {
            return await createStaker023ERC20_v2_1().claimableReward(actividyid);
        } else if (stakeVersion === '2.1.2.2') {
            return await createStaker022ERC20_v2_1().claimableReward(actividyid);
        } else if (stakeVersion === '2.1.2') {
            return await createStaker02ERC20_v2_1().claimableReward(actividyid);
        } else if (stakeVersion === '2.1') {
            if (flag == 5 || flag == 6) {
                return await createReferral_v2_1().claimableReward(actividyid);
            } else {
                return await createStakerERC20_v2_1().claimableReward(actividyid);
            }
        }

    }
}

export async function userAssets_staker(actividyid, flag, stakeVersion, version = store.state.environment.version) {
    if (version === 'v2_0') {
        return await createStakerERC20_v2_0().userAssets(actividyid);
    } else if (version === 'v2_1') {
        if (stakeVersion === '2.1.2.3') {
            return await createStaker023ERC20_v2_1().userAssets(actividyid);
        } else if (stakeVersion === '2.1.2.2') {
            return await createStaker022ERC20_v2_1().userAssets(actividyid);
        } else if (stakeVersion === '2.1.2') {
            return await createStaker02ERC20_v2_1().userAssets(actividyid);
        } else if (stakeVersion === '2.1') {
            if (flag == 5 || flag == 6) {
                return await createReferral_v2_1().userAssets(actividyid);
            } else {
                return await createStakerERC20_v2_1().userAssets(actividyid);
            }

        }
    }
}

export async function claimReward_staker(actividyid, flag, stakeVersion, version = store.state.environment.version) {
    if (version === 'v2_0') {
        await createStakerERC20_v2_0().claimReward(actividyid);
    } else if (version === 'v2_1') {
        if (stakeVersion === '2.1.2.3') {
            return await createStaker023ERC20_v2_1().claimReward(actividyid);
        } else if (stakeVersion === '2.1.2.2') {
            return await createStaker022ERC20_v2_1().claimReward(actividyid);
        } else if (stakeVersion === '2.1.2') {
            return await createStaker02ERC20_v2_1().claimReward(actividyid);
        } else if (stakeVersion === '2.1') {
            if (flag == 5 || flag == 6) {
                return await createReferral_v2_1().claimReward(actividyid);
            } else {
                return await createStakerERC20_v2_1().claimReward(actividyid);
            }

        }

    }
}




export async function createActivity_manager(projectId, startTime, lastingTime, rewardAmount, staketoken, tid, isMultiToken, isChainToken, rewardToken, version = store.state.environment.version) {
    if (staketoken.toLocaleLowerCase() === store.getters.platformToken) {
        staketoken = store.getters.wrapTokenAddress;
    }
    if (rewardToken.toLocaleLowerCase() === store.getters.platformToken) {
        rewardToken = store.getters.wrapTokenAddress;
    }
    if (version === 'v2_0') {
        return await createManagerERC20_v2_0().createActivity(projectId, startTime, lastingTime, rewardAmount, staketoken, tid, isMultiToken, isChainToken, rewardToken);
    } else if (version === 'v2_1') {

        return await createStakerERC20_v2_1().addActivity(projectId, startTime, lastingTime, rewardAmount, staketoken, tid, isMultiToken, isChainToken, rewardToken);

    }
}

// staker03
export async function createActivity_ReferralStake(projectID, startTime, lastingTime, rewardAmount, directShareRewardRate, indirectShareRewardRate, staketoken, tid, isMultiToken, isChainToken, rewardToken, flag, version = store.state.environment.version) {
    let rewardTokenIsPlatformToken = false;
    if (rewardToken.toLocaleLowerCase() === store.getters.platformToken) {
        rewardTokenIsPlatformToken = true;
        rewardToken = Address0;
    }
    if (version === 'v2_1') {
        if (rewardTokenIsPlatformToken) {
            return await createReferral_v2_1().addActivityETH(projectID, startTime, lastingTime, rewardAmount, directShareRewardRate, indirectShareRewardRate, staketoken, tid, isMultiToken, isChainToken, rewardToken, flag);
        } else {
            return await createReferral_v2_1().addActivity(projectID, startTime, lastingTime, rewardAmount, directShareRewardRate, indirectShareRewardRate, staketoken, tid, isMultiToken, isChainToken, rewardToken, flag);
        }
    }
}

export async function getUserTwoLevelInviteeAddress(projectId, userAddress) {
    return await createShare().getUserTwoLevelInviteeAddress(projectId, userAddress);
}
export async function addShareRelation(projectId, userAddress, inviteeAddress) {
    return await createShare().addShareRelation(projectId, userAddress, inviteeAddress);
}

export async function createProject_manager(name, symbol, amount, version = store.state.environment.version) {
    if (version === 'v2_0') {
        return await createManagerERC20_v2_0().createProject(name, symbol, amount);
    } else if (version === 'v2_1') {

        return await createManagerERC20_v2_1().createProject(name, symbol, amount);

    }
}

export async function createProject2_manager(address, version = store.state.environment.version) {
    if (version === 'v2_0' || version === 'v2_1') {
        return await createManagerERC20_v2_1().createProject2(address);
    }
}



export async function userClaimed_airdropper(activityID, airdropVersion, version = store.state.environment.version) {
    if (version === 'v2_0') {
        throw new Error('Error');
    } else if (version === 'v2_1') {
        if (airdropVersion === '2.1.1') {
            return await createAirDropper02_v2_1().userClaimed(activityID);
        } else {
            return await createAirDropper_v2_1().userClaimed(activityID);
        }
    }
}

export async function activityAssets_airdropper(activityID, airdropVersion, version = store.state.environment.version) {
    if (version === 'v2_0') {
        throw new Error('Error');
    } else if (version === 'v2_1') {
        if (airdropVersion === '2.1.1') {
            return await createAirDropper02_v2_1().activityAssets(activityID);
        } else {
            return await createAirDropper_v2_1().activityAssets(activityID);
        }

    }
}


export async function claimTokens_airdropper(activityID, amount, merkleProof, airdropVersion, version = store.state.environment.version) {
    if (version === 'v2_0') {
        throw new Error('Error');
    } else if (version === 'v2_1') {
        if (airdropVersion === '2.1.1') {
            return await createAirDropper02_v2_1().claimTokens(activityID, amount, merkleProof);
        } else {
            return await createAirDropper_v2_1().claimTokens(activityID, amount, merkleProof);
        }
    }
}


export async function createDropActivity_airdropper(projectID, rewardToken, endTime, amount, merkleRoot, airdropVersion, version = store.state.environment.version) {

    let rewardTokenIsPlatformToken = false;

    if (rewardToken.toLocaleLowerCase() === store.getters.platformToken) {
        rewardTokenIsPlatformToken = true;
        rewardToken = Address0;
    }

    if (version === 'v2_0') {
        throw new Error('Error');
    } else if (version === 'v2_1') {
        if (rewardTokenIsPlatformToken) {
            return await createAirDropper02_v2_1().createDropActivityETH(projectID, rewardToken, endTime, amount, merkleRoot);
        } else {
            if (airdropVersion === '2.1.1') {
                return await createAirDropper02_v2_1().createDropActivity(projectID, rewardToken, endTime, amount, merkleRoot);
            } else {
                return await createAirDropper_v2_1().createDropActivity(projectID, rewardToken, endTime, amount, merkleRoot);
            }
        }
    }
}


