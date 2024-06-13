export function Button({label, onClick}){
    return <div onClick={onClick} className="rounded bg-slate-800 mx-2 my-2 text-center text-white p-1 hover:bg-sky-500 hover:cursor-pointer">
        {label}
    </div>
}