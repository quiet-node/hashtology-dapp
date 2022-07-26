import { ethers } from 'hardhat';

const main = async () => {
  // Get the contract to deploy
  const transactions = await Transactions.deploy();

  await transactions.deployed();

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
