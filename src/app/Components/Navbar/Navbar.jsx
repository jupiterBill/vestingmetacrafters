import React, { useEffect } from "react";
import { useState } from "react";
import { useAppContext } from "../../../../Context/context";
import Link from "next/link";
const NavBar = ()=>{
    const {initWallet, walletConnected} = useAppContext();
    const [connectButtonString,setString] = useState("");
    useEffect(()=>{
        setString(walletConnected ? "Connected":"Connect");
    },[walletConnected])
return(
  <div className="flex gap-20 bg-white mt-5 mx-3">
       <Link href="/">
  <p className="flex-1 bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg cursor-pointer">
    Home 
  </p>
  </Link>
    <Link href="/organizationReg/">
  <p className="flex-1 bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg cursor-pointer">
    register Organization 
  </p>
  </Link>
  <Link href="/regStakeHolder">
  <p className="flex-1 bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg cursor-pointer">
    register StakeHolders
  </p>
  </Link>

  <Link href="/whitelist">
  <p className="flex-1 bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg cursor-pointer">
    addToWhitelist
  </p>
  </Link>
  <Link href="/Dashboard">
  <p className="flex-1 bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg cursor-pointer">
    dashboard
  </p>
  </Link>
  <button className="flex-1 bg-green-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg" onClick={()=>{initWallet()}}>
    {connectButtonString}
  </button>
</div>
)
}
export default NavBar;