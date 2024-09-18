"use client"

import  LoginContext  from "../../../../contextApi/LoginContextApi"

export default function Layout({children}){
    return(
<LoginContext>
    {children}
</LoginContext>

)
}