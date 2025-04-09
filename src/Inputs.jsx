export function Inputs (props) {
    return (
        <div className="flex flex-col items-center justify-center h-[14%] w-full">
            <span className="w-[65%] h-[30%] text-[15px] font-semibold text-[#013451]">
                {props.label}
            </span>
            <input type={props.type} placeholder={props.placeholder} className="w-[65%] h-[40px] rounded-[5px] border-2 border-[#013451] p-[15px] bg-white text-[16px]"/>
        </div>
    );
} 