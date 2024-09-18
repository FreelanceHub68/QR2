"use client"
import { MdDelete } from "react-icons/md";
import { useCartContext } from "../../../../contextApi/CartContextApi";
import "../../../../public/common.css"

import { FaMinus, FaPlus } from "react-icons/fa";
export default function Subproduct({data}) {
  
    const { Addtocart, increment } = useCartContext();
   
    const Product = data.Product;
    const id=data.tableid
return (
        <>
            <div className=" h-[540px]">
                <div>

                    <table>
                        <thead className="w-full   ">
<tr>

                            <th className="border-b-2 border-black h-16 w-80 " >Sr.No</th>
                            <th className="border-b-2 border-black h-16 w-80 " >Name</th>
                            <th className="border-b-2 border-black h-16 w-80 " >Price</th>
                            <th className="border-b-2 border-black h-16 w-80 " >Remove</th>
</tr>
                        </thead>
                    </table>
                </div>

                <div className=" h-[450px] overflow-y-scroll showscroll">
                    <table>
                        <tbody>
                            {Product?.product.map((doc, index) => (
                                <tr key={doc.id}>
                                    <td className="text-center p-5 h-16 w-80 pl-7 ">{index + 1}</td> 
                                    <td className="text-center p-5 h-16 w-80 pl-7 ">{doc.name}</td>
                                    <td className="text-center p-5 h-16 w-80 pl-7 ">{doc.price}</td>
                                    <td className="text-center p-5 h-16 w-80 pl-7 ">
                                        <button className="bg-red-500 text-white w-24 h-10 rounded-md" onClick={() => { Addtocart({ tableid: id, name: doc.name, price: doc.price, categoryid: doc.id }), increment() }}> ADD </button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>



            </div>
        </>
    )
}