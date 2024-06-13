export function Balance({balance}){
    return <div className="flex p-2 pl-10">
        <div className="font-medium my-2 mx-1">Your Balance</div>
        <div className="font-medium my-2 mx-1">Rs {balance}</div>
    </div>
}