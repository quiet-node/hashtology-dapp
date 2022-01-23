import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { contractABI, contractAddress } from '../utils/constants';

// export const TransactionContext = React.createContext();
export const TransactionContext = React.createContext({});

const { ethereum }: any = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum); // provider is an object
  const signer = provider.getSigner(); // signer sign transaction to the blockchain
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );
  console.log({
    contractAddress,
    provider,
    signer,
  });
};

// TransactionProvider will be used in main.tsx
// pretty much will wrap the whole app and redern whatever the passed in children are
export const TransactionProvider: React.FC = ({ children }: any) => {
  const [currentAccount, setCurrentAccount] = useState('');

  // Check if metamask is installed
  const checkWallet = async () => {
    if (!ethereum) return alert('Please install metamask');

    const accounts = await ethereum.request({ method: 'eth_accounts' });
    console.log(accounts);
  };

  // connect to metamask
  const connectWallet = async () => {
    try {
      // check if metamask is installed
      if (!ethereum) return alert('Please install metamask');

      // request metamask account
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      }); // this will show all the accounts then user can choose one to connect

      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.error(err);
      throw new Error('No Ethereum object');
    }
  };

  // checkWallet() every time the site loads
  useEffect(() => {
    checkWallet();
  }, []);

  return (
    <TransactionContext.Provider value={{ connectWallet: connectWallet }}>
      {children}
    </TransactionContext.Provider>
  );
};
