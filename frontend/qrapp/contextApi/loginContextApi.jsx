"use client"

import axios from "axios";
import  {useRouter}  from "next/navigation";
const { createContext, useContext } = require("react");

export const LoginContext=createContext();

export default function LoginProvider({children}){  

const router=useRouter();

 const handleSubmit = async ({email,password,selectedValue}) =>{

 const data={
  email,password,selectedValue
 }

  const response = await axios.post('http://localhost:4000/loginApi', 
    data ,{  // Send id in the request body
     headers: {
       'Content-Type': 'application/json',
     },
   }
  );
  console.log(response.data.type);
  switch (response.data.type) {
    case "admin" :
      router.push('/pages/admin'); 
      // enqueueSnackbar(response.data.message, { variant: 'success' });
      break;
    case "chief":
      router.push('/pages/login'); 
      // enqueueSnackbar(response.data.message, { variant: 'error' });
      break;
    default:
      // Handle other cases or do nothing
      break;
  }

//  if message is admin then redirect to the  pages/admin
// if message is chief then redict to the pages/chief
}
 
    return(
    <LoginContext.Provider value={{handleSubmit}}>
        {children}
    </LoginContext.Provider>
  )
}

export const useLoginContext =()=>useContext(LoginContext);