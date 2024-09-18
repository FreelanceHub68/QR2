"use client"
import "../../../../public/common.css"
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { IoArrowForwardOutline } from "react-icons/io5";
import Form from "../form";
import Cartbar from "./cartbar";
import { useSearchParams } from "next/navigation";
import { useCartContext } from "../../../../contextApi/CartContextApi";
export default function Cart() {
    const [data, setData] = useState();
    const [show, setShow] = useState(false);

const { updateCart,removefromcart,handleSubmit} = useCartContext();
    
    const openForm = () => {
        setShow(!show);
        console.log("hello");
    }


 // get table id 
 const searchParams = useSearchParams();
 // Check if searchParams has 'get' method
 if (typeof searchParams.get !== 'function') {
     console.error('searchParams.get is not a function');
     return null;
 }
 const id = searchParams.get('id');
 const categoryid=searchParams.get('categoryid');


    // fetch data from cart
    //removfrom cart functionality
    // increment decrement functionality
    // buy => save into orders database 
    // redirect to the form page
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Make a GET request using axios with the ID as a query parameter
                const response = await axios.get('http://localhost:4000/cartApi', {
                    params: { id: id }  // Include the ID in the query parameters
                });
                // console.log(response);
                setData(response.data);  // Set the response data to state
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        fetchData();
    }, [data]);  



    // console.log(data)
    const productNames = data?.flatMap(item => item.cart.map(product => product));
    // console.log(productNames);



    return (
        <>


            <div className="h-screen bg-zinc-300  relative inset-0">
                <Cartbar />


                <div className="bg-white mx-56  top-16 rounded-xl">
                    <div className="h-16 "><h1 className="text-3xl text-center py-3 font-bold " >Cart</h1></div>
                    <div className=" flex ">
                        <div className="w-[65%] overflow-y-scroll showscroll ">
                            <div className=" h-16 flex justify-evenly items-center">
                                <div className="border-b-2 border-black font-bold w-full h-full flex justify-center items-center text-md" >Sr.No</div>
                                <div className="border-b-2 border-black font-bold w-full h-full flex justify-center items-center text-md" >Name</div>
                                <div className="border-b-2 border-black font-bold w-full h-full flex justify-center items-center text-md" >Amount</div>
                                <div className="border-b-2 border-black font-bold w-full h-full flex justify-center items-center text-md" >Price</div>
                                <div className="border-b-2 border-black font-bold w-full h-full flex justify-center items-center text-md" >Remove</div>
                            </div>



                            <div className=" ">

                                {productNames == 0 ? (
                                    <div className="text-black  flex justify-center items-center h-12 ">
                                        'No item found'
                                    </div>
                                ) : (
                                    productNames?.map((product, index) => (
                                        <div className=" h-24 flex my-1" key={index}>
                                            <div className=" font-bold w-full h-full flex justify-center items-center text-md" >{index + 1}</div>
                                            <div className=" font-bold w-full h-full flex justify-center items-center text-md" >{product.name}</div>
                                            <div className=" font-bold w-full h-full flex justify-center items-center text-md" ><span className="flex justify-center items-center"><button className="w-6 h-6 bg-black mx-1 rounded-xl text-white flex justify-center items-center active:bg-white active:text-black "  onClick={()=>updateCart({name:product.name,action:"inc",tableid:id,id:product.id,price:product.price,quantity:product.quantity})}><FaPlus size={15} className=""/></button ><span>{product.quantity}</span><button className="w-6 h-6 bg-black mx-1 rounded-xl text-white flex justify-center items-center active:bg-white active:text-black "  onClick={()=>updateCart({name:product.name,action:"dec",quantity:1,price:product.price,tableid:id,id:product.id})}><FaMinus /></button></span></div>
                                            <div className=" font-bold w-full h-full flex justify-center items-center text-md" >{product.price}</div>
                                            <div className=" font-bold w-full h-full flex justify-center items-center text-md " >
                                            <button onClick={()=>removefromcart({id:product.id,tableid:id})}>
                                            <MdDelete size={25} className="text-red-500 cursor-pointer active:text-red-300" />
                                            </button>
                                            </div>
                                        </div>
                                    ))
                                )}








                            </div>
                        </div>



                        <div className="flex flex-col justify-center items-center  w-[40%] p-14">
                        
                        

{data?.map((doc) => (
    <div key={doc.id} className="bg-white shadow-2xl flex w-96 h-72 flex-col  p-10">
        <div className="h-12 flex justify-center items-center font-bold border-b-2 border-black">
            <h1>Total</h1>
        </div>
        <div>
            <div className="h-12 flex pl-5 pt-3">
                <h2 className="text-md">Total-Amount:</h2>
                <span className="ml-[119px]">{doc.totalAmount}</span>
            </div>
            <div className="h-12 flex pl-5 pt-3">
                <h2 className="text-md">Total-Item:</h2>
                <span className="ml-36">{doc.totalItem}</span>
            </div>
            <div className="border border-black flex"></div>
            <div className="flex pl-44 py-2">
                <h3 className="mr-8">Total:</h3>
                <span>{doc.totalAmount}</span>
            </div>
        </div>
    </div>
))}
                      
                        
                            


                            <div className="flex justify-center items-center my-5">
                                <div className="flex justify-center items-center my-5">
                                <Link href={`/pages/submenu?id=${id}&categoryid=${categoryid}`}>     
                                    <button className="bg-red-700   w-24 h-10 mx-2 rounded-xl active:bg-red-100   "  ><span className="flex justify-center items-center text-white active:text-black"><IoMdArrowBack size={22} className="mx-1" /> BACK </span></button>
</Link>
                                    <button className="bg-green-700 w-24 h-10 mx-2 rounded-xl active:bg-green-100 " onClick={() => openForm()}><span className="flex justify-center items-center text-white active:text-black"  >BUY <IoArrowForwardOutline size={22} className="mx-1" /></span></button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {
                        show && <Form onSubmitform={handleSubmit}  id={id} categoryid={categoryid} />
                    }



                </div>
            </div>

        </>
    )
}