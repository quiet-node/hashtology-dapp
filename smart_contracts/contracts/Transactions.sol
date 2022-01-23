//SPDX-License-Identifier: UNLICENSED
pragma solidity^0.8.0;

contract Transactions {
    uint256 transactionCounter; //hold number of transactions

    event Transfer(address from, address receiver, uint amount, string message, uint256 timestamp, string keyword);  // event is like a function that will emit later on

    // struct = interface || type in typescript
    struct TransferStruct {
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    TransferStruct[] transactions; // array of TransferStruct

    function addToBlockchain() public {
        
    }

    // getAllTracsactions return all transactions in the memory so we can list it under transactions block in the front-end
    // view means this function won't write anything to the block chain
    function getAllTransactions() public view returns(TransferStruct[] memory) {

    }

    // getTransactionCount returns the number of all transactions
    function getTransactionCount() public view returns (uint256) {

    }
    

}