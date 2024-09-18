//server side 
import Link from "next/link";

export default function Table(){

  let tableid="Table_no_4";





  return(
        <>
        <div className="h-screen bg-zinc-100 flex justify-center items-center">
         <div className="bg-white h-96 w-96 rounded-xl shadow-2xl flex flex-col justify-center items-center ">
          <div className="bg-white w-64 h-12 rounded-md shadow-xl  my-10 flex justify-center items-center">
            {`${tableid}`}
          </div>

          <Link href={`/pages/menu?tableid=${tableid}`}>
              <button className="bg-pink-500 text-white w-64 h-12 shadow-2xl rounded-md hover:border-pink-800 hover:border-[2px]  ">Go</button>
          </Link>
          
         </div>
        </div>
        </>
    )
}