import ABI_Manager_ERC20 from "./abis/ManagerERC20.JSON"
import IERC20 from "../common/IERC20.js"
import * as web3util from "../common/web3util.js"

// const errorPrefix = 'ManagerERC20 | ';

class ManagerERC20 extends IERC20 {
    async createPool(token1, token2, projectid, feeRate) {
        const res = await this.write(
            'createPool',
            [token1, token2, projectid, feeRate], {
                // gasLimit: 80002
            }
        )
        return res.events[0];
    }

    async createActivity(projectId, startTime, lastingTime, rewardAmount, staketoken, tid, isMultiToken, isChainToken, rewardToken, owner = null) {
        let _owner = await web3util.defaultOwnerIfNotSet(owner);
        const res = await this.write(
            'createActivity',
            [
                [projectId, startTime, lastingTime, rewardAmount, staketoken, tid, isMultiToken, isChainToken, rewardToken, _owner]
            ], {
                // gasLimit: 80002
            }
        )
        let eventNameStr = '0x4296f29f2cecf65269fdf6c98f3295db7a7e205cffac11d140a413657a689abc';
        let result;
        res.events.some((item) => {
            if (item.topics[0] == eventNameStr) {
                result = item;
                return true;
            }
        })
        return result ? result : res.events[res.events.length - 1]
    }


    async createProject(name, symbol, amount, owner = null) {
        let _owner = await web3util.defaultOwnerIfNotSet(owner);

        const res = await this.write(
            'createProject',
            [name, symbol, amount, _owner], {
                // gasLimit: 79000
            }
        )
        const event = web3util.findEventArgs(res.events, "ProjectCreated");
        return event;
    }


}

export default ManagerERC20

export function createManagerERC20() {
    const adr = web3util.getContractAdr('ManagerERC20')
    return new ManagerERC20(ABI_Manager_ERC20, adr);
}