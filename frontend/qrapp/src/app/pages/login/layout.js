"use client"

import Loginprovider from "../../../../contextApi/loginContextApi";

export default function Layout({ children }) {
  return (
<Loginprovider>
           {children}
</Loginprovider>      
     
       
    );
}