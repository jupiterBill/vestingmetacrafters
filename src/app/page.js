"use client"
import Image from 'next/image'
import React from 'react'
import { useState,useContext,useEffect } from 'react'

import { useAppContext } from '../../Context/context'
export default function Home() {
  const {accountId,currentAccount,initWallet,getAddressIdentity,getTokenBalance,getStakeHolders,claimToken,releaseToken} = useAppContext();
  const [addr,setAddr] = useState("");
  const updateAddr =(e)=>{
    setAddr(e.target.value);
  }
  useEffect(()=>{
    getAddressIdentity(currentAccount)
  },[])
  return (
    <div className="flex justify-center mt-10">
    <main className="flex flex-col justify-center mt-10 bg-white min-h-screen mx-4 md:mx-10 border border-green-500 rounded-lg p-8 w-full md:w-3/4">
      <p className="mb-7 ml-7">connected Account: {currentAccount}</p>
      <p className="mb-7 ml-7">account status: {accountId ? accountId : ""}</p>
      {accountId ==="Administrator" ? 
        <input
        className="w-full mb-4 p-2 border-b border-gray-300"
        type="text"
        placeholder="release condition"
        value = {addr}
        onChange={updateAddr}
      />
      :<p></p>}
      <button
        className="bg-purple-500 text-white px-4 py-2 rounded-tl-lg rounded-br-lg hover:bg-purple-600 transform skew-x-[-5deg]"
        type="button"
        onClick={()=>{
          accountId === "Administrator"? releaseToken(addr):accountId ==="Stakeholder"?claimToken():accountId==="Whitelisted Address"?claimToken():alert("Sorry you're not a user")
        }}>
       {accountId === "Administrator"? "releaseToken":accountId ==="Stakeholder"?"claimToken":accountId ==="Whitelisted Address"? "claimToken":"Not registered"} 
      </button>
    </main>
  </div>
  )
}
