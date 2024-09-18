"use client"
import { useState } from "react"
import { useLoginContext } from "../../../../contextApi/LoginContextApi";

export default function Login() {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState()
    // const [option, setOption] = useState(false);


    const [selectedValue, setSelectedValue] = useState('');

    // Handler for radio button change
    const handleRadioChange = (event) => {
        setSelectedValue(event.target.value);
    };



    const { handleSubmit } = useLoginContext();

    return (
        <>
            <div className="flex justify-center items-center bg-zinc-300 h-screen">
                <div className="bg-white h-54 w-54 flex justify-start items-center flex-col h-[450px] w-[380px] rounded-xl shadow-lg">
                    <div>
                        <h1 className="text-2xl text-black mt-8 font-bold underline">Login</h1>
                    </div>
                    <div className="mt-10">

                        <form className="flex flex-col" onSubmit={(e) => {
                            e.preventDefault()
                            handleSubmit({ email, password, selectedValue })
                        }}>

                            <label htmlFor="" className=" text-xl my-2 ">Username</label>
                            <input type="email" className="border my-1 h-8 " onChange={(e) => { setEmail(e.target.value) }} />

                            <label htmlFor="" className=" text-xl my-2 ">Password</label>
                            <input type="email" className="border my-1 h-8 " onChange={(e) => { setPassword(e.target.value) }} />

                            <div className="flex my-3  justify-center items-center">
                                
                                <div className="mx-3 flex justify-center items-center">
                                    <input
                                        type="radio"
                                        value="admin"
                                        checked={selectedValue === 'admin'}
                                        onChange={handleRadioChange}
                                        className="mx-1 " />
                                    
                                <label className="">admin</label>
</div>


                                <br />

                                <div className="mx-3 flex justify-center items-center">
                                    <input
                                        type="radio"
                                        value="chief"
                                        checked={selectedValue === 'chief'}
                                        onChange={handleRadioChange}
                                        className="mx-1 " />
                                    
                                <label className="">chief</label>
                                </div>
                            </div>
                            <button className="bg-black my-2  text-white h-10 cursor-pointer  rounded-xl active:bg-white active:text-black">Sign up</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}