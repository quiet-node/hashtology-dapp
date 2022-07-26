import '@nomiclabs/hardhat-waffle';

require('dotenv').config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
export const solidity = '0.8.9';
export const networks = {
  mumbai: {
    url: process.env.MUMBAI_URL,
    accounts: [process.env.PRIVATE_KEY], // put your own key
  },
  ropsten: {
    url: process.env.ROPSTEN_URL,
    accounts: [process.env.PRIVATE_KEY],
  },
};
