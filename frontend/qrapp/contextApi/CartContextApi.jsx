"use client"

import { createContext, useContext, useState } from "react";
import { db, storage } from "../lib/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { enqueueSnackbar } from "notistack";
import { getDoc } from "firebase/firestore";
import axios from "axios";
export const CartContext = createContext();

export default function Cartprovider({ children }){

  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);

// add product to the "Cart" database
const Addtocart = async ({tableid,name,price,categoryid}) => { 
   try {
    // save data inside object
    const data={
      name,price,categoryid,tableid,amount:1
     }

  // Make the POST request using axios
  const response = await axios.post('http://localhost:4000/cartApi', 
     data ,{  // Send id in the request body
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );        //   get response from the submenuApi
     


  
  // console.log();
// const 

  // const result = await response.json();
  //notistack 
  if(response.data){
    // console.log('Server response:', result.message);
    enqueueSnackbar(response.data.message, { variant: 'success' });
  }else{
    enqueueSnackbar(response.data.message, { variant: 'error' });   
  }
} catch (error) {
  console.log('Error sending data:', error);
}
}


const updateCart=async({id,action,tableid,quantity, price,name})=>{
//  console.log(name);
//  console.log(quantity);
  try {
    // save data inside object
    const data={
      id,action,tableid,name,price,quantity
    }

    const response = await axios.put('http://localhost:4000/cartApi', 
      {data },  // Send id in the request body
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ); 

 console.log(response); 
  
 switch (response.data.message) {
  case "Item quantity increased!!":
    enqueueSnackbar(response.data.message, { variant: 'success' });
    break;
  case "Item quantity decreased":
    enqueueSnackbar(response.data.message, { variant: 'error' });
    break;
  default:
    // Handle other cases or do nothing
    break;
}



} catch (error) {
  console.log('Error sending data:', error);
}
}

const removefromcart= async ({id,tableid})=>{

try {
  // save data inside object
  const data={
    id,tableid
  }  

const response = await axios.delete('http://localhost:4000/cartApi', { 
 data
},{
  headers: {
    'Content-Type': 'application/json',
  },
});

  //notistack 
  if(response.data){
    // console.log('Server response:', result.message);
    enqueueSnackbar(response.data.message, { variant: 'success' });
  }else{
    enqueueSnackbar(response.data.message, { variant: 'error' });   
  }



}
catch (error) {
  console.log('Error sending data:', error);
}
}

const handleSubmit  =async({name,mobile,email,note,categoryid,id})=>{
  
  const data={
    name,mobile,email,note,categoryid,id
  }
  // save form data in obejct and sent to the post method of the orderApi
  // sent tableId

  const response = await axios.post('http://localhost:4000/orderApi', 
    data ,{  // Send id in the request body
     headers: {
       'Content-Type': 'application/json',
     },
   }
 );        //   get response from the submenuApi



}




  return (
    <CartContext.Provider value={{Addtocart,increment,count,updateCart,removefromcart,handleSubmit}}>
      { children }
    </CartContext.Provider>
  );
  ;
}

// create custom hook
export const  useCartContext =()=>useContext(CartContext);