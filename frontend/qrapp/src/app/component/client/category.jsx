"use client"

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react"

export default function Category({productNames}){
  const data=productNames.productNames
  const ID=productNames.id;
  console.log(ID);
    
return(
        <>
<div className=" grid grid-cols-4 gap-x-5 gap-y-5 ">

    {data?.map((doc,index) => (
         <Link href={`/pages/submenu?id=${ID}&categoryid=${doc.id}`}>         
         <article
         className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 h-64 w-64 pt-40 max-w-sm mx-auto  hover:cursor-pointer my-5" key={index}>
                    <Image
                        src={doc.imageURL}
                        alt="Category image"
                        className="absolute inset-0 object-cover"
                        height={500} // Replace with actual height
                        width={500} // Replace with actual width
                        />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
                    <h3 className="z-10 mt-3 text-3xl font-bold text-white">{doc.name}</h3>
                    <div className="z-10 gap-y-1 overflow-hidden text-sm leading-6 text-gray-300"></div>
                    </article>

         </Link> 
))} 
</div>
</>
)
}