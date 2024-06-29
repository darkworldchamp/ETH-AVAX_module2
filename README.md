# Smart contract Management

A smart contract with frontend connectivity using hardhat . In this project I have connected a solidity contract with frontend and added functionalitites to it.

## Description

Here I have added two working functions namely transferOwnership and destroyContract which can triggered whenever called through clicking their erspective button .
Basically we can transferOwnership to some other account using transferOwnership function while if we want to destroy the current contract we can use destroy Contract function .
Also I have addeed some creativity to the frontend like adding background colors for buton containers and adding borders and margins as well . 


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

Requirements
Solidity version: ^0.8.20
OpenZeppelin Contracts: Used for ERC20, Ownable, and ERC20Burnable implementations.
License
This project is licensed under the MIT License.
