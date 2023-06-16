"use client"
import React from "react";

const Table = ({data})=>{
 return(

        <div id="tableModal" className=" inset-0 flex items-center justify-center mt-10">
        <div className="bg-white shadow-lg rounded-lg p-6 border-2 border-black transform -skew-x-10 flex flex-col items-center justify-center">
            <p className="px-4 py-2">stakeholder address : {data.stakeholderAddress.toString()}</p>
            <p className="px-4 py-2">admin : {data.admin.toString()}</p>
            <p className="px-4 py-2">role : {data.role.toString()}</p>
            <p className="px-4 py-2">condition : {data.condition.toString()}</p>
            <p className="px-4 py-2">lock time : {data.lockTime.toString()}</p>
            <p className="px-4 py-2">gratuity : {data.gratuity.toString()}</p>
 <p className="px-4 py-2">conditionMet : {data.conditionMet.toString()}</p>
  
    </div>
  </div>
 )
}
export default Table