// =================

import { DeployFunction } from "hardhat-deploy/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"

const deployToken: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { deployments, getNamedAccounts, network, ethers } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    // const chainId = network.config.chainId

    const initialSupply = ethers.utils.parseEther("10000.0")

    log("----------------------------------------------------")
    const args: any[] = [initialSupply]
    const classToken = await deploy("ClassToken", {
        from: deployer,
        args: args,
        log: true,
    })
    log("ClassToken deployed to:", classToken.address)
    log("Run Price Feed contract with command:")
    const networkName = network.name == "hardhat" ? "localhost" : network.name
    log(`yarn hardhat run scripts/enterRaffle.js --network ${networkName}`)
    log("----------------------------------------------------")
}
export default deployToken
deployToken.tags = ["all", "classtoken"]
