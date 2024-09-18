"use client"
import { useState } from "react";
import { MdCancel } from "react-icons/md";
import Category from "./client/category";
export default function Form({categoryid,id,onSubmitform}){
  
  const [show,setShow]=useState(true);
 
  const [name,setName]=useState()
  const [email,setEmail]=useState()
  const [note,setNote]=useState();
  const [mobile,setMobile]=useState();



  const closeForm=()=>{
   setShow(!show);
  }


    return(
        <>
{
  show && (
    <div className="absolute inset-0 w-screen h-screen flex justify-center items-center">
      <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-0">
        <div className="bg-white bg-opacity-100 h-[600px] w-[500px] z-10 relative">
          <button
            onClick={closeForm}
            className="absolute top-4 right-4"
          >
            <MdCancel size={30} className="text-black cursor-pointer" />
          </button>
          <form
            className="flex flex-col h-full p-4"
            onSubmit={(e) => {
              e.preventDefault(); // Prevent the default form submission
              onSubmitform({ name, mobile, note, email, categoryid, id });
            }}
          >
            <h2 className="text-lg font-bold mb-4 text-center">Please Fill Following Details:</h2>
            <label htmlFor="name" className="my-1">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter text"
              className="border p-2 mb-4"
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="mobile" className="my-1">Mobile</label>
            <input
              type="text"
              name="mobile"
              placeholder="Enter text"
              className="border p-2 mb-4"
              onChange={(e) => setMobile(e.target.value)}
            />
            <label htmlFor="email" className="my-1">Email</label>
            <input
              type="text"
              name="email"
              placeholder="Enter text"
              className="border p-2 mb-4"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="note" className="my-1">Add Note</label>
            <textarea
              className="border p-2 mb-4 resize-none h-24"
              name="note"
              placeholder="Add Note..."
              onChange={(e) => setNote(e.target.value)}
            ></textarea>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}




        
       </>
      
        )
    
}