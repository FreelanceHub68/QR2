"use client"
import { useEffect, useState } from "react";
import Show from "../show";
import Sidebar from "./sidebar";

export default function Admin(){
    
    // on sidebar show all table option 

    // fetch cart status 

    // give bill option

    // add-product

    const [selectedAction, setSelectedAction] = useState(null);

    const handleButtonClick = (action) => {
        setSelectedAction(action);
    };

    

    return(
        <>
    <div className="h-screen bg-white flex justify-start items-start sm:w-screen md:w-screen lg:w-screen xl:w-screen sm:flex ">
        
       <Sidebar onButtonClick={handleButtonClick}/>
      <Show action={selectedAction}/>        
    </div>    
        </>
    )
}