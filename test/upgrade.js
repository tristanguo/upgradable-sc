const { expect } = require("chai");
const { ethers, deployments, getNamedAccounts } = require("hardhat");

describe("test upgrade", async () => {
  let proxy, proxyAdmin, counter;
  let deployer;

  beforeEach(async () => {
    ({ deployer } = await getNamedAccounts());
    await deployments.fixture("counter");

    proxy = await ethers.getContract("Counter_Proxy");
    proxyAdmin = await ethers.getContract("CounterProxyAdmin");
    counter = await ethers.getContractAt("Counter", proxy.address);

    await counter.up();
    await counter.up();
    await counter.up();
  });

  it("current version is 1", async () => {
    const v = await counter.version();
    expect(v.toString()).to.be.equal("1");
  });

  it("current count is 3", async () => {
    const c = await counter.getCount();
    expect(c.toString()).to.be.equal("3");
  });

  it("upgrade and keep state", async () => {
    const c = await counter.getCount();
    const counterV2 = await deployments.deploy("CounterV2", {
      from: deployer,
      log: true,
      args: [c],
    });

    await proxyAdmin.upgrade(proxy.address, counterV2.address);

    const newVersion = await counter.version();
    expect(newVersion.toString()).to.be.equal("2");

    const currentCount = await counter.getCount();
    expect(currentCount.toString()).to.be.equal("3");
  });
});
