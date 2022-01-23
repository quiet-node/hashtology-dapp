const hre = require('hardhat');

const main = async () => {
  // Get the contract to deploy
  const Transactions = await hre.ethers.getContractFactory('Transactions');
  const transactions = await Transactions.deploy();

  await transations.deployed();

  console.log('Transactions deployed to:', transactions.address);
};

const deploy = async () => {
  try {
    await main();
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

deploy();
