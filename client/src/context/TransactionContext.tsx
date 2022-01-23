import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { contractABI, contractAddress } from '../utils/constants';

export const TransactionContext = React.createContext({});

const { ethereum }: any = window;

const getEthereumContract = (): ethers.Contract => {
  const provider = new ethers.providers.Web3Provider(ethereum); // provider is an object
  const signer = provider.getSigner(); // signer sign transaction to the blockchain
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  return transactionContract;
};

// TransactionProvider will be used in main.tsx
// pretty much will wrap the whole app and redern whatever the passed in children are
export const TransactionProvider: React.FC = ({ children }: any) => {
  const [currentAccount, setCurrentAccount] = useState('');

  interface FType {
    addressTo: string;
    amount: string;
    message: string;
  }

  // these are the info from the form from Welcome.tsx
  const [formData, setFormData] = useState<FType>({
    addressTo: '',
    amount: '',
    message: '',
  });

  // this handleChange is more React base
  const handleChange = (e: any, name: string) => {
    setFormData((prevState) => ({
      ...prevState, // copy previous state since it's immutable
      [name]: e.target.value, // update name dynamically
    }));
  };

  // Check if metamask is installed
  const checkWallet = async () => {
    try {
      if (!ethereum) return alert('Please install metamask');

      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        // get all transactions
      } else {
        console.log('No accounts found');
      }
    } catch (err) {
      console.error(err);
      throw new Error('No Ethereum object');
    }
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

  // send transactions
  const sendTransaction = async () => {
    try {
      if (!ethereum) return alert('Please install metamask');

      // get data from the form
      const { addressTo, amount, message } = formData;

      const transactionContract: ethers.Contract = getEthereumContract(); // transactionContract instance

      const parsedAmount = ethers.utils.parseEther(amount);

      // send tokens function
      await ethereum.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: currentAccount,
            to: addressTo,
            gas: '0x5208', // 21000 GWEI
            value: parsedAmount._hex, // have to parsed the amount from base 10 ETH to hex GWEI
          },
        ],
      });

      // store transaction to the blockchain
      transactionContract.addToBlockchain();
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
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        formData,
        setFormData,
        handleChange,
        sendTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
