"use client"
import  OrderContext  from "../../../../contextApi/orderContextApi";
import  ProductContext  from "../../../../contextApi/ProductContext";
import { SnackbarProvider } from 'notistack';
export default function Layout({children}){
    return(
    // <OrderContext>
        <SnackbarProvider maxSnack={3}>
           <ProductContext>
             {children}
           </ProductContext>
         </SnackbarProvider>
    // </OrderContext>
    )
}