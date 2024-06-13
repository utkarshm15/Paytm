import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
let c =0 ;
export function Users(){
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    useEffect(()=>{
        async function getUsers(){
            const response = await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`,{
                headers : {
                    Authorization : `Bearer ${localStorage.getItem("token")}`
                }
                }
            );
            console.log(response);
            setUsers(response.data.user);
        }
        getUsers();
    },[filter]);

    

    return <div className="px-10">
        <div className="font-medium mb-1">Users</div>
        <input className="border w-full mb-4 p-1" type="text" placeholder="Search users..." onChange={e=>setFilter(e.target.value)} />
        <div>
        {users.map((user)=><User fname={user.firstName} lname={user.lastName} key={(c+1)} id={user._id}/>)}
        </div>
    </div>
}

function User({fname,lname ,id}){
    
    const navigate = useNavigate();
    return <div className="flex justify-between mb-4">
        <div className=" flex">
            <div className="rounded-full px-4 py-2 bg-gray-200 font-medium">
                {fname.charAt(0)}
            </div>
            <div className="p-2">
                {fname} {lname}
            </div>
        </div>
        <div className="bg-gray-800 text-sm text-white p-1 px-4 h-8 mt-1 rounded-md hover:cursor-pointer" onClick={()=>{
            navigate(`/send?id=${id}&name=${(fname+"_"+lname)}`)
        }}>Send Money</div>
    </div>
}