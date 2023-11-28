import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import config from '../config.json';

import Navigation from './Navbar.js';
import Home from './Home.js'
import Create from './Create.js'
import MyListedItems from './MyListedItems.js'
import MyPurchases from './MyPurchases.js'

import MarketplaceAbi from '../abis/Marketplace.json'
import NFTAbi from '../abis/NFT.json'

import { useState } from 'react'
import { ethers } from "ethers"
import { Spinner } from 'react-bootstrap'

import './App.css';

function App() {
  const [loading, setLoading] = useState(true)
  const [account, setAccount] = useState(null)
  const [chainId, setChainId] = useState(null)
  const [nft, setNFT] = useState({})
  const [marketplace, setMarketplace] = useState({})


  // MetaMask Login/Connect
  const web3Handler = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[0])
    // Get provider from Metamask
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    //fetch current networks's chainId
    const {chainId} = await provider.getNetwork()
    setChainId(chainId)
    // Set signer
    const signer = provider.getSigner()

    window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload();
    })

    window.ethereum.on('accountsChanged', async function (accounts) {
      setAccount(accounts[0])
      await web3Handler()
    })
    loadContracts(signer, chainId)
  }

   const loadContracts = async (signer , chainId) => {
   // Get deployed copies of contracts
    const MarketplaceAddress = config[chainId].MARKETPLACE
    const marketplace = new ethers.Contract(MarketplaceAddress.address, MarketplaceAbi, signer)
    setMarketplace(marketplace)

    const NFTAddress = config[chainId].NFT
    const nft = new ethers.Contract(NFTAddress.address, NFTAbi, signer)
    setNFT(nft)
    setLoading(false)
  }


  return (
    <BrowserRouter>
      <div className="App">
        <>
          <Navigation web3Handler={web3Handler} account={account} chainId={chainId} />
        </>
        <div>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
              <Spinner animation="border" style={{ display: 'flex' }} />
              <p className='mx-3 my-0'>Awaiting Metamask Connection...</p>
            </div>
          ) : (
            <Routes>
              <Route path="/" element={
                <Home marketplace={marketplace} nft={nft} />
              } />
              <Route path="/create" element={
                <Create marketplace={marketplace} nft={nft} />
              } />
              <Route path="/my-listed-items" element={
                <MyListedItems marketplace={marketplace} nft={nft} account={account} />
              } />
              <Route path="/my-purchases" element={
                <MyPurchases marketplace={marketplace} nft={nft} account={account} />
              } />
            </Routes>
          )}
        </div>

      </div>
    </BrowserRouter>

  );
}

export default App;
