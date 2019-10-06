const Migrations = artifacts.require("Migrations");
const DHBWCoin = artifacts.require("DHBWCoin");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(DHBWCoin);
};
