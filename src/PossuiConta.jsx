export function PossuiConta(props) {
    return (
        <div className=" text-[#013451] font-[550] mt-[3%]">
            <span>{props.label}</span> <a href={props.link} className="text-[#FF8C00] font-[550] transition-all duration-300 hover:underline">{props.linkLabel}</a>
        </div>
    );
}