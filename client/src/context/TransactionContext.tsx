import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import transactions from '../utils/transactions.json';
import 'dotenv/config';

export const TransactionContext = React.createContext();

const { ethereum }: any = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum); // provider is an object
  const signer = provider.getSigner(); // signer sign transaction to the blockchain
  const transactionContract = new ethers.Contract(
    process.env.CONTRACT_ADDRESS,
    transactions.abi,
    signer
  );
  console.log({
    provider,
    signer,
  });
};

export const TransactionProvider = ({ children }: any) => {
  return <TransactionContext.Provider></TransactionContext.Provider>;
};
