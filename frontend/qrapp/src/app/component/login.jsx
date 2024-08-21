"use client"

import { useState } from "react";
import { useLoginContext } from "../../../contextApi/loginContextApi";

export default function Login(){
const [email,setEmail]=useState();
const [password,setPassword]=useState();
const [option,setOption]=useState();

const {handleSubmit} = useLoginContext();
// make a form give option as Admin / Chief
// redirect to the Admin dashboard or Cheif dashboard as per based on the login


return(
<>
<div className="flex justify-center items-center h-screen bg-zinc-100">

    <div className="bg-white h-[400px] w-96 rounded-xl flex  justify-start items-center flex-col">
    <h1 className="text-pink-600 text-3xl mt-8 my-5">Login</h1>


    <label htmlFor="email" className="text-xl">Email<span className="text-red-500">*</span></label>
<input className="w-64 h-8 rounded-md border border-black pl-5 my-3" placeholder="Enter name... " name="email" onChange={(e)=>setEmail(e.target.value)}/>
<label htmlFor="password" className="text-xl">Password<span className="text-red-500">*</span></label>
<input className="w-64 h-8 rounded-md border  border-black pl-5 my-3" placeholder="Enter password... " name="password"   onChange={(e)=>setPassword(e.target.value)} />

<div className="flex">


<div className="flex">
<input type="checkbox" id="option" name="option" value="admin" className="mx-1" onChange={(e)=>setOption(e.target.value)}/>
<label htmlFor="option">Admin</label>

</div>

<div className="flex mx-5">
<input type="checkbox" id="option" name="option" value="chief" className="mx-1" onChange={(e)=>setOption(e.target.value)} />
<label htmlFor="option">Cheif</label>
</div>


</div>
<button className="bg-pink-600 w-64 h-12 rounded-3xl text-white my-5 active:bg-pink-500 active:text-black " onClick={()=>handleSubmit({email,password,option})}>Login</button>
</div>

</div>
</>
    )
}