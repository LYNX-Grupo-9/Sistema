export function InputDuplo (props) {
    return (
        <div className="flex flex-col justify-around w-[65%] h-[12%]">
            <div className="flex w-[104%]">          
                <span className="w-[65%] h-[30%] text-[15px] font-semibold text-[#013451]">
                    {props.label}
                </span>
                <span className="w-[65%] h-[30%] text-[15px] font-semibold text-[#013451]">
                    {props.label2}
                </span>
            </div>
            <div className="flex justify-between">
                <input id={props.id} type={props.type} placeholder={props.placeholder} className="w-[48%] h-[40px] rounded-[5px] border-2 border-[#013451] p-[15px] bg-white text-[16px]"/>
                <input id={props.id2} type={props.type2} placeholder={props.placeholder2} className="w-[48%] h-[40px] rounded-[5px] border-2 border-[#013451] p-[15px] bg-white text-[16px]"/>  
            </div>
        </div>
    )
}