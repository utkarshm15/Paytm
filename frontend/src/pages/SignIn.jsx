import { useState } from "react";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { Warning } from "../components/Warning";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SubHeading } from "../components/SubHeading";

export function SignIn(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return <div className="flex justify-center h-screen bg-slate-100 p-24">
        <div className="w-80  h-max p-2 rounded-md border bg-white shadow-md">
            <Heading label={"Sign In"}></Heading>
            <SubHeading label={"Enter your credentials to sign in"} />
            <InputBox label={"Email"} type={"text"} placeholder={"johndoe@gmail.com"} onChange={e=>setEmail(e.target.value)}/>
            <InputBox label={"Password"} type={"password"} placeholder={"12345678"} onChange={e=>setPassword(e.target.value)} />
            <Button label={"Sign In"} onClick={async()=>{
                try {
                    const response = await axios.post("http://localhost:3000/api/v1/user/signin",{
                        username : email,
                        password : password
                    });
                    localStorage.setItem("token",response.data.token);
                    alert(response.data.message);
                    navigate("/dashboard");
                } catch (error) {
                    alert(error.response.data.message);
                }
            }}/>
            <Warning label={"Do not have an account ?"} to={"/signup"} buttonText={"Sign Up"}/>
        </div>
    </div>
}