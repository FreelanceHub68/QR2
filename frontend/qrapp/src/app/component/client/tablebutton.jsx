"use client"

import { useState } from "react";
import "../../../../public/common.css"
export default function Tablebutton({ onButtonClick }) {
    const [show, setForm] = useState(false);
    const table = ["Table_no_1", "Table_no_2", "Table_no_3", "Table_no_4", "Table_no_5", "Table_no_6", "Table_no_7", "Table_no_8", "Table_no_9"];

    const showform = () => {
        setForm(!show);
    }

    return (
        <>
            <ul className="w-full">
                <li className="w-full">
                    <button className="h-16 text-black cursor-pointer hover:bg-black hover:text-white active:bg-white active:text-black w-full" onClick={showform}>
                        Table
                    </button>
                    <ul
                        className={`transition-all duration-500 ease-in-out overflow-hidden overflow-y-scroll showscroll ${show ? 'max-h-96' : 'max-h-0'}`}
                        style={{ transitionProperty: 'max-height' }}
                    >
                        {table.map((doc, index) => {
const tableName = doc.replace(/_/g, ' ');
                            return (
                                <li key={index} className="h-16 text-black cursor-pointer hover:bg-black hover:text-white active:bg-white active:text-black flex justify-center items-center">
                                    {/* <h1>{typeof(doc)}</h1> */}
                                    <button className="h-16 text-black cursor-pointer hover:bg-black hover:text-white active:bg-white active:text-black w-full" onClick={()=>onButtonClick(doc)} >
                                        {tableName} 
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </li>
            </ul>
        </>
    );
}
