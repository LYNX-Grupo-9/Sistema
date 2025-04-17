export function BtnForm(props) {
    return (
        <button {...props} className="w-[65%] h-[45px] mt-[5%] rounded-[10px] border-2 border-[#013451] bg-[#013451] text-white text-[20px] font-semibold transition-all duration-300 hover:bg-[#106294] hover:border-transparent cursor-pointer">
            {props.buttonlabel}
        </button >
    );
}