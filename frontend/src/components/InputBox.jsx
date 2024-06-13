export function InputBox({label, placeholder, onChange, type}){
    return <div className="py-1 px-2">
        <div className="py-1 font-medium">
            {label}
        </div>
        <input onChange={onChange} className="rounded border w-full p-1" type={type} placeholder={placeholder} />
    </div>
}