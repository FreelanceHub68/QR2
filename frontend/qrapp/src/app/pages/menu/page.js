"use client"
import Menu from "@/app/component/client/menu";
import Navbar from "@/app/component/server/navbar";
import Link from "next/link";

export default function Page(){
    // fetch Product data from the database 
    // sent post req to the CARTAPi to put data in CART
    
return(
<>
{/* here we want to show sub menu cart list and add button so proct will get added in cart */}
<Navbar/>
<Menu/>
</>
    )
}
    