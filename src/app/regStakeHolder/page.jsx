"use client"
import React from "react";
import { useState,useEffect } from "react";
import { useAppContext } from "../../../Context/context";

const StakeReg =()=>{
  const {registerStakeHolder} = useAppContext();
//const vst = new Date(votingStartTime);
//const vet = new Date(votingEndTime);
const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9] [ap]m$/ig;
const dateRegex = /^(0?[1-9]|1[0-2])\/(0?[1-9]|1\d|2\d|3[01])\/(\d{2}|\d{4})$/;
const [stakeHolderAddr,setStakeHolderAddr] = useState("");
const [role,setRole] = useState("");
const [condition,setCondition] = useState("");
const [date,setDate] = useState("");
const [time,setTime] = useState("");
const [gratuity, setGratuity] = useState(0);
const [locktime,setLockTime] = useState("");

const updateStakeHolderAddr =(e)=>{
  setStakeHolderAddr(e.target.value);
}
const updateRole =(e)=>{
  setRole(e.target.value);
}
const updateCondition =(e)=>{
  setCondition(e.target.value);
}
const updateDate =(e)=>{
  setDate(e.target.value);
  
}
const updateTime =(e)=>{
  setTime(e.target.value);
  
}
const updateGratuity =(e)=>{
  setGratuity(e.target.value);
  
}
const validateDuration = async ()=>{
  if(time.length != 0 && time.match(timeRegex)===null){
    alert("time invalid use format --> 1:02 pm")
    return false
  }
  if(date.length != 0 && date.match(dateRegex)===null){
    alert("date invalid use format --> 6/14/2023" )
    return false
  }
  if(time.match(timeRegex)!= null && date.match(dateRegex)!=null){
  setLockTime(date.concat(" "+ time))
  console.log(locktime)
   return true
   
  }
}
useEffect(()=>{
  console.log("dkjdkldjd")
  if(time.length >6){
   console.log("greater")
    validateDuration();
  }
},[time])

return (

<div className="bg-white min-h-screen p-8">
  <div className="border border-gray-00 rounded overflow-hidden">
    <input
      className="w-full mb-4 p-2 border-b border-gray-300"
      type="text"
      placeholder="stakeholder address"
      value = {stakeHolderAddr}
      onChange={updateStakeHolderAddr}
    />
    <input
      className="w-full mb-4 p-2 border-b border-gray-300"
      type="text"
      placeholder="role"
      value = {role}
      onChange={updateRole}
    />
    <input
      className="w-full mb-4 p-2 border-b border-gray-300"
      type="text"
      placeholder="release condition"
      value = {condition}
      onChange={updateCondition}
    />
    <fieldset className="border-b border-gray-300 p-4">
      <legend className="text-gray-800 font-medium">Locktime</legend>
      <div className="space-y-4">
        <input
          className="w-full p-2 border-b border-gray-300"
          type="text"
          placeholder="date"
          value = {date}
      onChange={updateDate}
        />
        <input
          className="w-full p-2 border-b border-gray-300"
          type="text"
          placeholder="time"
          value = {time}
      onChange={updateTime}
        />
      </div>
    </fieldset>
    <input
      className="w-full mb-4 p-2 border-b border-gray-300"
      type="number"
      placeholder="gratuity"
      value = {gratuity}
      onChange={updateGratuity}
    />
    <button
      className="bg-purple-500 text-white px-4 py-2 rounded-tl-lg rounded-br-lg hover:bg-purple-600 transform skew-x-[-5deg]"
      type="button"
      onClick={()=>{
        const isValid = validateDuration();
        
        if(!stakeHolderAddr || !role || !condition ||!time ||!date ||!gratuity ){
          alert("please fill all fields correctly");
          return
        }else{
        isValid ? registerStakeHolder(stakeHolderAddr,role,condition,locktime,gratuity):alert("error occured")
        }
      }}
    >
      Register
    </button>
  </div>
</div>



)
}
export default StakeReg