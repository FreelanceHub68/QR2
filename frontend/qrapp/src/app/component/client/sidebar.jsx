
"use client"
import { useState } from "react";
import Tablecart from "../tablecart";
import Tablebutton from "./tablebutton";

export default function Sidebar({ onButtonClick }) {
    const tables = ["table1", "table2", "table3", "Table_no_4", "table5", "table6", "table7", "table8", "table9"];


    return (
        //         <div className="w-60 shadow-xl h-screen bg-white  flex flex-col ">

        //     <div className="w-56 mx-1   flex flex-col justify-center items-center my-8  bg-slate-200 shadow-md  " >
        //     <ul >
        //         <li className="  flex justify-center items-center  h-10 w-56  cursor-pointer hover:bg-slate-300 " onClick={()=>onButtonClick("Product")}>Product</li>
        //         <li className="flex flex-col justify-center items-center  h-10 w-56 cursor-pointer  hover:bg-slate-300" onClick={showform}>Tables</li>
        //        <ul
        //             className={`transition-all duration-500 ease-in-out overflow-hidden  ${show ? 'max-h-40 ' : 'max-h-0 '}`}
        //             style={{ transitionProperty: 'max-height' }}
        //           >
        //           <li className="flex justify-center items-center  h-10 w-56 cursor-pointer hover:bg-slate-300">Table no 1</li>
        //    </ul>
        //     </ul>
        //     </div>




        <div className="w-64 shadow-md  text-white h-screen  border-black  ">
            <div className="text-2xl font-bold text-black  h-16 flex justify-start items-center pl-5 ">Admin</div>
            <div className=" flex justify-center items-center rounded-xl  mt-6">

                <ul className=" w-full  flex justify-center items-center flex-col">

                    <li className="  w-full">
                        <button className="h-16 text-black cursor-pointer hover:bg-black  hover:text-white active:bg-white active:text-black  w-full" onClick={()=>onButtonClick("Product")}>Add product </button>
                    </li>

                    <Tablebutton onButtonClick={onButtonClick}/>

                    <li className="  w-full">
                        <button className="h-16 text-black cursor-pointer hover:bg-black  hover:text-white active:bg-white active:text-black  w-full"  onClick={()=>onButtonClick("Orders")}>Orders</button>
                    </li>


                    <li className="  w-full">
                        <button className="h-16 text-black cursor-pointer hover:bg-black  hover:text-white active:bg-white active:text-black  w-full"> Log-out</button>
                    </li>


                    
        
                </ul>

            </div>
        </div>
    );
}
// onClick={() => onButtonClick(table)}