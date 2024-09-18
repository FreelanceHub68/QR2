"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import AddProduct from "./addproduct";
import { useCartContext } from "../../../../contextApi/CartContextApi";
import { CiShoppingCart } from "react-icons/ci";
import Subproduct from "./subproduct";
import axios from "axios";


export default function Submenu() {
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  // get id
  const searchParams = useSearchParams();
  // tableid
  const tableid = searchParams.get('id');
  //  submenuid2
  const categoryid = searchParams.get('categoryid');

  //   convert it into json type 
  const id = {
    id: categoryid
  }



  //sent submenu option id to submenuApi and fetch data from submenuApi and show

  useEffect(() => {
    const fetchData = async () => {
        try {
            // Make a GET request using axios with the ID as a query parameter
            const response = await axios.get('http://localhost:4000/submenuApi', {
              params: {
                tableid,
                categoryid
            }// Include the ID in the query parameters
            });

           

            
            setData(response.data);  // Set the response data to state
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    fetchData();
}, []);  



return (
    <div className="bg-zinc-300 ">
      <div className=" mx-24 my-10 p-8 bg-white shadow-xl rounded-xl h-[600px] ">
        <Subproduct data={{Product:data.Product,tableid}}/>
      </div>
    </div>
  );
}
