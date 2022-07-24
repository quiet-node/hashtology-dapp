import React, { useContext } from 'react';
import { AiFillPlayCircle } from 'react-icons/ai';
import { SiEthereum } from 'react-icons/si';
import { BsInfoCircle } from 'react-icons/bs';

import { Loader } from './';
import { TransactionContext } from '../context/TransactionContext';

interface Props {
  placeholder: string;
  name: string;
  type: string;
  value: string;
  handleChange: (e: any, name: string) => void;
}

const commonStyles =
  'min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white';

const Input = ({
  placeholder,
  name,
  type,
  value,
  handleChange,
}: Props): JSX.Element => {
  return (
    <input
      placeholder={placeholder}
      type={type}
      step='0.0001'
      onChange={(e) => handleChange(e, name)}
      value={value}
      className='my-2 w-full rounded-md p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism'
    />
  );
};

const Welcome = () => {
  const {
    connectWallet,
    currentAccount,
    formData,
    handleChange,
    sendTransaction,
    isLoading,
  }: any = useContext(TransactionContext);

  // A CIRCLE IS CREATED. FORMDATA WITH ALL THE FIELDS ARE CREATED IN TRANSACTIONCONTEXT
  // THEN USERS FILL THE INFORMATION IN THE FRONTEND FORM, HANDLECHANGE WILL SET THE INFO
  // TO THE FORM DATA IN TRANSACTIONCONTEXT. THEN FROM CONTEXT, WE USE THE DATA TO BUILD
  // THE SEND TRANSACTION FUNCTION.

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const { addressTo, amount, message } = formData;
    if (!addressTo || !amount || !message) return; // do nothing if fields are not filled

    sendTransaction();
  };

  return (
    <div className='flex w-full justify-center items-center'>
      <div className='flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4'>
        <div className='flex flex-1 justify-start flex-col mf:mr-10'>
          <h1 className='text-3xl sm:text-5xl text-white text-gradient py-1'>
            Send Crypto <br /> across the world
          </h1>
          <p className='text-left text-white mt-5 font-light md:w-9/12 w-11/12 text-base'>
            Expore the crypto world. Buy and sell crypto easily with{' '}
            <span className='font-bold'> Hashtology</span>
          </p>

          {!currentAccount && (
            <button
              type='button'
              onClick={connectWallet}
              className='flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]'
            >
              <p className='text-white text-base font-semibold'>
                {' '}
                Connect Your Wallet{' '}
              </p>
            </button>
          )}
          <div className='grid sm:grid-cols-3 grid-cols-2 w-full mt-10'>
            <div className={` ${commonStyles} rounded-tl-2xl`}>
              {' '}
              Reliability
            </div>
            <div className={`${commonStyles}`}> Decentralized </div>
            <div className={`${commonStyles} sm:rounded-tr-2xl`}>
              {' '}
              Ethereum{' '}
            </div>
            <div className={`${commonStyles} sm:rounded-bl-2xl`}> Web 3.0 </div>
            <div className={`${commonStyles}`}> Low fees </div>
            <div className={`${commonStyles} rounded-br-2xl`}> Blockchain </div>
          </div>
        </div>

        <div className='flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10'>
          <div className='p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorphism'>
            <div className='flex justify-between flex-col w-full h-full'>
              <div className=' flex justify-between items-start'>
                <div className='w-10 h-10 rounded-full border-2 border-white flex justify-center items-center'>
                  <SiEthereum fontSize={21} color='#fff' />
                </div>
                <BsInfoCircle fontSize={17} color='#fff' />
              </div>
              <div>
                <p className='text-white font-semibold text-sm'>0xf39...2266</p>
                <p className='text-white font-semibold text-lg mt-1'>
                  Ethereum
                </p>
              </div>
            </div>
          </div>

          <div className='p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism'>
            <Input
              placeholder='Address To '
              name='addressTo'
              type='text'
              value={formData.addressTo}
              handleChange={handleChange}
            />
            <Input
              placeholder='Amount (ETH) '
              name='amount'
              type='number'
              value={formData.amount}
              handleChange={handleChange}
            />
            <Input
              placeholder='Message '
              name='message'
              type='text'
              value={formData.message}
              handleChange={handleChange}
            />
            <div className='h-[1px] w-full bg-gray-400 my-2' />

            {isLoading ? (
              <Loader />
            ) : (
              <button
                type='button'
                onClick={handleSubmit}
                className='text-white w-full mt-2 border-[1px] p-2 bg-indigo-700 border-[#3d4f7c] rounded-full cursor-pointer hover:opacity-[0.8]'
              >
                Send Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
