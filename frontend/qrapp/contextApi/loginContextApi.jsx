"use client"
import React, { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
export const LoginContext = createContext();

export default function Loginprovider({ children }){
  

    const handleSubmit=async ({email,password,option})=>{
      let data={
        email,
        password,
        option
      }
    
      try {
        //made a post req to CartAPi
      //   Post Req of CartApi
  
          const response = await fetch('http://localhost:4000/login', { // Update with your server URL
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            });
  
            const result = await response.json();
        console.log('Server response:', result);
        } catch (error) {
          console.error('Error sending data:', error);
      }   
    
    }
    



  return (
    <LoginContext.Provider value={{handleSubmit}}>
      { children }
    </LoginContext.Provider>
  );
;
}

export const  useLoginContext =()=>useContext(LoginContext);


