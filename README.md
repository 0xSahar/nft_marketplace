# NFT Marketplace

## Technology Stack & Tools

- Solidity (Writing Smart Contract)
- Javascript (React & Testing)
- [Hardhat](https://hardhat.org/) (Development Framework)
- [Ethers.js](https://docs.ethers.io/v5/) (Blockchain Interaction)
- [React.js](https://reactjs.org/) (Frontend Framework)
- [React routers](https://v5.reactrouter.com/) (Navigational components)
- [Ipfs](https://ipfs.io/) (Metadata storage)

## Requirements For Initial Setup
- Install [NodeJS](https://nodejs.org/en/)
- Install [Hardhat](https://hardhat.org/)

## Setting Up
### 1. Clone/Download the Repository

### 2. Install Dependencies:
```
$ npm install
```
### 3. Setup .env file:
Before running any scripts, you'll want to create a .env file with the following values :
 
 - **REACT_APP_NFT_STORAGE_API_KEY=""**

 You'll  need to create an account on [NFT.Storage](https://nft.storage/), and create a new API key.
 

### 4. Boot up local development blockchain
```
$ npx hardhat node
```
### 5. Run deployment script
`npx hardhat run scripts/deploy.js --network localhost`

### 6. Run Tests
`$ npx hardhat test`

### 7. Launch Frontend
`$ npm run start`
