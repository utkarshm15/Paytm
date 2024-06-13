import { useState } from "react";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { Warning } from "../components/Warning";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function SignUp(){
    const [username , setUsername] = useState("");
    const [password , setPassword] = useState("");
    const [firstName , setFirstName] = useState("");
    const [lastName , setLastName] = useState("");
    const navigate = useNavigate();

    return <div className="flex justify-center h-screen bg-slate-100 p-10"> 
    <div className="w-80  h-max p-2 rounded-md border bg-white shadow-md">
      <Heading label={"Sign up"}/>
      <SubHeading label={"Enter your information to create an account"}/>
      <InputBox onChange={(e)=>setFirstName(e.target.value)} label={"First Name"} placeholder={"John"} type={"text"}/>
      <InputBox onChange={(e)=>setLastName(e.target.value)} label={"Last Name"} placeholder={"Doe"} type={"text"}/>
      <InputBox onChange={e=>setUsername(e.target.value)} label={"Email"} placeholder={"johndoe@gmail.com"} type={"text"}/>
      <InputBox onChange={e=>setPassword(e.target.value)} label={"Password"} placeholder={"12345678"} type={"password"}/>
      <Button label={"Sign Up"} onClick={async()=>{
              try{
                const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
                  username : username,
                  firstName : firstName,
                  lastName : lastName,
                  password : password
                })
                localStorage.setItem("token",response.data.token);
                alert(response.data.message);
                navigate("/dashboard");
      }
      catch(err){
        alert(err.response.data.message);
      }
    }}/>
      <Warning label={"Already have an account"} to={"/signin"} buttonText={"Sign in"}></Warning>
    </div>
    </div>
}