const { deployments, getNamedAccounts, ethers } = require("hardhat");

(async () => {
  const { deployer } = await getNamedAccounts();

  const proxyAdmin = await ethers.getContract("CounterProxyAdmin");
  const proxy = await ethers.getContract("Counter_Proxy");
  const counter = await ethers.getContractAt("Counter", proxy.address);

  // fetch current state and set to new contract
  const currentCount = await counter.getCount();

  const counterV2 = await deployments.deploy("CounterV2", {
    from: deployer,
    log: true,
    args: [currentCount],
  });

  const upgradeTx = await proxyAdmin.upgrade(proxy.address, counterV2.address);
  await upgradeTx.wait(1);

  const v = await counter.version();
  console.log(v.toString());

  const c = await counter.getCount();
  console.log(c.toString());
})();
