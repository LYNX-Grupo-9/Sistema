export function Inputs ({id, label, type, placeholder, onChange,value, ...props}) {
    return (
        <div className="flex flex-col items-center justify-center h-[14%] w-full">
            <span className="w-[65%] h-[30%] text-[15px] font-semibold text-[#013451]">
                {label}
            </span>
            <input {...props} id={id} type={type} onChange={onChange} value={value} placeholder={placeholder} className="w-[65%] h-[40px] rounded-[5px] border-2 border-[#013451] p-[15px] bg-white text-[16px]"/>
        </div>
    );
} 