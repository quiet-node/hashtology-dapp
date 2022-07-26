import { ethers } from 'hardhat';

const main = async () => {
  // Get the contract to deploy
  const Transactions = await ethers.getContractFactory('Transactions');
  const transactions = await Transactions.deploy();

  await transactions.deployed();

  console.log('Transactions deployed to:', transactions.address);
};

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
