"use client"
import  CartContext  from "../../../../contextApi/CartContextApi";
import { SnackbarProvider } from 'notistack';
export default function Layout({children}){
    return(
            <SnackbarProvider maxSnack={3}>
       <CartContext>
             {children}
       </CartContext>
            </SnackbarProvider>
    )
}