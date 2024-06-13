import axios from "axios";
import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom";

export function SendMoney(){
    const [searchParams] = useSearchParams();
    const fullname = searchParams.get("name")
    const ar = fullname.split("_");
    const name = ar[0] + " " + ar[1];
    const id = searchParams.get("id");
    const [amount, setAmount] = useState(0);
    const navigate = useNavigate();

    return <div className="bg-gray-300 h-screen flex pt-20 justify-center">
        <div className="shadow-md rounded-lg  bg-white h-80 w-96 p-2">
            <div className="text-3xl font-bold text-center pt-4">Send Money</div>
            <div className="pt-16 px-4">
                <div className="flex ">
                    <div className="rounded-full py-2 px-4 bg-green-500 text-white text-2xl font-medium">{name.charAt(0)}</div>
                    <div className="font-medium text-2xl p-2">{name}</div>
                </div>
                <div className="font-medium mt-2 ">Rs. {amount}</div>
                <input className="p-1 border w-full my-2 px-2" type="text" placeholder="Enter Amount" onChange={e=>setAmount(e.target.value)}/>
                <div className="text-white bg-green-500 my-1 py-2 rounded-md font-medium text-center hover:cursor-pointer" onClick={async()=>{
                    console.log(typeof parseFloat(amount));
                    try{
                        const response = await axios.post("http://localhost:3000/api/v1/account/transfer",{
                            amount : parseFloat(amount),
                            to : id
                        },{
                            headers : {
                                Authorization : `Bearer ${localStorage.getItem("token")}`
                            }
                            });
                        
                        alert(response.data.message);
                        navigate("/dashboard")
                    }
                    catch(e){
                        alert(e.response.data.message);
                    }
                }}>Send Money</div>
            </div>
        </div>
    </div>
}