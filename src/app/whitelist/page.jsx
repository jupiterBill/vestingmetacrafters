"use client"

import React from "react";
import { useState,useEffect } from "react";
import { useAppContext } from "../../../Context/context";

const Whitelist =()=>{
const {addToStakeHolderWhiteList} = useAppContext()
const [stakeHolderAddr,setStakeHolderAddr] = useState("");
const [whitelistAddr,setWhitelist] = useState("");
const [amount,setAmount] = useState(0);
const updateStakeHolderAddr =(e)=>{
  setStakeHolderAddr(e.target.value);
}
const updateWhitelist =(e)=>{
  setWhitelist(e.target.value);
}
const updateAmount =(e)=>{
  setAmount(e.target.value);
}
    return (
        <div className="bg-white min-h-screen p-8">
      <input
        className="w-full mb-4 p-2 border border-gray-300 rounded"
        type="text"
        placeholder="whitelist address"
        value={whitelistAddr}
        onChange={updateWhitelist}
      />
      <input
        className="w-full mb-4 p-2 border border-gray-300 rounded"
        type="text"
        placeholder="stakeholder address"
        value={stakeHolderAddr}
        onChange={updateStakeHolderAddr}
      />
      <input
        className="w-full mb-4 p-2 border border-gray-300 rounded"
        type="number"
        placeholder="amountAllocated"
        value={amount}
        onChange={updateAmount}
      />
      <button
        className="bg-purple-500 text-white px-4 py-2 rounded-tl-lg rounded-br-lg hover:bg-purple-600 transform skew-x-[-5deg]"
        type="button"
        onClick={()=>{addToStakeHolderWhiteList(whitelistAddr,stakeHolderAddr,amount)}}
      >add</button>
    </div>
    )
}

export default Whitelist