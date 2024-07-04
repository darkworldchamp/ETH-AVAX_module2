# Smart Contract Managemenet

This Solidity smart contract (`Assessment.sol`) manages an account with functionalities for deposit, withdraw, ownership transfer, and contract destruction. Below are the key features and usage instructions:

## Description

1. **Constructor**
   - Initializes the contract with an initial balance provided by the deployer.

2. **Functions**
   - `getBalance()`: Returns the current balance of the contract.
   - `deposit(uint256 _amount)`: Allows the owner to deposit additional funds into the contract.
   - `withdraw(uint256 _withdrawAmount)`: Allows the owner to withdraw funds from the contract, subject to sufficient balance.
   - `transferOwnership(address payable _newOwner)`: Transfers ownership of the contract to a new address.
   - `destroyContract()`: Destroys the contract, transferring any remaining funds to the owner and emitting an event.

3. **Events**
   - `Deposit(uint256 amount)`: Triggered upon a successful deposit.
   - `Withdraw(uint256 amount)`: Triggered upon a successful withdrawal.
   - `OwnershipTransferred(address indexed previousOwner, address indexed newOwner)`: Triggered when ownership is transferred.
   - `ContractDestroyed(address indexed contractAddress, address indexed destroyer)`: Triggered when the contract is destroyed.

4. **Modifiers**
   - `onlyOwner`: Restricts access to functions only to the current owner.

## Usage
 **Interacting with the Contract**
   - Use `deposit` to add funds.
   - Use `withdraw` to remove funds.
   - Use `transferOwnership` to transfer ownership to a new address.
   - Use `destroyContract` to destroy the contract and transfer remaining funds back to the owner.

# Execution 

Starter Next/Hardhat Project

After cloning the github, you will want to do the following to get the code running on your computer.

1. Inside the project directory, in the terminal type: npm i
2. Open two additional terminals in your VS code
3. In the second terminal type: npx hardhat node
4. In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js
5. Back in the first terminal, type npm run dev to launch the front-end.

After this, the project will be running on your localhost. 
Typically at ``` http://localhost:3000/```

# Requirements
 Solidity version: ^0.8.20

# License
 This project is licensed under the MIT License.
