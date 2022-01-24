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
  interface FType {
    addressTo: string;
    amount: string;
    message: string;
  }

  const [currentAccount, setCurrentAccount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem('transactionCount') // cannot set to 0 since transactionCount will reset to 0 everytime we reset the page. Things will get stored in localStorage.
  );

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
      // if (!ethereum) return alert('Please install metamask');
      if (ethereum) {
        // get data from the form
        const { addressTo, amount, message } = formData;
        console.log(
          `current account: ${currentAccount} - address: ${addressTo} - amount: ${amount} - message: ${message}`
        );
        const transactionContract: ethers.Contract = getEthereumContract(); // transactionContract instance

        const parsedAmount = ethers.utils.parseEther(amount);

        // transfering tokens happens here
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

        // store transaction to the blockchain, get transactionHash from .addToBlockchain
        const transactionHash = await transactionContract.addToBlockchain(
          addressTo,
          parsedAmount,
          message
        );

        // loading
        setIsLoading(true);
        console.log(`Loading - ${transactionHash.hash}`);

        // wait for the transaction to be finished
        await transactionHash.wait();

        // done loading
        setIsLoading(false);
        console.log(`Success - ${transactionHash.hash}`);

        // get transaction counts
        const transactionCount =
          await transactionContract.getTransactionCount();
        setTransactionCount(transactionCount.toNumber());
        console.log('transactionCount: ' + transactionCount);
      } else {
        console.log('No Ethereum object');
      }
    } catch (err) {
      console.error(err);
      throw new Error('No Ethereum object');
    }
  };

  // checkWallet() every time the site loads
  useEffect(() => {
    checkWallet();
    console.log(currentAccount);
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        formData,
        setFormData,
        handleChange,
        isLoading,
        sendTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
