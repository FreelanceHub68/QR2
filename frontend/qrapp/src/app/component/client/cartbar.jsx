"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation";
 
export default function Cartbar(){
     // get table id 
     const searchParams = useSearchParams();
     // Check if searchParams has 'get' method
     if (typeof searchParams.get !== 'function') {
         console.error('searchParams.get is not a function');
         return null;
     }
     const id = searchParams.get('id');
 
    return(
        <>
        <div className="bg-zinc-300 h-16 flex justify-center items-center ">
           <div className=" flex">
               <ul className="flex">
                 <li className=" text-black w-24 h-12 flex justify-center items-center  mx-1 hover:bg-white  hover:rounded-2xl hover:shadow-xl cursor-pointer">
                   <Link href={`/pages/menu?tableid=${id}`}>Home</Link>
                 </li>

    <li className=" w-24 h-12 flex justify-center items-center  mx-1 text-black cursor-pointer hover:bg-white hover:text-black hover:rounded-2xl hover:shadow-xl">
   <Link href={`/pages/orders?tableid=${id}`}>Orders</Link>
    </li>

   
</ul>
</div>
        </div>
    </>
    )
}