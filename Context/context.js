'use client'
import React, {useContext}from 'react'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import { useState,useEffect} from 'react'
import { address,ABI } from './constants'


const fetchContract = (signerOrProvider) =>
  new ethers.Contract(
    address,
    ABI,
    signerOrProvider
  );
const AppContext = React.createContext({});
export const ContextProvider = ({children})=>{
   const test = "you better believe this lil nigga popping";
   const [provider,setProvider] = useState(null);
   const [balance, setBalance] = useState(0);
   const [currentAccount,setCurrentAccount] = useState("");
   const [accountId,setAccountId] = useState("");
   const [openError,setOpenError] = useState(false);
   const [error,setError] = useState("");
   const [walletConnected, setWalletConnected] = useState(false);
   const [stakeholder,setStakeholder] = useState(null)
   const [stakeholdingdets, setDets] = useState(null)

   const getCurrentAccount = async()=>{
    
    if (!window.ethereum){
      window.alert("please install metamask")
      return setOpenError(true), setError("Install MetaMask");
    }
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });

    if (accounts.length) {
      setCurrentAccount(accounts[0]);
       console.log("account   : "+ accounts[0]);
    } else {
      setError("No Account Found");
      setOpenError(true);
    }
   }
   const WalletTracker = async () => {
    if(typeof window != "undefined" && typeof window.ethereum != "undefined") {
      
      try{
        window.ethereum.on("accountsChanged", (accounts) => {
          setCurrentAccount(accounts[0])
          console.log(accounts[0])
        })
  
      } catch (error) {
        console.log(error.message)
      }
    } else {
      // metamask is not installed.
      setCurrentAccount("")
      console.log("Please install metamask.")
    }
  };

   async function initWallet(){
    try {
        console.log("i'm trying")
      // check if any wallet provider is installed. i.e metamask xdcpay etc
      if (typeof window.ethereum === 'undefined') {
        console.log("Please install wallet.")
        alert("Please install wallet.")
        return
      }
      else{
          // raise a request for the provider to connect the account to our website
          const web3ModalVar = new Web3Modal({
            cacheProvider: true,
            providerOptions: {
            walletconnect: {
              package: WalletConnectProvider,
            },
          },
        });
        const instanceVar = await web3ModalVar.connect();
        
        const providerVar = new ethers.BrowserProvider(instanceVar)
        setProvider(providerVar)
        setWalletConnected(true)
    
        return
      }
    } catch (error) {
      console.log(error)
      return
    }
  }
  //------- Read Functions------
  const getAddressIdentity = async (currentAccount)=>{
    console.log("identity loading")
    try{ 
      const signer = await provider.getSigner();
      const contractInstance = await fetchContract(signer);
      console.log(contractInstance)
      const id = await contractInstance.addressIdentity(currentAccount)
      console.log("account identity : " + id);
      if(id.length){
        setAccountId(id);
      }
    }catch(error){
      if(error){
        console.log(error)
        setError(error)
        setOpenError(true);
      }
    }
  }
  const getTokenBalance = async ()=>{
    try{
      const signer = await provider.getSigner();
      const contractInstance = await fetchContract(signer);
      const balance = await contractInstance.getBalance();
      console.log("balance : " + balance)
      setBalance(balance);
    }catch(error){
      if(error){
        console.log(error)
        setError(error)
        setOpenError(true);
      }
    }
  }
  const getStakeHoldingDetails = async()=>{
    try{
      if(currentAccount){
        const signer = await provider.getSigner();
        const contractInstance = await fetchContract(signer);
        const data = await contractInstance.getStakeholdingDetails(currentAccount);
        setDets(data)
        console.log("stakeholding dets : "+data)
        return data
        
      }else{
        console.log("no data available")
        return "no data available"
      }
     
    }catch(error){
      if(error){
        console.log(error)
        setError(error)
        setOpenError(true);
      }
    } 
    }

    const getStakeHolders = async()=>{
      try{
        if(currentAccount){
          const signer = await provider.getSigner();
        const contractInstance = await fetchContract(signer);
        const data = await contractInstance.getStakeHolders(currentAccount);
        setStakeholder(data)
        console.log("stakeholding dets : "+data)
        return data
        }else{
          console.log("no data available")
          return "no data available"
        }
        
      }catch(error){
        if(error){
          console.log(error)
          setError(error)
          setOpenError(true);
        }
      } 
      }
    //-----End of Read Functions-----


    //---- Write Function -----


  const registerOrganization = async(name,tokenName,symbol,totalSupply)=>{
    try{
      const signer = await provider.getSigner();
      const contractInstance = await fetchContract(signer);
      const success = await contractInstance.registerOrganization(name,tokenName, symbol,totalSupply);
      console.log("organization registered:" +success);
      getAddressIdentity(currentAccount);
    }catch(error){
      if(error){
        console.log(error)
        setError(error)
        setOpenError(true);
      }
    } 
    }

    const registerStakeHolder = async(stakeholderAddress,role,condition,lockTime,gratuity)=>{
      try{
        const _lockTime = new Date(lockTime).getTime()/1000;
        console.log("lockTime : "+lockTime)
        const signer = await provider.getSigner();
        const contractInstance = await fetchContract(signer);
        const success = await contractInstance.registerStakeholder(stakeholderAddress,role,condition,_lockTime,gratuity);
        console.log("stakeholder registered:" +success);
      }catch(error){
        if(error){
          console.log(error)
          setError(error)
          setOpenError(true);
        }
      } 
      }
     
      const addToStakeHolderWhiteList = async(whitelistAddr, stakeHolderAddr,amountAllocated)=>{
        try{
          const signer = await provider.getSigner();
          const contractInstance = await fetchContract(signer);
          const success = await contractInstance.addToStakeHolderWhiteList(whitelistAddr,stakeHolderAddr,amountAllocated);
          console.log("whitelist registered:" +success);
        }catch(error){
          if(error){
            console.log(error)
            setError(error)
            setOpenError(true);
          }
        } 
        }
        const releaseToken = async(stakeHolderAddr)=>{
          try{
            const signer = await provider.getSigner();
            const contractInstance = await fetchContract(signer);
            const success = await contractInstance.releaseToken(stakeHolderAddr);
            console.log("token released:" +success);
          }catch(error){
            if(error){
              console.log(error)
              setError(error)
              setOpenError(true);
            }
          } 
          }
      
          const claimToken = async()=>{
            try{
              const signer = await provider.getSigner();
              const contractInstance = await fetchContract(signer);
              const success = await contractInstance.claimToken();
              console.log("token claimed:" +success);
            }catch(error){
              if(error){
                alert(error)
                setError(error)
                setOpenError(true);
              }
            } 
            }

    //---- End of Write Functions
  
  useEffect(()=>{
    console.log("alright mofo")
    async function gather (){
    await initWallet();
    await getCurrentAccount();
    getStakeHolders();
    getStakeHoldingDetails();
    await WalletTracker();
    if(provider)
    await getAddressIdentity(currentAccount);
    }
    gather();
  },[currentAccount])
  
    return(
        <AppContext.Provider value = {{
        test,
        currentAccount,
        openError,
        error,
        walletConnected,
        accountId,
        provider,
        stakeholder,
        balance,
        stakeholdingdets,
        registerOrganization,
        registerStakeHolder,
        addToStakeHolderWhiteList,
        releaseToken,
        claimToken,
        initWallet,
        getAddressIdentity,
        getTokenBalance,
        getStakeHoldingDetails,
        getStakeHolders,

        }}>
        {children}
        </AppContext.Provider>
    )
}

export const useAppContext =()=> useContext(AppContext);
