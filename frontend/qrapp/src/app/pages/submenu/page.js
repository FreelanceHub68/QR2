"use client"

import Subbar from "@/app/component/client/subbar"
import Submenu from "@/app/component/client/submenu"

export default function Page(){
   
    return(
        <>
       <div className="bg-zinc-300 h-screen">
        <Subbar/>
        <Submenu/>
        </div>     
        </>
    )
}