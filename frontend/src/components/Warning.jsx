import { Link } from "react-router-dom";

export function Warning({label,to,buttonText}){
    return <div className="flex justify-center">
        <div className="text-gray-600 ">
        {label}       
    </div>
    <Link className="text-gray-600 underline px-1 hover:text-sky-500 hover:cursor-pointer" to={to}>{buttonText}</Link>
    </div>
}