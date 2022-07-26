require('@nomiclabs/hardhat-waffle');

require('dotenv').config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: '0.8.0',
  // networks: {
  //   mumbai: {
  //     url: process.env.MUMBAI_URL, // put your own url
  //     accounts: [process.env.PRIVATE_KEY], // put your own key
  //   },
  //   ropsten: {
  //     url: process.env.ROPSTEN_URL,
  //     accounts: [process.env.PRIVATE_KEY],
  //   },
  // },
};
