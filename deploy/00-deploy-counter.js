module.exports = async ({ deployments, getNamedAccounts }) => {
  const { deployer } = await getNamedAccounts();

  await deployments.deploy("Counter", {
    from: deployer,
    log: true,
    args: [],
    proxy: {
      proxyContract: "OpenZeppelinTransparentProxy",
      viaAdminContract: {
        name: "CounterProxyAdmin",
        artifact: "CounterProxyAdmin",
      },
    },
  });
};

module.exports.tags = ["all", "counter"];
