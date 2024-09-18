"use client"

import { useEffect, useState } from "react";
import { useProductContext } from "../../../../contextApi/ProductContext";
export default function AddProduct() {
 // called handleProduct from ProductContext
    const { handleProduct } = useProductContext();
    
    
    const [data,setData]=useState();
    const [selectedValue, setSelectedValue] = useState("");
    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [decs, setDecs] = useState();
    const [category, setCategory] = useState();
    const [image, setImage] = useState({
        file: null,
        url: ""
    });



    // save image in image state
    const handleImg = (e) => {
        if (e.target.files[0]) {
            setImage({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            })

        }
    }


    
// fetch category from prodcutApi get method

useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/productApi');
        const result = await response.json();
        setData(result.list);

      } catch (error) {
        console.error('Fetch error:', error);
      } 
    }
    fetchData();
  }, []);



    return (
        <>

            <div className=" h-auto p-5 rounded-2xl  border border-black ">
                <h1 className="text-2xl  py-3 border-b-2 border-black ">Add Product</h1>
                
                <div className=" my-5 ">
                    <label htmlFor="name" className="text-xl">Item Name</label>
                    <input type="text" name="name" className=" ml-12 w-[1000px] h-8 text-black pl-5 active:border-pink-400 rounded-md  border border-gray-400 border-3 outline-2 outline-pink-500 " placeholder="Enter name..." onChange={(e) => setName(e.target.value)} />
                </div>

                <div className="Price my-5">
                    <label htmlFor="Price" className="text-xl ">Price</label>
                    <input type="text" name="Price" className="ml-[103px] w-[1000px] h-8 text-black pl-5 active:border-pink-400 rounded-md  border border-gray-400 border-3 outline-2 outline-pink-500 " placeholder="Enter Price..." onChange={(e) => setPrice(e.target.value)} />
                </div>


                <div className="Category my-5">               
      <label htmlFor="Category" className="text-xl" >Category:</label>
      <select
        id="product-select"
        value={selectedValue}
        name="Category" className="ml-[58px] w-[1000px] h-8 text-black pl-5 active:border-pink-400 rounded-md  border border-gray-400 border-3 outline-2 outline-pink-500 " placeholder="Enter Category..." onChange={(e) => {setCategory(e.target.value),setSelectedValue(e.target.value);}}>
        <option value="" disabled>Select an option</option>
        {data?.map((doc) => (
          <option key={doc.id} value={doc.id}>
           <p className="text-black"> {doc.id}</p> {/* Adjust according to your data structure */}
          </option>
        ))}
      </select>
    
                </div>


                <div className="Description flex justify-start items-center my-5">
                    <label htmlFor="description" className="text-xl">Description</label>
                    <textarea className="resize-none ml-[43px]  w-[1000px] h-24 text-black pl-5 active:border-pink-400 rounded-md  border border-gray-400 border-3 outline-2 outline-pink-500 pt-3" placeholder="Enter Description..." onChange={(e) => setDecs(e.target.value)}></textarea>
                </div>

                <div className="Image">
                    <label htmlFor="Image" className="text-xl"> Upload image: </label>
                    <input type="file" className=" ml-[58px]" onChange={handleImg} />
                </div>

                <button className="bg-green-500 w-24 h-12 hover:shadow-2xl rounded-xl text-white mt-56  " onClick={() => handleProduct({ name, price, category, image, decs })}>
                    Upload
                </button>



            </div>

        </>
    )
}