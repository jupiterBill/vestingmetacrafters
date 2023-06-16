"use client"
import React from "react";
import { useState,useEffect } from "react";
import { useAppContext } from "../../../Context/context";
import Table from "../Components/Table/Table";

const Dashboard = ()=>{
    const {accountId,stakeholdingdets,currentAccount,stakeholder,getTokenBalance,getStakeHolders,getStakeHoldingDetails,balance} = useAppContext();
    const [data,setData] = useState(null)
    useEffect(() => {
        
        if (accountId === "Administrator") {
          const fetchData = async () => {
            try {
              console.log("yeah")
              const data = await getStakeHolders(currentAccount);
              const dets = await getStakeHoldingDetails(currentAccount);
               await setData(data)
              

            } catch (error) {
              console.error("Error fetching stakeholder data:", error);
            }
          };
          fetchData();
        }
      }, []);
      return (
        <div>
        
          <div className="inset-0 flex items-center justify-center mt-10"> 
          <button
        className="bg-purple-500 text-white px-4 py-2 rounded-tl-lg rounded-br-lg hover:bg-purple-600 transform skew-x-[-5deg] mt-10"
        type="button"
        onClick={()=>{getTokenBalance()}}>balance</button>
          <p className="mt-10"> click button for balance ------  </p> 
        <p className="mt-10">{balance ? balance.toString() : "Balance - nil"}</p>
        </div>
        
          {accountId === "Administrator" ? (
            stakeholder && stakeholder.length > 0 ? (
              <ul>
                {stakeholder.map((stakeHolder) => (
                   <Table data = {stakeHolder}/>
                ))
                }
              </ul>
            ) : (
              <p>No stakeholder data available.</p>
            )
          ) : accountId ==="Stakeholder"? (
            stakeholdingdets && stakeholdingdets.length > 0 ? (
              <ul>
                {
                   <Table data = {stakeholdingdets}/>
                
                }
              </ul>
            ) : (
              <p>No stakeholder data available.</p>
            )
          ):accountId === "Whitelisted Address"? (stakeholdingdets && stakeholdingdets.length > 0 ? (
            <ul>
              {
                 <Table data = {stakeholdingdets}/>
              
              }
            </ul>
          ) : (
            <p>No stakeholder data available.</p>
          )):<p>sorry you don't have stakeholders</p>}
        </div>
      );

}
export default Dashboard