import Orders from "@/app/component/server/orders";

export default function page(){
    return(
        <>
        <div className="bg-zinc-200 flex justify-center items-center h-screen">
  <div className="bg-white w-[600px] h-[600px] ">
    <Orders/>
  </div>
        </div>
        </>
    )
}