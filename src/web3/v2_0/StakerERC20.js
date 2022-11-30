import ABI_Staker_ERC20 from "./abis/StakerERC20.JSON"
import IERC20 from "../common/IERC20.js"
import * as web3util from "../common/web3util.js"

// const errorPrefix = 'StakerERC20 | ';

class StakerERC20 extends IERC20 {

    async activities(actividyid) {
        const result = await this.read(
            'activities',
            [actividyid]
        )
        return result;
    }
    async claimableReward(actividyid, owner = null) {
        let _owner = await web3util.defaultOwnerIfNotSet(owner);
        const result = await this.read(
            'claimableReward',
            [actividyid, _owner]
        )
        return result;
    }

    async userAssets(actividyid, owner = null) {
        let _owner = await web3util.defaultOwnerIfNotSet(owner);
        const result = await this.read(
            'userAssets',
            [actividyid, _owner]
        )
        return result;
    }

    async claimReward(actividyid, owner = null) {
        let _owner = await web3util.defaultOwnerIfNotSet(owner);
        const res = await this.write(
            'claimReward',
            [_owner, actividyid], {
                // gasLimit: 80002
            }
        )
        const event = web3util.findEventArgs(res.events, "RewardPaidEvt");
        return event;
    }



    async stake(actividyid, amount, owner = null) {
        let _owner = await web3util.defaultOwnerIfNotSet(owner);
        const res = await this.write(
            'stake',
            [actividyid, amount, _owner], {
                // gasLimit: 83330
            }
        )
        const event = web3util.findEventArgs(res.events, "StakedEvt");
        return event;
    }


    async withdraw(amount, actividyid, owner = null) {
        let _owner = await web3util.defaultOwnerIfNotSet(owner);
        const res = await this.write(
            'withdraw',
            [_owner, amount, actividyid], {
                // gasLimit: 77361
            }
        )
        const event = web3util.findEventArgs(res.events, "WithdrawEvt");
        return event;
    }
}

export default StakerERC20

export function createStakerERC20() {
    const adr = web3util.getContractAdr('StakerERC20')
    return new StakerERC20(ABI_Staker_ERC20, adr);
}