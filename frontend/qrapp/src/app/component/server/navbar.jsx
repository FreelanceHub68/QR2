import Image from "next/image"
import logo from "../../../../public/logo.png";
import "../../../../public/common.css"
export default function Navbar(){
    return(
        <>
        <div className="bg-white-700 h-24 shadow-md flex justify-center items-center">
 <div className="border border-white flex justify-center items-center">
    <Image src={logo} width={70} height={70} className= "mx-3" alt="logo image"/>
<h1 className="text-black text-2xl pacifico-regular" > Adwait's Bake House</h1>
 </div>
        </div>
        </>
    )
}