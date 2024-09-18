"use client"

import Link from "next/link"
import { FaCartShopping } from "react-icons/fa6"
import { useCartContext } from "../../../../contextApi/CartContextApi";

export default function Subbarbutton({id}){
  const categoryid=id.categoryid;
  
 const tableid=id.id;
console.log();  
    const { count }=useCartContext();
    return(
        <>
         <div className="  h-16 flex justify-center items-center">
           <div className=" flex">
               <ul className="flex">
                 <li className=" text-black w-36 h-12 flex justify-center items-center  mx-2 hover:bg-white  hover:rounded-2xl hover:shadow-xl cursor-pointer">
                   <Link href={`/pages/menu?tableid=${tableid}`}>Home</Link>
                 </li>

    <li className=" w-36 h-12 flex justify-center items-center  mx-2 text-black cursor-pointer hover:bg-white hover:text-black hover:rounded-2xl hover:shadow-xl">
   <Link href={`/pages/order?tableid=${tableid}`}>Orders</Link>
    </li>

    <li className="  w-36 h-12 flex justify-center items-center mx-2 text-black hover:bg-white hover:text-black hover:rounded-2xl  hover:shadow-xl cursor-pointer">
    <Link href={`/pages/cart?id=${tableid}&categoryid=${categoryid}`} className="flex justify-center items-center "><FaCartShopping size={20} className="mx-1"/>  <span className="text-black" >Cart</span> <sup className="mx-1 px-2 py-1 bg-black text-white rounded-full text-xs">{count}</sup></Link>
    </li>
</ul>
</div>
        </div>
        </>
    )
}