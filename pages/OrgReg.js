"use client"
import React, { useEffect } from "react";
import NavBar from "@/app/Components/Navbar/Navbar";
import { useAppContext } from "../Context/context";
const Reg = ()=>{
    const {test} = useAppContext();
    useEffect(()=>{
        console.log("yay " + test)
    },[test])
    return(
       <div>
       <p>{test}</p>
       </div>
    )
}
export default Reg