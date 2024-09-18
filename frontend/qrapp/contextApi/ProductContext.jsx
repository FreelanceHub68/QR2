"use client"

import { createContext, useContext } from "react";
import { db } from "../lib/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { enqueueSnackbar } from "notistack";
import { getDoc } from "firebase/firestore";
export const ProductContext = createContext();

export default function productprovider({ children }){



// add product to the "Product" database

const handleProduct = async ({name,price,category,image,decs}) => { 
   try {
    const imageRef = ref(storage, `Admin/addproduct/${name}`);
    await uploadBytes(imageRef,image.file);
    const imageURL = await getDownloadURL(imageRef);
    // save data inside object
    const data={
      name,price,category,decs,imageURL
     }
    const response = await fetch('http://localhost:4000/productApi', { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  
  if(result){
    console.log('Server response:', result.message);
    enqueueSnackbar(result.message, { variant: 'success' });
  }
} catch (error) {
  console.error('Error sending data:', error);
  enqueueSnackbar("Internal server Error!!!!", { variant: 'error' });
}
}





  

  return (
    <ProductContext.Provider value={{handleProduct}}>
      { children }
    </ProductContext.Provider>
  );
;
}

// create custom hook
export const  useProductContext =()=>useContext(ProductContext);