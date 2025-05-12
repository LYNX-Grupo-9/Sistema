import Icon from "../../assets/icons/Plus.svg"
export function NewItemButton(props){
    return(
        <button className="min-w-[13%] min-h-[50px] h-[100%] rounded-[6px] text-[var(--color-blueDark)] bg-[var(--color-light)] text-[16px] typography-bold border-2 border-[var(--color-blueLight)] flex items-center justify-between px-4 cursor-pointer" onClick={props.click} {...props}>
            <img src={Icon}/>
            {props.title}
        </button>
    )
}