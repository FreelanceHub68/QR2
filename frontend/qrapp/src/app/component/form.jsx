export default function Form(){
    return(
        <>

        <div className="bg-zinc-50 h-screen flex justify-center items-center ">
           <div className="bg-white h-[500px] w-[500px] rounded-xl">
            <label htmlFor="name">Name</label>
            <input type="text" className="w-64 h-12 border border-black pl-5 text-xl" placeholder="Enter name.."  name="name" />

            <label htmlFor="mobileno">Mobile no</label>
            <input type="number" className="w-64 h-12 border border-black pl-5 text-xl" placeholder="Enter mobile no...."  name="mobileno" />


            <label htmlFor="">Add a note</label>
             <textarea></textarea>

            <button className="bg-green-500 w-96 h-12 text-white cursor-pointer">
              Submit
            </button>


           <div/>
        </div>
       </div>
       </>
      
        )
    
}