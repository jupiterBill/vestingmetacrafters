"use client"

import React, { useEffect ,useState} from "react";
import { useAppContext } from "../../../Context/context";

const Reg = () => {
  const { test, registerOrganization} = useAppContext();
  const [name,setName] = useState("");
  const [tokenName,setTokenName] = useState("");
  const [symbol,setSymbol] = useState("");
  const [totalSupply,setTotalSupply] = useState(0);

  const updateName =(e)=>{
    setName(e.target.value);
  }
  const updateTokenName =(e)=>{
    setTokenName(e.target.value);
  }
  const updateSymbol =(e)=>{
    setSymbol(e.target.value);
  }
  const updateTotalSupply =(e)=>{
    setTotalSupply(e.target.value);
    
  }
  useEffect(() => {
  }, [test]);
  return (
    <div className="bg-white min-h-screen p-8">
      <input
        className="w-full mb-4 p-2 border border-gray-300 rounded"
        type="text"
        placeholder="name"
        value = {name}
        onChange={updateName}
        
      />
      <input
        className="w-full mb-4 p-2 border border-gray-300 rounded"
        type="text"
        placeholder="tokenName"
        value = {tokenName}
        onChange={updateTokenName}
      />
      <input
        className="w-full mb-4 p-2 border border-gray-300 rounded"
        type="text"
        placeholder="symbol"
        value={symbol}
        onChange={updateSymbol}
      />
      <input
        className="w-full mb-4 p-2 border border-gray-300 rounded"
        type="number"
        placeholder="totalSupply"
        value={totalSupply}
        onChange={updateTotalSupply}
      />
      <button
        className="bg-purple-500 text-white px-4 py-2 rounded-tl-lg rounded-br-lg hover:bg-purple-600 transform skew-x-[-5deg]"
        type="button"
        onClick={()=>{registerOrganization(name,tokenName,symbol,totalSupply)}}
      >
        Register
      </button>
    </div>
  );
};

export default Reg;
