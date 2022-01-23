//SPDX-License-Identifier: UNLICENSED
pragma solidity^0.8.0;

contract Transactions {
    uint256 transactionCount; //hold number of transactions

    event Transfer(address from, address receiver, uint amount, string message, uint256 timestamp);  // event is like a function that will emit later on
    

    // struct = interface || type in typescript
    struct TransferStruct {
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
    }

    TransferStruct[] transactions; // array of TransferStruct
 
    // memory message is like an additional data pass to the transaction
    function addToBlockchain(address payable receiver, uint amount, string memory message) public { 

        transactionCount += 1; // increment count
        transactions.push(TransferStruct(msg.sender, receiver, amount, message, block.timestamp )); // add transactions to the array

        // transferring tokens happen in TransactionContext @ ethereum.request({method: 'eth_sendTransaction'} ... )
        emit Transfer(msg.sender, receiver, amount, message, block.timestamp); 

    }

    // getAllTracsactions return all transactions in the memory so we can list it under transactions block in the front-end
    // view means this function won't write anything to the block chain
    function getAllTransactions() public view returns(TransferStruct[] memory) {
        return transactions;
    }

    // getTransactionCount returns the number of all transactions
    function getTransactionCount() public view returns (uint256) {
        return transactionCount;
    }
    

}