"use client"
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCartContext } from "../../../../contextApi/CartContextApi";
import { FaCartShopping } from "react-icons/fa6";
import Subbarbutton from "./subbarbutton";

export default function Subbar(){
    // get table id 
    const searchParams = useSearchParams();
    // Check if searchParams has 'get' method
    if (typeof searchParams.get !== 'function') {
        console.error('searchParams.get is not a function');
        return null;
    }
    const id = searchParams.get('id');
    const categoryid=searchParams.get('categoryid');
    const { count }=useCartContext();
    // console.log(id);

    return(
     <>
     <div className="">
       <Subbarbutton id={{id,categoryid}} />
     </div>
        </>
    )
}