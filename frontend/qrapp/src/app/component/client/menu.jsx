"use client"
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Category from "./category";
import axios from "axios";
export default function Menu() {

    const [data, setData] = useState();

    // get table id 
    const searchParams = useSearchParams();
    // Check if searchParams has 'get' method
    const id = searchParams.get('tableid');
    if (typeof searchParams.get !== 'function') {
        console.error('searchParams.get is not a function');
        return null;
    }
    console.log(id)


    const tableId = {
        id: id
    }


    // get data from product Api
    // fetch category from prodcutApi get method

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Make a GET request using axios with the ID as a query parameter
                const response = await axios.get('http://localhost:4000/productApi', {
                    params: { id: id }  // Include the ID in the query parameters
                });
                setData(response.data);  // Set the response data to state
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        fetchData();
        localStorage.setItem('id', id);
    }, [id]);  

    // sent id and authenticate user and create Cart state for user
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:4000/authApi', tableId, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                // Handle the response if needed
            } catch (error) {
                console.log('Axios error:', error);
            }
        };

        fetchData();
    }, [tableId]); 



    const productNames = data?.flatMap(item => item.product.map(product => product));


    return (
        <>
            <div className="h-auto flex justify-center items-center flex-col">
                <div className="  w-[1200px] mt-32 ">
                    <div className="border-green-500 w-full h-24">
                        <h1 className=" text-3xl px-24 py-3 border-b-2 border-black font-bold">
                            Menu
                        </h1>
                    </div>
                    <div>
                        <Category productNames={{ productNames, id }} />
                    </div>
                </div>
            </div>
        </>
    )
}